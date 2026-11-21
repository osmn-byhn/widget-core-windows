import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutostartManager } from './autostart.js';
import { execSync } from 'child_process';
vi.mock('child_process');
describe('AutostartManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal('process', { ...process, platform: 'win32' });
    });
    it('should enable autostart on Windows', () => {
        const manager = new AutostartManager();
        const success = manager.enable('test-id', 'Test Widget', 'node runner.js');
        expect(success).toBe(true);
        expect(execSync).toHaveBeenCalledWith(expect.stringContaining('reg add'));
    });
    it('should disable autostart on Windows', () => {
        const manager = new AutostartManager();
        const success = manager.disable('test-id');
        expect(success).toBe(true);
        expect(execSync).toHaveBeenCalledWith(expect.stringContaining('reg delete'));
    });
});
//# sourceMappingURL=autostart.test.js.map