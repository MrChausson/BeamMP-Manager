
async function getBeamMPState(): Promise<string> {
    const proc = Bun.spawn(["/usr/bin/systemctl", "--user", "is-active", "beammp"])
    let res = await new Response(proc.stdout).text();
    //remove trailing newline
    res = res.replace(/\n$/, '');
    return res;
}

export async function GET() {
    console.log("GET /api/server-state/+server");
    return new Response(JSON.stringify({
        state: await getBeamMPState()
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}