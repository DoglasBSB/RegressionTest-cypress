const { defineConfig } = require('cypress')
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  projectId: '22x3fd',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: ['cypress-mochawesome-reporter', 'cypress-qase-reporter'],
    mochawesomeReporterOptions: {
      charts: true,
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true
    },
    qaseReporterOptions: {
      apiToken: process.env.QASE_API_TOKEN,  // Use variável de ambiente para segurança
      projectCode: 'OHRM22',
      logging: true,
      video: false
    }
  },
  viewportWidth: 1280,
  viewportHeight: 900,
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {

      const reportPath = path.join(__dirname, 'cypress/reports/html/.jsons');
      const screenshotPath = path.join(__dirname, 'cypress/screenshots');

      if (!fs.existsSync(reportPath)) {
        fs.mkdirSync(reportPath, { recursive: true });
      }

      if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath, { recursive: true });
      }

      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});

