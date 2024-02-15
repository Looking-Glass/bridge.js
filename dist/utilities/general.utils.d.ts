import { BridgeVersion } from "@library/components/types";
/**
 * Parse the version from Bridge's version string
 * Bridge uses a major, minor, patch, hotfix versioning system
 * @param versionString The version string to parse
 * @returns BridgeVersion
 */
export declare function parseBridgeVersion(versionString: string): BridgeVersion;
