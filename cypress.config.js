const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId:'22x3fd',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, cypress-qase-reporter',
    cypressMochawesomeReporterReporterOptions: {
      charts: true
    },
    cypressQaseReporterReporterOptions: {
      apiToken: '5d4b38202808ea2ad88db6d0b99a4453f243822db931ac649f3408371e211eca',
      projectCode: 'OHRM22',
      logging: true,
      video: false
    }
  },
  viewportWidth: 1280,
  viewportHeight: 900,
  e2e: {
    defaultCommandTimeout:10000,
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})
