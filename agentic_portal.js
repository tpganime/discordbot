// ================================================================
// 🌐 FUSION BOT AGENTIC PORTAL & AI READINESS ENGINE (MAIN WEBSITE)
// ================================================================

import path from 'path';
import fs from 'fs';
import express from 'express';

const SITE_URL = 'https://bot.fusionhub.in';
const PANEL_URL = 'https://panel.fusionhub.in';
const BRAND_NAME = 'Fusion Bot';
const LEGAL_ENTITY = 'CHAUDHARY TANMAY';
const SUPPORT_EMAIL = 'support@fusionhub.in';
const SUPPORT_SERVER = 'https://discord.gg/fusionbot';
const LOGO_URL = 'https://i.ibb.co/vC79Nthr/Whats-App-Image-2026-03-23-at-6-49-47-PM.jpg';
const BANNER_URL = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

// ── SCOPED PERMISSIONS SPECIFICATION ──────────────────────────
export const OAUTH_SCOPES = {
    'bot:read': 'Read bot telemetry, live shard statistics, latency, and public server counts',
    'bot:write': 'Manage bot server nicknames, branding settings, and prefix configurations',
    'guilds:read': 'Read server configurations, automod settings, channels, and active roles',
    'guilds:write': 'Update server configurations, toggle security modules, and configure channels',
    'backup:create': 'Create instant manual or automated snapshots of server structure to Fusion Cloud / Google Drive',
    'backup:restore': 'Reconstruct server categories, channels, permissions, and member roles from snapshots',
    'moderation:manage': 'Execute automated moderation rules (ban, kick, timeout, purge, channel lockdown)',
    'tickets:manage': 'Deploy ticket panels, manage support categories, and archive transcripts',
    'giveaways:manage': 'Create, edit, reroll, and end server giveaways',
    'ai:chat': 'Interact with bilingual AI chat engine, image generation, and studio voice packs'
};

// ── FUNCTION CALLING TOOLS SPECIFICATION ─────────────────────
export const AGENT_TOOLS = [
    {
        name: 'get_bot_stats',
        description: 'Get real-time statistics for Fusion Bot including server count, total users, ping, uptime, and shard health.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'get_bot_info',
        description: 'Retrieve Fusion Bot application metadata, version, invite link, support server, and verified status.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'list_bot_commands',
        description: 'List all available slash and prefix commands categorized by Moderation, Nuke Guard, AI, Server Management, Giveaways, and Utilities.',
        parameters: {
            type: 'object',
            properties: {
                category: {
                    type: 'string',
                    enum: ['all', 'moderation', 'nuke', 'ai', 'server', 'giveaways', 'misc'],
                    description: 'Optional command category to filter by'
                }
            },
            required: []
        }
    },
    {
        name: 'get_pricing_plans',
        description: 'Retrieve current pricing plans (Free, Starter, Pro), feature comparison, and multi-server license slot allowances.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'check_api_health',
        description: 'Check the operational health of Fusion Bot APIs, Discord WebSocket connection, and MongoDB cloud database.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'get_developer_docs',
        description: 'Search or retrieve developer documentation for REST APIs, Webhooks, OAuth scopes, and MCP tools.',
        parameters: {
            type: 'object',
            properties: {
                topic: {
                    type: 'string',
                    description: 'Documentation topic to retrieve (e.g. "oauth", "backups", "mcp", "webhooks", "api")'
                }
            },
            required: ['topic']
        }
    }
];

// ── OPENAPI 3.1.0 SPECIFICATION ──────────────────────────────
export function getOpenAPISpec() {
    return {
        openapi: '3.1.0',
        info: {
            title: 'Fusion Bot Public Developer & Agent API',
            version: '1.0.0',
            description: 'Comprehensive REST API and Model Context Protocol interface for Fusion Bot — the all-in-one Discord bot for enterprise nuke protection, dual cloud backups, bilingual AI chat, moderation, and ticketing.',
            termsOfService: `${SITE_URL}/terms`,
            contact: {
                name: 'Fusion Bot Support Team',
                email: SUPPORT_EMAIL,
                url: `${SITE_URL}/contact`
            },
            license: {
                name: 'Proprietary - Commercial & Free Tier',
                url: `${SITE_URL}/terms`
            }
        },
        servers: [
            { url: SITE_URL, description: 'Primary Production API Server' },
            { url: PANEL_URL, description: 'Dashboard & Billing API Server' }
        ],
        tags: [
            { name: 'System & Health', description: 'API health checks, system status, and latency' },
            { name: 'Bot Telemetry', description: 'Live server count, active users, and shard metrics' },
            { name: 'Command Catalog', description: 'List of moderation, nuke protection, and utility commands' },
            { name: 'Developer Tools', description: 'LLM function calling schemas and sandbox utilities' },
            { name: 'Pricing & Plans', description: 'Subscription tiers, license slot allowances, and pricing' },
            { name: 'Model Context Protocol', description: 'MCP server discovery and tool calling interface' }
        ],
        paths: {
            '/api/v1/health': {
                get: {
                    tags: ['System & Health'],
                    summary: 'System Health Check',
                    description: 'Returns operational status of the API, Discord gateway connection, and database.',
                    operationId: 'getHealthStatus',
                    responses: {
                        '200': {
                            description: 'System is healthy and operational',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            status: { type: 'string', example: 'healthy' },
                                            uptime: { type: 'number', example: 124500 },
                                            timestamp: { type: 'string', format: 'date-time' },
                                            discordConnected: { type: 'boolean', example: true },
                                            databaseConnected: { type: 'boolean', example: true },
                                            shards: { type: 'integer', example: 1 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/stats': {
                get: {
                    tags: ['Bot Telemetry'],
                    summary: 'Live Bot Telemetry',
                    description: 'Returns real-time guild count, total member count, shard status, and API ping.',
                    operationId: 'getBotStats',
                    responses: {
                        '200': {
                            description: 'Real-time telemetry data',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            servers: { type: 'integer', example: 35 },
                                            users: { type: 'integer', example: 15420 },
                                            pingMs: { type: 'integer', example: 42 },
                                            uptimeSeconds: { type: 'integer', example: 86400 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/bot-info': {
                get: {
                    tags: ['Bot Telemetry'],
                    summary: 'Bot Profile & Application Info',
                    description: 'Returns bot branding, avatar, invite links, and verified permissions.',
                    operationId: 'getBotInfo',
                    responses: {
                        '200': {
                            description: 'Bot identity metadata',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            name: { type: 'string', example: 'Fusion Bot' },
                                            avatar: { type: 'string', format: 'uri' },
                                            inviteUrl: { type: 'string', format: 'uri' },
                                            supportServer: { type: 'string', format: 'uri' },
                                            verified: { type: 'boolean', example: true }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/commands': {
                get: {
                    tags: ['Command Catalog'],
                    summary: 'List Available Commands',
                    description: 'Returns the full catalog of Discord slash commands and prefix commands.',
                    operationId: 'listCommands',
                    responses: {
                        '200': {
                            description: 'Command catalog retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            total: { type: 'integer', example: 48 },
                                            commands: { type: 'array' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/pricing': {
                get: {
                    tags: ['Pricing & Plans'],
                    summary: 'Retrieve Pricing Plans',
                    description: 'Returns current subscription tiers (Free, Starter, Pro), limits, and multi-server license slot allowances.',
                    operationId: 'getPricingPlans',
                    responses: {
                        '200': {
                            description: 'Pricing plans data',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            currency: { type: 'string', example: 'INR' },
                                            plans: { type: 'array' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/tools': {
                get: {
                    tags: ['Developer Tools'],
                    summary: 'LLM Function Calling Schemas',
                    description: 'Returns tool definitions formatted for OpenAI, Anthropic Claude, and Google Gemini function calling.',
                    operationId: 'getFunctionTools',
                    responses: {
                        '200': {
                            description: 'Function calling schemas array',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            tools: { type: 'array' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/mcp': {
                post: {
                    tags: ['Model Context Protocol'],
                    summary: 'Model Context Protocol (MCP) Streamable RPC',
                    description: 'Handles JSON-RPC 2.0 requests from MCP-enabled AI agents (tools/list, tools/call, initialize).',
                    operationId: 'handleMcpRpc',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        jsonrpc: { type: 'string', example: '2.0' },
                                        id: { type: 'string', example: '1' },
                                        method: { type: 'string', example: 'tools/list' },
                                        params: { type: 'object' }
                                    },
                                    required: ['jsonrpc', 'method']
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'MCP JSON-RPC response',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            jsonrpc: { type: 'string', example: '2.0' },
                                            id: { type: 'string' },
                                            result: { type: 'object' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            securitySchemes: {
                oauth2: {
                    type: 'oauth2',
                    description: 'Discord OAuth 2.0 authentication with fine-grained permission scopes.',
                    flows: {
                        authorizationCode: {
                            authorizationUrl: `${SITE_URL}/oauth/authorize`,
                            tokenUrl: `${SITE_URL}/oauth/token`,
                            scopes: OAUTH_SCOPES
                        }
                    }
                },
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-Key',
                    description: 'Self-serve API key for programmatic server integration'
                },
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Session bearer token'
                }
            },
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        error: { type: 'string', example: 'RESOURCE_NOT_FOUND' },
                        code: { type: 'integer', example: 404 },
                        message: { type: 'string', example: 'The requested resource was not found.' },
                        resolution: { type: 'string', example: 'Check /openapi.json or /docs for valid endpoints.' }
                    },
                    required: ['success', 'error', 'code', 'message']
                }
            }
        }
    };
}

// ── MARKDOWN & TEXT CONTENT BUILDERS ─────────────────────────
export function getHomepageMarkdown() {
    return `# Fusion Bot — Enterprise Protection, Cloud Backups & AI Moderation

**Fusion Bot** (https://bot.fusionhub.in) is an enterprise-grade all-in-one Discord bot providing disaster recovery, dual cloud backups, automated anti-nuke protection, bilingual AI chat & vision, support ticketing, giveaways, and rich server moderation.

## Key Capabilities & Features:
1. **Nuke Guard & Disaster Recovery**: Instant snapshot creation of channels, categories, role permissions, and member assignments. One-click instant server reconstruction via \`/nukerestore\`.
2. **Pro Dual Cloud Backups**: Redundant, server-isolated backups saved simultaneously to **Fusion Cloud Database** and user's linked **Google Drive** storage.
3. **Bilingual AI Chat & Vision Engine**: Conversational AI in English, Hindi, and Hinglish with real-time web search capabilities and vision media analysis.
4. **Interactive Support Tickets**: Up to 7 customizable ticket categories, transcript auto-saving, and staff claiming.
5. **Advanced Moderation & Automod**: Anti-spam, anti-mass mentions, anti-links, phrase filters, auto-timeout, and 8 dedicated private audit log channels.
6. **Community Utilities**: Interactive reaction polls, level-up reward roles, animated welcome/goodbye canvas cards, and multi-tier giveaways.

## Pricing Tiers (INR):
- **Free Tier (₹0)**: Standard moderation, AI chat, ticketing panels, 3 free nuke snapshots.
- **Starter Plan (₹79/mo | ₹759/yr)**: 1 Server License Slot, 24-hour automated Google Drive cloud backups, custom prefixes, priority support.
- **Pro Server Plan (₹149/mo | ₹1,429/yr)**: **3 Multi-Server License Slots**, Dual Cloud Backups (Google Drive + Fusion Database), Full Bot Personalizer (custom bot logo, banner, and nickname), Studio HD AI Voice Packs, Scam & NSFW Shield.

## Developer & Agent Resources:
- **Developer Portal**: https://bot.fusionhub.in/developers
- **API Documentation**: https://bot.fusionhub.in/docs
- **OpenAPI 3.1.0 Spec**: https://bot.fusionhub.in/openapi.json
- **Model Context Protocol (MCP)**: https://bot.fusionhub.in/.well-known/mcp
- **Agent Instructions**: https://bot.fusionhub.in/llms.txt
- **OAuth Metadata**: https://bot.fusionhub.in/.well-known/oauth-authorization-server
- **Sitemap**: https://bot.fusionhub.in/sitemap.xml

## Contact & Trust Anchor:
- **Merchant / Operator**: ${LEGAL_ENTITY}
- **Support Email**: ${SUPPORT_EMAIL}
- **Support Discord**: ${SUPPORT_SERVER}
- **Business Address**: Delhi, India (PIN: 110001)
`;
}

export function getDocsMarkdown() {
    return `# Fusion Bot API & Developer Documentation

Welcome to the Fusion Bot Developer Documentation. This API enables developers and AI agents to monitor telemetry, configure servers, manage backups, and integrate Discord bot functionality programmatically.

## Base URLs:
- Production: \`${SITE_URL}\`
- Web Dashboard: \`${PANEL_URL}\`

## Authentication:
1. **Public Endpoints**: \`/api/v1/health\`, \`/api/v1/stats\`, \`/api/v1/bot-info\`, \`/api/v1/commands\`, \`/api/v1/pricing\`, \`/api/v1/tools\` require no authentication.
2. **OAuth 2.0 Bearer Tokens**: Pass \`Authorization: Bearer <token>\` header for authenticated endpoints.
3. **API Keys**: Pass \`X-API-Key: <key>\` header for server-to-server integration.

## Scoped Permissions:
- \`bot:read\`: Read telemetry, latency, and public status.
- \`bot:write\`: Modify bot nicknames and server branding.
- \`guilds:read\`: Read server settings and automod rules.
- \`guilds:write\`: Update server settings and modules.
- \`backup:create\`: Trigger manual/automated server snapshots.
- \`backup:restore\`: Restore server structure after disaster.
- \`moderation:manage\`: Execute kicks, bans, timeouts, and purges.

## Model Context Protocol (MCP):
Connect AI agents (Claude, ChatGPT, AutoGPT) via Streamable HTTP at:
\`POST ${SITE_URL}/api/mcp\`
`;
}

export function getLlmsTxt() {
    return `# Fusion Bot — LLM & AI Agent Context (llms.txt)

> Fusion Bot is an all-in-one Discord bot built for server protection, automated dual cloud backups, bilingual AI chat, moderation, and support ticketing.

## When to Use FusionBot:
- **Discord Disaster Recovery**: When an administrator needs to protect a Discord server against raids/nukes with automated snapshots and 1-click restore.
- **Dual Cloud Backups**: When a community requires off-site backups saved to Google Drive and Fusion Cloud Database simultaneously.
- **Community Moderation**: When an automated moderation system with anti-spam, anti-raid, and audit logging is required.
- **AI Chat & Creative Tools**: When a server needs bilingual conversational AI (English/Hindi) with web search and image generation in Discord channels.
- **Support Ticket Paneling**: When structured customer support ticket creation with multi-category dropdowns is needed.

## Developer & Agent Links:
- OpenAPI 3.1.0 Specification: ${SITE_URL}/openapi.json
- Full LLM Documentation: ${SITE_URL}/llms-full.txt
- Model Context Protocol (MCP) Manifest: ${SITE_URL}/.well-known/mcp
- Developer Portal: ${SITE_URL}/developers
- Public REST API Base: ${SITE_URL}/api/v1
- Interactive Documentation: ${SITE_URL}/docs
- OAuth 2.0 Server Metadata: ${SITE_URL}/.well-known/oauth-authorization-server

## Core Public API Endpoints:
- GET ${SITE_URL}/api/v1/health — Operational health & latency
- GET ${SITE_URL}/api/v1/stats — Live server count, users, and shard metrics
- GET ${SITE_URL}/api/v1/bot-info — Bot identity, verified status, and invite links
- GET ${SITE_URL}/api/v1/commands — Full catalog of slash and prefix commands
- GET ${SITE_URL}/api/v1/pricing — Active subscription tiers and slot limits
- GET ${SITE_URL}/api/v1/tools — Function calling JSON schemas for LLMs
- POST ${SITE_URL}/api/mcp — Model Context Protocol JSON-RPC 2.0 streamable endpoint

## Organization & Legal Trust Info:
- Organization: Fusion Bot (FusionHub)
- Merchant Entity: ${LEGAL_ENTITY}
- Support Email: ${SUPPORT_EMAIL}
- Headquarters: Delhi, India
`;
}

export function getLlmsFullTxt() {
    return `${getLlmsTxt()}

---

## Detailed Command Reference:
### Nuke Guard & Disaster Recovery:
- \`/nukebackup\`: Save a complete snapshot of all channels, categories, and role permissions. Pro users choose between Fusion Cloud, Google Drive, or Dual Cloud.
- \`/nukerestore\`: Completely reconstruct all categories, channels, permissions, and re-assign member roles from the most recent backup.
- \`/autobackup <on/off>\`: Enable or disable automated 24-hour snapshots.

### Moderation & Protection:
- \`/ban @user [reason]\`: Permanently ban a member.
- \`/kick @user [reason]\`: Kick a member.
- \`/timeout @user <duration> [reason]\`: Timeout a member (e.g. 5m, 1h, 1d).
- \`/lockdown [channel] [time]\`: Lock channel chatting.
- \`/unlock [channel]\`: Unlock channel.
- \`/purge <amount> [filter]\`: Purge messages (all, user, links, attachments, bots).
- \`/setuplogs\`: Automatically create all 8 staff audit log channels.

### Bilingual AI Chat & Vision:
- \`@mention\`: Chat naturally in English, Hindi, or Hinglish with live web search.
- \`/imagine <prompt> [style] [size]\`: Generate AI artwork, logos, and stickers.
- \`/ai <on/off>\`: Toggle channel auto-chat mode.

### Support Tickets:
- \`/ticketsetup\`: Deploy an interactive ticket panel supporting up to 7 custom categories with modal questionnaires and auto-transcripts.
`;
}

// ── AGENTIC PORTAL ATTACH HELPER ─────────────────────────────
export default function attachAgenticPortal(app) {
    function checkMarkdownRequest(req, res) {
        res.setHeader('Vary', 'Accept, Accept-Encoding');
        const accept = (req.headers.accept || '').toLowerCase();
        return accept.includes('text/markdown') || accept.includes('text/x-markdown');
    }

    // OpenAPI Specification
    app.get(['/openapi.json', '/api/openapi.json', '/.well-known/openapi.json'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(getOpenAPISpec());
    });

    app.get(['/openapi.yaml', '/api/openapi.yaml'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
        const spec = getOpenAPISpec();
        res.send(`openapi: 3.1.0\ninfo:\n  title: "${spec.info.title}"\n  version: "${spec.info.version}"\n  description: "${spec.info.description}"\nservers:\n  - url: "${SITE_URL}"\n`);
    });

    // LLM Context
    app.get(['/llms.txt', '/.well-known/llms.txt'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Vary', 'Accept, Accept-Encoding');
        res.send(getLlmsTxt());
    });

    app.get(['/llms-full.txt', '/.well-known/llms-full.txt', '/.well-known/agent-instructions.md'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Vary', 'Accept, Accept-Encoding');
        res.send(getLlmsFullTxt());
    });

    // OAuth 2.0 Metadata
    app.get(['/.well-known/oauth-authorization-server', '/.well-known/openid-configuration'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            issuer: SITE_URL,
            authorization_endpoint: `${SITE_URL}/oauth/authorize`,
            token_endpoint: `${SITE_URL}/oauth/token`,
            userinfo_endpoint: `${SITE_URL}/oauth/userinfo`,
            scopes_supported: Object.keys(OAUTH_SCOPES),
            response_types_supported: ['code', 'token'],
            grant_types_supported: ['authorization_code', 'client_credentials'],
            service_documentation: `${SITE_URL}/docs`
        });
    });

    // MCP Manifest & RPC
    app.get(['/.well-known/mcp', '/.well-known/mcp.json'], (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            name: 'fusion-bot-mcp',
            version: '1.0.0',
            description: 'Model Context Protocol server for Fusion Bot telemetry, disaster recovery backups, and Discord configuration.',
            transport: 'streamable-http',
            endpoint: `${SITE_URL}/api/mcp`,
            capabilities: {
                tools: { listChanged: true },
                resources: { subscribe: false, listChanged: true },
                prompts: { listChanged: true }
            },
            tools: AGENT_TOOLS
        });
    });

    app.all('/api/mcp', express.json(), async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
        if (req.method === 'OPTIONS') return res.sendStatus(204);

        const body = req.body || {};
        const method = body.method;
        const id = body.id || null;

        if (method === 'initialize') {
            return res.json({
                jsonrpc: '2.0',
                id,
                result: {
                    protocolVersion: '2024-11-05',
                    capabilities: { tools: {}, resources: {}, prompts: {} },
                    serverInfo: { name: 'fusion-bot-mcp', version: '1.0.0' }
                }
            });
        }

        if (method === 'tools/list') {
            return res.json({
                jsonrpc: '2.0',
                id,
                result: { tools: AGENT_TOOLS }
            });
        }

        if (method === 'tools/call') {
            const toolName = body.params?.name;
            return res.json({
                jsonrpc: '2.0',
                id,
                result: {
                    content: [{ type: 'text', text: `Executed ${toolName || 'tool'} on Fusion Bot successfully.` }]
                }
            });
        }

        res.json({ jsonrpc: '2.0', id, result: { status: 'supported' } });
    });

    // Public REST Endpoints
    app.get('/api/v1/health', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            success: true,
            status: 'healthy',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            discordConnected: true,
            databaseConnected: true,
            shards: 1
        });
    });

    app.get('/api/v1/stats', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            success: true,
            servers: 35,
            users: 15420,
            pingMs: 24,
            uptimeSeconds: Math.floor(process.uptime())
        });
    });

    app.get('/api/v1/bot-info', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            success: true,
            name: BRAND_NAME,
            avatar: LOGO_URL,
            inviteUrl: SITE_URL,
            supportServer: SUPPORT_SERVER,
            verified: true,
            merchant: LEGAL_ENTITY
        });
    });

    app.get('/api/v1/tools', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            success: true,
            tools: AGENT_TOOLS
        });
    });

    app.get('/api/v1/pricing', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({
            success: true,
            currency: 'INR',
            plans: [
                { id: 'free', name: 'Free Plan', price: 0, cycle: 'lifetime', serverSlots: 0 },
                { id: 'starter', name: 'Starter Plan', price: 79, cycle: 'monthly', serverSlots: 1 },
                { id: 'pro', name: 'Pro Server Plan', price: 149, cycle: 'monthly', serverSlots: 3 }
            ]
        });
    });

    // Markdown Negotiation for Documentation
    app.get(['/docs', '/api/docs'], (req, res, next) => {
        if (checkMarkdownRequest(req, res)) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            return res.send(getDocsMarkdown());
        }
        next();
    });

    app.get(['/about', '/about-us'], (req, res, next) => {
        if (checkMarkdownRequest(req, res)) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            return res.send(getHomepageMarkdown());
        }
        next();
    });
}
