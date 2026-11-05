import { defineConfig } from '@playwright/test';
import { readFileSync } from 'node:fs';
export default defineConfig({
  testDir:'./tests/e2e',timeout:120000,expect:{timeout:10000},workers:3,retries:0,
  metadata:{content_id:JSON.parse(readFileSync('dist/release-manifest.json','utf8')).content_id,profile:'local loopback HTTP, unthrottled; no field metrics'},
  reporter:[['list'],['json',{outputFile:'docs/reports/browser-results.json'}]],
  use:{baseURL:'http://127.0.0.1:4178/atlas/',trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'firefox',use:{browserName:'firefox'}},{name:'webkit',use:{browserName:'webkit'}}],
  webServer:{command:`"${process.execPath}" scripts/serve.mjs --root dist --port 4178 --base /atlas/`,url:'http://127.0.0.1:4178/atlas/',reuseExistingServer:false,timeout:20000}
});
