import { ConfigManager } from "$lib/ConfigManager";

async function installBeamMP(): Promise<Boolean> {
    const response = await fetch("https://github.com/BeamMP/BeamMP-Server/releases/latest/download/BeamMP-Server.ubuntu.22.04.x86_64")
    if (!response.ok) {
        console.error("Failed to download BeamMP-Server-linux");
        return false;
    }
    // Create folder for the server
    const serverFolder = ConfigManager.getConfig().serverExecutable.split("/").slice(0, -1).join("/");
    const procfolder = Bun.spawnSync(["mkdir", "-p", serverFolder]);
    if (procfolder.exitCode != 0) {
        console.log("Failed to create server folder in " + serverFolder)
        console.error(procfolder.stderr);
        return false;
    }

    await Bun.write(ConfigManager.getConfig().serverExecutable, response);

    // Stop the server if it's running
    Bun.spawnSync(["systemctl", "--user", "stop", "beammp"]);

    // Now we need to make the file executable
    const proc = Bun.spawnSync(["chmod", "+x", ConfigManager.getConfig().serverExecutable]);
    console.log(ConfigManager.getConfig().serverExecutable);
    if (procfolder.exitCode != 0) {
        console.error(proc.stderr);
        return false;
    }

    // Now let's create the ServerConfig.toml file only if it doesn't exist
    if (!Bun.file(ConfigManager.getConfig().serverConfig).exists()) {
        Bun.write(ConfigManager.getConfig().serverConfig, ConfigManager.getConfig().templateConfig);
    }

    // find the current user
    const proc2 = Bun.spawnSync(["whoami"]);
    const user = proc2.stdout.toString().replace(/\n$/, '');

    //Find directory containing the server executable
    const serverDir = ConfigManager.getConfig().serverExecutable.split("/").slice(0, -1).join("/");

    // Now let's create the systemd service
    const systemdfile = `[Unit]
Description=BeamMP Server

[Service]
WorkingDirectory=${serverDir}
ExecStart=${ConfigManager.getConfig().serverExecutable}

[Install]
WantedBy=multi-user.target
    `;

    // Create directory ~/.config/systemd/user if it doesn't exist
    const homeDir = process.env.HOME;
    const proc3 = Bun.spawnSync(["mkdir", "-p", `${homeDir}/.config/systemd/user`]);
    if (proc3.exitCode != 0) {
        console.error(proc3.stderr);
        return false;
    }
    Bun.write(`${homeDir}/.config/systemd/user/beammp.service`, systemdfile);

    // Reload systemd
    const proc4 = Bun.spawnSync(["systemctl", "--user", "daemon-reload"]);
    if (proc4.exitCode != 0) {
        console.error(proc4.stderr);
        return false;
    }

    // Enable the service
    const proc5 = Bun.spawnSync(["systemctl", "--user", "enable", "beammp"]);
    if (proc5.exitCode != 0) {
        console.error(proc5.stderr);
        return false;
    }

    // Start the service
    const proc6 = Bun.spawnSync(["systemctl", "--user", "start", "beammp"]);
    if (proc6.exitCode != 0) {
        console.error(proc6.stderr);
        return false;
    }

    return true;
}

export async function POST() {
    console.log("POST /api/install/+server");
    const exec = await installBeamMP();
    return new Response(JSON.stringify({
        success: exec ? true : false
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: exec ? 200 : 500
    });
}