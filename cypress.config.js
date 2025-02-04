const { defineConfig } = require('cypress')

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
      require('cypress-qase-reporter/plugin')(on, config); // Verifique se o caminho está correto
      return config;
    }
  }
});

