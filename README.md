### WebdriverIO with Cucumber BDD

This framework demonstrates how to use the webdriverio tool and develop automation scripts using the Cucumber (v6.x) BDD framework. It supports ES5 to ES8 (via babel-register), provides utility methods for eg. read data from MS-Excel. It generates JUNIT, Allure, Cucumber reports. Cucumber HTML report is auto generated.

Reference: https://webdriver.io/docs/api.html

### Installation

This project is tested on ***Node v8.10.0*** and Above. Currently we have node v12.16.2 installed.

`JDK 1.8:` Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` nothing else.

`Node.JS:` Install node version v12.16.2.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

        node -v
        npm -v

Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

### How to use this framework in your repo

### Selenium

Once all the node dependency modules are installed (through `npm install`) then for development, 
you must have selenium server up and running to execute any WebdriverIO tests, or it will fail fast with an error.

We are using `services: ['selenium-standalone'],` in .conf.js to start selenium server automatically which has been added as part of this project. You don't need to start it explicitly.


### Browsers

To run tests on Chrome, Firefox make sure those browsers are installed on your machine.

### Run Tests

To execute the entire test suite, use the command below

`npm run tests`

If you want to run a specific feature file or specific set of scenarios add the respective tag in package.json as below

`--cucumberOpts.tagExpression='@test'`

Then run the tests


To dry run your scenarios, add the feature file name you want to generate the steps for in package.json scripts section and then use

`npm run step-generator`

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways. The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files end with `*.conf.js`.
### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.  

##### Cucumber html

We are generating a cucumber html report and configuration for that exists in wdio.conf.js

Report path: ./cucumber-report/index.html

##### Using Cucumber JavaScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests `*.feature` files are placed in the `/test/specs/` directory. A typical test will look similar to this:
```
@regression
Feature: Google Search

  @google-search
  Scenario: Log in to the Application
    Given I am google search page
    When I fill in "SearchField" with "WebdriverIO"
    And perform a search
    Then the search result contains text "SEARCH_TEXT_RESULT"

```

The step defs `*.steps.js` are placed in `/test/steps/`

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions(in cucumber) or in Spec file (in Jasmine or Mocha), we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.



```
import Page from './basePage';
const actionUtility = require('../../utilities/actionUtility');

class SearchPage extends Page {
  get elements() {
    return {
      "SearchField": "//input[@title='Search']",
      "SearchResult": "#search",
      getElementByText: (text) => `//div[@id='search']//div[@id='rso']//div[@class='r']//h3[contains(text(),'${text}')]`
    }
  }

  expectedSearchResult (text) {
    actionUtility.waitForDisplayed(this.elements.SearchResult);
    return $(this.elements.getElementByText(text)).isDisplayed();
  }
}

const SearchPageObj = new SearchPage();
export default SearchPageObj;
exports.SearchPageElements = SearchPageObj.elements;

```

In the current framework we are exporting all pages elements into a single elements object in ElementsPage.js All the elements can be accessed from here in your step def and other pages.

When a new `*Page.js` is created under `pageObjects` it should be imported to `elementsPage.js`. Refer already existing pages.

```

### Action Utility
A wrapper is written for all the web page actions in actionUtility.js
You need to require this module to be able to use all the webdriverio action apis
```
const actionUtility = require('../../utilities/actionUtility');

actionUtility.click();
``` 

### Data
Using the `cannedData.json` we can supply the data required for the tests instead of hard coding them in the feature files or step def.

### Username in CannedData.json
In cannedData.json file, USERNAME is updated whenever the registration scenario is executed and the same USERNAME is used to login in other scenarios.

