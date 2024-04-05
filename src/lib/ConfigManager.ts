import { env } from '$env/dynamic/public'; 

export class ConfigManager {
    static getConfig() {
        return {
            resourceFolder: env.PUBLIC_RESOURCES_FOLDER || '/home/beam/server/Resources',
            serverConfig: env.PUBLIC_CONFG_PATH || '/home/beam/server/ServerConfig.toml',
        };
    }
}