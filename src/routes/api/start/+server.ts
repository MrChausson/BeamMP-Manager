async function startBeamMP(): Promise<Boolean> {
    const proc = Bun.spawn(["/usr/bin/systemctl", "--user", "start", "beammp"])
    return proc.exitCode === 0;
}

export async function POST() {
    console.log("POST /api/start/+server");
    const exec = await startBeamMP();
    return new Response(JSON.stringify({
        success: exec ? true : false
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: exec ? 200 : 500
    });
}