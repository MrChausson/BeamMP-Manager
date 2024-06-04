import { env } from '$env/dynamic/public';

export class ConfigManager {
    static getConfig() {
        let templateConfig = env.PUBLIC_CONF_TEMPLATE
            ? Buffer.from(env.PUBLIC_CONF_TEMPLATE, 'base64').toString('utf-8')
            : Buffer.from("W0dlbmVyYWxdCkF1dGhLZXkgPSAnJwpEZWJ1ZyA9IGZhbHNlCkRlc2NyaXB0aW9uID0gJ0dldCB5b3VyIGZyZWUgc2VydmVyIG9uIGhvc3RpbmcuY2hhdXNzb24uc2VydmljZXMnCk1hcCA9ICcvbGV2ZWxzL2dyaWRtYXBfdjIvaW5mby5qc29uJwpNYXhDYXJzID0gMQpNYXhQbGF5ZXJzID0gMTAKTmFtZSA9ICdCZWFtTVAgU2VydmVyIC0gRnJlZSBTZXJ2ZXJzIG9uIGhvc3RpbmcuY2hhdXNzb24uc2VydmljZXMgIScKUG9ydCA9IDMwODE0ClByaXZhdGUgPSBmYWxzZQpSZXNvdXJjZUZvbGRlciA9ICdSZXNvdXJjZXMn", 'base64').toString('utf-8');
        let resourceFolder = '/home/beam/server/Resources';
        let serverConfig = '/home/beam/server/ServerConfig.toml';
        let serverExecutable = '/home/beam/server/BeamMP-Server';
        let logFile = '/home/beam/server/server.log';

        if (env.PUBLIC_SERVER_FOLDER) {
            resourceFolder = `${env.PUBLIC_SERVER_FOLDER}/Resources`;
            serverConfig = `${env.PUBLIC_SERVER_FOLDER}/ServerConfig.toml`;
            serverExecutable = `${env.PUBLIC_SERVER_FOLDER}/BeamMP-Server`;
            logFile = `${env.PUBLIC_SERVER_FOLDER}/Server.log`;
        }

        return {
            resourceFolder: env.PUBLIC_RESOURCES_FOLDER || resourceFolder,
            serverConfig: env.PUBLIC_CONF_PATH || serverConfig,
            templateConfig: templateConfig,
            serverExecutable: env.PUBLIC_SERVER_EXECUTABLE || serverExecutable,
            logFile: env.PUBLIC_LOG_FILE || logFile
        };
    }
}