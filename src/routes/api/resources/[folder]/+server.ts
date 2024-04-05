import { ConfigManager } from '$lib/ConfigManager';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';


async function getResources(folder: string) {
    const resourcefolder = join(ConfigManager.getConfig().resourceFolder, folder);
    let resourcesList = [];
    const files = await readdir(resourcefolder);
    for (const file of files) {
        if (extname(file) === '.zip') {
            const stats = await stat(join(resourcefolder, file));
            resourcesList.push({
                filename: file,
                size: stats.size
            });
        }
    }

    return resourcesList;
}

async function saveResource(folder: string, file: any, filename: string) {
    console.log(filename);
    console.log(ConfigManager.getConfig());
    const fileToWrite = join(join(ConfigManager.getConfig().resourceFolder, folder), filename);
    console.log(fileToWrite);
    const reader = file;

    await Bun.write(fileToWrite, reader);
}

async function deleteResource(folder: string, filename: string) {
    const fileToDelete = join(ConfigManager.getConfig().resourceFolder, folder, filename.toString());
    await unlink(fileToDelete);
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const folder = url.pathname.split("/").pop();
    if (!(folder == "Client" || folder == "Server")) {
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    const resources_list = await getResources(folder);
    return new Response(JSON.stringify({
        list: resources_list
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}

export async function DELETE({ request, params }) {
    const folder = params.folder;
    if (!(folder == "Client" || folder == "Server")) {
        return new Response(JSON.stringify({
            success: false,
            message: "Invalid folder"
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    const data = await request.json()
    const filename = data.filename;
    if (!filename || filename == "" || !filename.endsWith('.zip')) {
        return new Response(JSON.stringify({
            success: false,
            message: "Missing filename"
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    await deleteResource(folder, filename);
    return new Response(JSON.stringify({
        success: true,
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}

export async function POST({ request, params }) {
    // Check if param is a file ending in .zip
    const folder = params.folder;
    if (!(folder == "Client" || folder == "Server")) {
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");
    console.log(file);
    if (!filename || !file) {
        return new Response(JSON.stringify({
            success: false,
            message: "Missing filename or file"
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }
    // Save file
    saveResource(folder, file, filename.toString());

    return new Response(JSON.stringify({
        success: true,
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}