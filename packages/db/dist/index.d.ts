/**
 * AIRO eMed US — Database Access & Migration Layer
 * Exports Prisma schema references and database connection utilities.
 */
export declare const DB_SCHEMA_VERSION = "1.0.0";
export declare const SUPPORTED_DB_PROVIDER = "postgresql";
export interface DatabaseConfiguration {
    url: string;
    maxConnections: number;
    sslRequired: boolean;
    enableQueryLogging: boolean;
}
export declare function getDatabaseConfig(): DatabaseConfiguration;
//# sourceMappingURL=index.d.ts.map