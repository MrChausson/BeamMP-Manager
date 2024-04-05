import {ConfigManager} from '$lib/ConfigManager';
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';

async function getResources(folder: string)
{
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
    const fileToWrite = join(join(ConfigManager.getConfig().resourceFolder, folder), file.name);
    const reader = file;

    await Bun.write(fileToWrite, reader);
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log(url);
    const folder = url.pathname.split("/").pop();
    console.log(folder);
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
    console.log(resources_list);
    return new Response(JSON.stringify({
        list: resources_list
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
    const file = await request.text();
    // console.log(request);
    // let formData;
    // try {
    //     formData = await request.formData();
    // } catch (e) {
    //     console.log(e);
    //     return new Response(JSON.stringify({
    //         success: false,
    //         message: "Wrong data format"
    //     }), {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         status: 500
    //     });
    // }
    // console.log(formData);
    // const file = formData.getAll('file');
    console.log(file)
    if (!file) {
        return new Response(JSON.stringify({
            success: false
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    }

    // Save file
    saveResource(folder, file, "test.zip");

    return new Response(JSON.stringify({
        success: true,
    }), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });
}