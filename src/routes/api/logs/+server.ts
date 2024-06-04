import { ConfigManager } from '$lib/ConfigManager';
import { readFile } from 'node:fs/promises';


export async function GET() {

    let content;
    try {
        content = await readFile(ConfigManager.getConfig().logFile);
    } catch {
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain'
        },
        status: 200
    });
}