const defaultTimeoutInterval = process.env.DEBUG ? 60 * 60 * 500 : 1500000;
const { removeSync } = require("fs-extra");
const { join } = require("path");
const cucumberJson = require("wdio-cucumberjs-json-reporter").default;
const startTime = new Date().toLocaleString();

const url = process.env.URL;

let engine = process.argv[3].split('=')[1];
if (!engine.includes('selenium')) engine = '';

exports.config = {
  runner: "local",
  // Define which test specs should run.
  specs: [
    './test/specs/**/*.feature'
  ],
  // Patterns to exclude.
  exclude: [
  ],

  // Define your capabilities here.
  // maxInstances: 2,
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "cjson:metadata": {
        device: "Windows Desktop",
        platform: {
          name: "Windows",
          version: "10",
        },
      },
    },
    // {
    //   maxInstances: 1,
    //   browserName: "firefox",
    //   "cjson:metadata": {
    //     device: "Windows Desktop",
    //     platform: {
    //       name: "Windows",
    //       version: "10",
    //     },
    //   },
    // },
  ],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  sync: true,
  logLevel: "error",
  coloredLogs: true, // Enables colors for log output.
  screenshotPath: "./test/reports/errorShots/", // Saves a screenshot to a given path if a command fails.

  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  // Set a base URL
  baseUrl: `${url}`,

  // Default timeout for all waitFor* commands.
  waitforTimeout: 150000,
  connectionRetryTimeout: 150000,
  connectionRetryCount: 3,

  reporters: [
    [
      "cucumberjs-json",
      {
        jsonFolder: "./test/reports/cucumber-results/",
      },
    ],
  ],

  // Test runner services
  services: [
    engine
  ],

  // Framework you want to run your specs with.
  framework: "cucumber",

  cucumberOpts: {
    requireModule: ["@babel/register"],
    require: ["./test/steps/*.steps.js"],
    backtrace: true,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagsInTitle: false,
    tagExpression: "not @Pending",
    timeout: defaultTimeoutInterval,
    ignoreUndefinedDefinitions: true,
    failAmbiguousDefinitions: true,
  },

  // Hooks
  onPrepare: function (config, capabilities) {
    removeSync("./test/reports/cucumber-results");
    removeSync("./log");
  },

  beforeSession: function (config, capabilities, specs) {
    require("@babel/register");
  },

  before: function (capabilities, specs) {
    const chai = require("chai");

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    global.reporter = require("wdio-cucumberjs-json-reporter").cucumberJson;
  },

  afterStep(uri, feature, result) {
    if (!result.passed)
      cucumberJson.attach(browser.takeScreenshot(), "image/png");
  },

  onComplete(exitCode, config, capabilities, results) {
    const endTime = new Date().toLocaleString();
    const report = require("multiple-cucumber-html-reporter");
    const fs = require("fs");
    if(fs.existsSync("./test/reports/cucumber-results/")) {
    report.generate({
      jsonDir: "./test/reports/cucumber-results/",
      reportPath: "./cucumber-report/",
      openReportInBrowser: false,
      pageTitle: "WWW Functional Tests",
      pageFooter:
        "<div><p> &nbsp &nbsp &nbsp A report for visual & functional tests</p></div>",
      displayDuration: true,
      reportName: "WWW Functional Tests",
      customData: {
        title: 'WWW Test Execution',
        data: [
          { label: 'Project', value: 'WWW' },
          { label: 'Release', value: 'X.X.X' },
          { label: 'Cycle', value: 'X.X' },
          { label: 'Execution Start Time', value: startTime },
          { label: 'Execution End Time', value: endTime }
        ]
      }
    });
  }
},
};
