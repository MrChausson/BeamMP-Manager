async function restartBeamMP(): Promise<Boolean> {
    const proc = Bun.spawn(["/usr/bin/systemctl", "--user", "restart", "beammp"])
    return proc.exitCode === 0;
}

export async function POST() {
    console.log("POST /api/restart/+server");
    const exec = await restartBeamMP();
    return new Response(JSON.stringify({
        success: exec ? true : false
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: exec ? 200 : 500
    });
}