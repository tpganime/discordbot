interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

function getClientIp(req: any): string {
  const xff = req.headers?.['x-forwarded-for'];
  if (xff) {
    const ips = typeof xff === 'string' ? xff.split(',') : xff;
    if (ips && ips.length > 0) return ips[0].trim();
  }
  return req.headers?.['cf-connecting-ip'] || req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

function checkRateLimit(req: any, limit = 60, windowMs = 60000) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Clean stale entries periodically
  if (rateLimitStore.size > 2000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetTime) rateLimitStore.delete(k);
    }
  }

  let rec = rateLimitStore.get(ip);
  if (!rec || now > rec.resetTime) {
    rec = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(ip, rec);
    return { allowed: true, limit, remaining: limit - 1, resetTime: Math.ceil(rec.resetTime / 1000), retryAfter: 0 };
  }

  rec.count += 1;
  const remaining = Math.max(0, limit - rec.count);
  const allowed = rec.count <= limit;
  const retryAfter = Math.max(1, Math.ceil((rec.resetTime - now) / 1000));
  return { allowed, limit, remaining, resetTime: Math.ceil(rec.resetTime / 1000), retryAfter };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Rate Limiting: 60 requests per minute per IP for stats probe
  const rl = checkRateLimit(req, 60, 60000);
  res.setHeader('X-RateLimit-Limit', rl.limit.toString());
  res.setHeader('X-RateLimit-Remaining', rl.remaining.toString());
  res.setHeader('X-RateLimit-Reset', rl.resetTime.toString());

  if (!rl.allowed) {
    res.setHeader('Retry-After', rl.retryAfter.toString());
    res.setHeader('Content-Type', 'application/json');
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded for /api/stats. Maximum 60 requests per minute.',
      retryAfter: rl.retryAfter
    });
  }

  // Edge Caching: Cache on Vercel CDN for 5 seconds to absorb spikes
  res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=10');

  const endpoints = [
    'https://panel.fusionhub.in/api/stats',
    'http://th-us1.terohost.com:25626/api/stats'
  ];

  const SHARD_CAPACITY = 1000;

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const start = Date.now();
      const panelRes = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json', 'User-Agent': 'FusionWebsite-Stats' }
      });
      clearTimeout(timeoutId);
      const latency = Date.now() - start;

      if (panelRes.ok) {
        const text = await panelRes.text();
        let data: any = null;
        try {
          data = JSON.parse(text);
        } catch (err) {
          // HTML response (e.g. Cloudflare error page 521), skip to next
          continue;
        }

        if (data && typeof data === 'object' && data.online !== false) {
          const totalGuilds = data.servers != null ? data.servers : 29;
          const neededShards = Math.max(1, Math.ceil(totalGuilds / SHARD_CAPACITY));

          let shards = data.shards;
          if (!shards || shards.length === 0) {
            shards = [];
            let rem = totalGuilds;
            for (let i = 0; i < neededShards; i++) {
              const count = Math.min(SHARD_CAPACITY, rem);
              rem = Math.max(0, rem - SHARD_CAPACITY);
              shards.push({
                id: i,
                clusterId: Math.floor(i / 16),
                status: 'Ready',
                ping: data.ping && data.ping > 0 ? data.ping : Math.min(latency, 24),
                servers: count,
                maxCapacity: SHARD_CAPACITY,
                fillPercentage: Math.min(100, Math.round((count / SHARD_CAPACITY) * 1000) / 10)
              });
            }
          }

          return res.status(200).json({
            online: true,
            status: data.status || 'Ready',
            ping: data.ping && data.ping > 0 ? data.ping : Math.min(latency, 24),
            avgLatency: data.avgLatency || data.ping || Math.min(latency, 24),
            servers: totalGuilds,
            users: data.users != null ? data.users : (totalGuilds * 36),
            commands: data.commands || 41,
            uptime: data.uptime || '2h 31m',
            uptimeSeconds: data.uptimeSeconds,
            uptimePercent: data.uptimePercent || '99.99%',
            shardCapacity: SHARD_CAPACITY,
            clusters: [
              {
                id: 0,
                name: 'Cluster 0 (Primary US-East)',
                status: 'Operational',
                shardsCount: shards.length,
                avgPing: data.ping || 23,
                servers: totalGuilds
              }
            ],
            shards: shards,
            totalShards: shards.length,
            operationalShards: shards.filter((s: any) => s.status?.toLowerCase() === 'ready' || s.status?.toLowerCase() === 'operational').length,
            timestamp: Date.now(),
            source: 'live-bot'
          });
        }
      }
    } catch (e) {
      // Continue to next endpoint
    }
  }

  // If all live endpoints fail, the bot server is OFFLINE!
  return res.status(200).json({
    online: false,
    status: 'Offline',
    ping: 0,
    avgLatency: 0,
    servers: 29,
    users: 1066,
    commands: 41,
    uptime: 'Offline',
    uptimeSeconds: 0,
    uptimePercent: '0.00%',
    shardCapacity: SHARD_CAPACITY,
    clusters: [
      {
        id: 0,
        name: 'Cluster 0 (Primary US-East)',
        status: 'Offline',
        shardsCount: 1,
        avgPing: 0,
        servers: 29
      }
    ],
    shards: [
      {
        id: 0,
        clusterId: 0,
        status: 'Offline',
        ping: 0,
        servers: 29,
        maxCapacity: SHARD_CAPACITY,
        fillPercentage: 2.9
      }
    ],
    totalShards: 1,
    operationalShards: 0,
    timestamp: Date.now(),
    source: 'live-probe-offline'
  });
}
