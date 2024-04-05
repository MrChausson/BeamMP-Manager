export class HandlerManager {

    static async handleRestart() {
        const response = await fetch('/api/restart', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            return data.success == true;
        }
        throw new Error('Failed to make request');
    }

    static async handleStart() {
        const response = await fetch('/api/start', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            return data.success == true;
        }
        throw new Error('Failed to make request');
    }

    static async handleStop() {
        const response = await fetch('/api/stop', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            return data.success == true;
        }
        throw new Error('Failed to make request');
    }
}