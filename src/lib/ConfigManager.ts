import { env } from '$env/dynamic/public';

export class ConfigManager {
    static getConfig() {
        let templateConfig = env.PUBLIC_CONF_TEMPLATE
            ? Buffer.from(env.PUBLIC_CONF_TEMPLATE, 'base64').toString('utf-8')
            : 'defaultTemplateConfig'; // replace with your default value
        return {
            resourceFolder: env.PUBLIC_RESOURCES_FOLDER || '/home/beam/server/Resources',
            serverConfig: env.PUBLIC_CONF_PATH || '/home/beam/server/ServerConfig.toml',
            templateConfig: templateConfig,
        };
    }
}