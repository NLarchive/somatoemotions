import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.resolve('.cache/ms-playwright');
await import('../node_modules/playwright/cli.js');
