// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
// Carrega .env para os testes (contém SAUCE_USERNAME / SAUCE_PASSWORD)
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Executa testes em arquivos em paralelo */
  fullyParallel: true,
  /* Falha o build no CI se houver `test.only` deixado acidentalmente no código. */
  forbidOnly: !!process.env.CI,
  /* Retry apenas em CI */
  retries: process.env.CI ? 2 : 0,
  /* Desabilita execução paralela em CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter a ser usado. Ver https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configurações compartilhadas para todos os projetos abaixo. Ver https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL a ser usada em ações como `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Coleta trace quando houver retry do teste falho. Ver https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Testar em viewports mobile. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Testar em navegadores "branded". */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Rodar seu servidor local de desenvolvimento antes de iniciar os testes */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

