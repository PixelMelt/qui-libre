-- Drop license-related indexes
DROP INDEX IF EXISTS idx_licenses_status;
DROP INDEX IF EXISTS idx_licenses_theme;

-- Drop the licenses table
DROP TABLE IF EXISTS licenses;
