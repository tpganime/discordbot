interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting across requests in the same instance
const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 60 seconds to prevent memory leaks
let lastCleanup = Date.now();
function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup < 60000) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitOptions {
  limit: number;       // Max allowed requests in window
  windowMs: number;    // Time window in milliseconds (e.g. 60000 for 1 min)
  prefix?: string;     // Route prefix e.g. 'stats', 'chat'
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter: number;
  ip: string;
}

/**
 * Extracts client IP from request headers (supports Vercel, Cloudflare, proxies)
 */
export function getClientIp(req: any): string {
  const xForwardedFor = req.headers?.['x-forwarded-for'];
  if (xForwardedFor) {
    const ips = typeof xForwardedFor === 'string' ? xForwardedFor.split(',') : xForwardedFor;
    if (ips && ips.length > 0) {
      return ips[0].trim();
    }
  }

  return (
    req.headers?.['cf-connecting-ip'] ||
    req.headers?.['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
}

/**
 * Check and record a request against rate limits
 */
export function checkRateLimit(req: any, options: RateLimitOptions): RateLimitResult {
  cleanupExpired();

  const ip = getClientIp(req);
  const prefix = options.prefix || 'global';
  const key = `${prefix}:${ip}`;
  const now = Date.now();

  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + options.windowMs
    };
    rateLimitStore.set(key, record);

    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit - 1,
      resetTime: Math.ceil(record.resetTime / 1000),
      retryAfter: 0,
      ip
    };
  }

  record.count += 1;
  const remaining = Math.max(0, options.limit - record.count);
  const allowed = record.count <= options.limit;
  const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

  return {
    allowed,
    limit: options.limit,
    remaining,
    resetTime: Math.ceil(record.resetTime / 1000),
    retryAfter,
    ip
  };
}

/**
 * Apply standard RateLimit headers to Vercel/Express response
 */
export function setRateLimitHeaders(res: any, result: RateLimitResult) {
  res.setHeader('X-RateLimit-Limit', result.limit.toString());
  res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
  res.setHeader('X-RateLimit-Reset', result.resetTime.toString());

  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfter.toString());
  }
}
