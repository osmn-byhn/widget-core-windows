import { execSync } from 'child_process';

export class AutostartManager {
    constructor() {
        if (process.platform !== 'win32') {
            console.warn("AutostartManager is only supported on Windows.");
        }
    }

    public enable(id: string, _name: string, command: string): boolean {
        if (process.platform !== 'win32') return false;
        try {
            return this.enableWindows(id, command);
        } catch (e) {
            return false;
        }
    }

    public disable(id: string): boolean {
        if (process.platform !== 'win32') return false;
        try {
            return this.disableWindows(id);
        } catch (e) {
            return false;
        }
    }

    private enableWindows(id: string, command: string): boolean {
        // Use reg.exe to add to HKCU Run
        try {
            const key = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`;
            const valueName = `Widget_${id}`;
            // Escape quotes in command if necessary
            execSync(`reg add "${key}" /v "${valueName}" /t REG_SZ /d "${command.replace(/"/g, '\\"')}" /f`);
            return true;
        } catch (e) {
            console.error("Failed to enable Windows autostart:", e);
            return false;
        }
    }

    private disableWindows(id: string): boolean {
        try {
            const key = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`;
            const valueName = `Widget_${id}`;
            execSync(`reg delete "${key}" /v "${valueName}" /f`);
            return true;
        } catch (e) {
            // Might not exist, which is fine
            return true; 
        }
    }
}
