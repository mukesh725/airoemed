/**
 * AIRO eMed US — Database Access & Migration Layer
 * Exports Prisma schema references and database connection utilities.
 */

export const DB_SCHEMA_VERSION = '1.0.0';
export const SUPPORTED_DB_PROVIDER = 'postgresql';

export interface DatabaseConfiguration {
  url: string;
  maxConnections: number;
  sslRequired: boolean;
  enableQueryLogging: boolean;
}

export function getDatabaseConfig(): DatabaseConfiguration {
  return {
    url: process.env['DATABASE_URL'] || 'postgresql://airo:airo@localhost:5432/airo_us_db',
    maxConnections: parseInt(process.env['DATABASE_MAX_CONNECTIONS'] || '20', 10),
    sslRequired: process.env['NODE_ENV'] === 'production',
    enableQueryLogging: process.env['NODE_ENV'] !== 'production',
  };
}
