async function stopBeamMP(): Promise<Boolean> {
    const proc = Bun.spawn(["/usr/bin/systemctl", "--user", "stop", "beammp"])
    return proc.exitCode === 0;
}

export async function POST() {
    console.log("POST /api/stop/+server");
    const exec = await stopBeamMP();
    return new Response(JSON.stringify({
        success: exec ? true : false
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: exec ? 200 : 500
    });
}