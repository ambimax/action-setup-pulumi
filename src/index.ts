import * as os from "os";
import * as util from "util";
import * as path from "path";

import * as toolCache from "@actions/tool-cache";
import * as core from "@actions/core";

/**
 * Gets the download url for the given version depending on the current os.
 *
 * @param version The version to get.
 */
function getDownloadURL(version: string): string {
    switch (os.type()) {
        case "Linux":
            return util.format(
                "https://get.pulumi.com/releases/sdk/pulumi-v%s-linux-x64.tar.gz",
                version,
            );

        case "Darwin":
            return util.format(
                "https://get.pulumi.com/releases/sdk/pulumi-v%s-darwin-x64.tar.gz",
                version,
            );

        case "Windows_NT":
        default:
            return util.format(
                "https://get.pulumi.com/releases/sdk/pulumi-v%s-windows-x64.tar.gz",
                version,
            );
    }
}

/**
 * Downloads pulumi with the given version.
 *
 * @param version The version to download.
 */
async function downloadPulumi(version: string): Promise<void> {
    let cachedToolpath = toolCache.find("pulumi", version);
    if (!cachedToolpath) {
        let downloadPath;
        try {
            downloadPath = await toolCache.downloadTool(
                getDownloadURL(version),
            );
        } catch (exception) {
            console.log(exception);
            throw new Error(
                util.format(
                    "Failed to download Pulumi from location ",
                    getDownloadURL(version),
                ),
            );
        }

        const extractedPath = await toolCache.extractTar(downloadPath);
        cachedToolpath = await toolCache.cacheDir(
            path.join(extractedPath, "pulumi"),
            "pulumi",
            version,
        );
    }

    core.addPath(cachedToolpath);
}

/**
 * Main entrypoint for the action.
 */
async function run(): Promise<void> {
    const version = core.getInput("version", { required: true });

    await downloadPulumi(version);

    console.log(
        `Pulumi version: '${version}' has been downloaded and added to path`,
    );
}

run().catch(core.setFailed);
