import { BridgeVersion } from "@library/components/types"

/**
 * Parse the version from Bridge's version string
 * Bridge uses a major, minor, patch, hotfix versioning system
 * @param versionString The version string to parse
 * @returns BridgeVersion
 */

export function parseBridgeVersion(versionString: string): BridgeVersion {
	const [major, minor, patch, hotfix] = versionString.split(".").map(Number)
	return {
		major,
		minor,
		patch,
		hotfix,
	}
}
