import { ConfigManager } from '$lib/ConfigManager';
import { writeFile, readFile } from 'node:fs/promises';


/** @type {import('./$types').RequestHandler} */
export async function DELETE() {
    // this will reset the config with the template
    const config = ConfigManager.getConfig();
    try {
        await writeFile(config.serverConfig, config.templateConfig);
    } catch (err) {
        console.error(`Error writing to file ${config.serverConfig}:`, err);
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    return new Response(JSON.stringify({
        success: true
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}

export async function GET() {

    let content;
    try {
        content = await readFile(ConfigManager.getConfig().serverConfig);
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

export async function POST({request}) {
    // this will update the config with the new content
    const config = ConfigManager.getConfig();
    const body = await request.text();

    try {
        await writeFile(config.serverConfig, body);
    } catch (err) {
        console.error(`Error writing to file ${config.serverConfig}:`, err);
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }

    return new Response(JSON.stringify({
        success: true
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}