import { env } from '$env/dynamic/private'; 

export class ConfigManager {
    static getConfig() {
        return {
            resourceFolder: env.PRIVATE_RESOURCE_FOLDER || 'server/resources',
            serverFolder: env.PRIVATE_SERVER_FOLDER || 'server',
        };
    }
}