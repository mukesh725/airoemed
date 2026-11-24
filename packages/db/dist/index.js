"use strict";
/**
 * AIRO eMed US — Database Access & Migration Layer
 * Exports Prisma schema references and database connection utilities.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_DB_PROVIDER = exports.DB_SCHEMA_VERSION = void 0;
exports.getDatabaseConfig = getDatabaseConfig;
exports.DB_SCHEMA_VERSION = '1.0.0';
exports.SUPPORTED_DB_PROVIDER = 'postgresql';
function getDatabaseConfig() {
    return {
        url: process.env['DATABASE_URL'] || 'postgresql://airo:airo@localhost:5432/airo_us_db',
        maxConnections: parseInt(process.env['DATABASE_MAX_CONNECTIONS'] || '20', 10),
        sslRequired: process.env['NODE_ENV'] === 'production',
        enableQueryLogging: process.env['NODE_ENV'] !== 'production',
    };
}
//# sourceMappingURL=index.js.map