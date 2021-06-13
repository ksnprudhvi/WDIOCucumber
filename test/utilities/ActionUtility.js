module.exports = {
  click: (element) => {
    $(element).waitForClickable({ timeout: 60000, timeoutMsg: `Element ${element} is not clickable in 60sec.` });
    $(element).click();
  },
  forceClick: (element) => {
    $(element).click({ force: true });
  },

  clickAndWait: (element) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for a click.` });
    $(element).click();
    browser.pause(3000);
  },

  clickLinkText: (text) => {
    $(`=${text}`).waitForDisplayed({ timeout: 60000, timeoutMsg: `${text} not found.` });
    const link = $(`=${text}`);
    link.click()
  },

  selectByValue: (element, value) => {
    $(element).selectByAttribute('value', value);
  },

  selectByText: (element, text) => {
    $(element).selectByVisibleText(text);
  },

  getText: (element) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for get text.` });
    return $(element).getText();
  },

  getSignInText: (element) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for get text.` });
    browser.pause(5000);
    return $(element).getText();
  },

  isDisplayed: (element) => {
    return $(element).isDisplayed();
  },

  isExisting: (element) => {
    return $(element).isExisting();
  },

  isClickable: (element) => {
    return $(element).isClickable();
  },

  getAttribute: (element, value) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for getting value.` });
    return $(element).getAttribute(value);
  },

  setValue: (element, input) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for entering a value.` });
    $(element).setValue(input);
  },

  pressTab: () => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for tabbing.` });
    browser.keys('Tab');
  },

  waitUntil: (condition, error) => {
    return browser.waitUntil(() => condition(),
      { timeout: 60000, timeoutMsg: error });
  },

  waitForDisplayed: (element) => {
    return $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not displayed within 60 sec.` });
  },

  waitForClickable: (element) => {
    return $(element).waitForClickable({ timeout: 60000, timeoutMsg: `Element ${element} is not clickable within 60 sec.` });
  },

  waitForNotClickable: (element) => {
    return $(element).waitForClickable({ timeout: 60000, reverse: true, timeoutMsg: `Element not active within 60 sec.` });
  },

  openNewWindow: (url) => {
    browser.newWindow(url);
    browser.pause(20000);
    return browser.getWindowHandles();
  },

  switchToWindow: (guid) => {
    browser.switchToWindow(guid);
  },

  waitForNonExistence: (element) => {
    return browser.waitUntil(() => $(element).isDisplayed() == false, {
      timeout: 60000,
      timeoutMsg: "expected element to disappear with in 60 sec",
    });
  },

  isDisplayedInViewport: (element) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for a click.` });
    return $(element).isDisplayedInViewport();
  },

  switchToFrameByIndex: function (position) {
    browser.switchToFrame(position);
  },

  switchToFrame: (element) => {
    browser.switchToFrame($(element));
  },

  switchToParentFrame: () => {
    browser.switchToParentFrame();
  },

  getWindowHandles: () => {
    browser.pause(7000);
    return browser.getWindowHandles();
  },

  getUrl: () => {
    return browser.getUrl();
  },

  setWindowSize: function (width, height) {
    browser.setWindowSize(width, height);
    browser.pause(3000);
  },

  closeWindow: () => {
    browser.closeWindow();
  },

  moveTo: (element) => {
    $(element).moveTo();
  },

  scrollIntoView: (element) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for scrolling.` });
    $(element).scrollIntoView();
  },

  moveTo: (element) => {
    $(element).moveTo();
  },

  hover: (element) => {
    $(element).waitForDisplayed({
      timeout: 60000,
      timeoutMsg: `Element ${element} not found while moving focus.`,
    });
    $(element).moveTo();
    browser.pause(2000)
  },

  getElements: (text) => {
    return $$(text);
  },

  getElement: (text) => {
    return $(text);
  },

  isSelected: (element) => {
    return $(element).isSelected();
  },

  waitForSelected: (element) => {
    return browser.waitUntil(() => $(element).isSelected() == true, {
      timeout: 60000,
      timeoutMsg: `expected element ${element} is not selected in 60 sec`,
    });
  },

  doubleClick: (element) => {
    $(element).waitForDisplayed({
      timeout: 6000,
      timeoutMsg: `Element ${element} not found while moving focus.`,
    });
    $(element).moveTo();
    $(element).doubleClick();
  },

  getInputValue: (element) => {
    browser.waitUntil(() => $(element).getValue() != "",
      { timeout: 60000, timeoutMsg: "Value not rendered" })
    return $(element).getValue();
  },

  inputValueNotDisplayed: (element) => {
    browser.waitUntil(() => $(element).getValue() == "",
      { timeout: 60000, timeoutMsg: "Value not empty" })
    return $(element).getValue();
  },

  checkPageScreenshot: (imagename) => {
    browser.pause(5000);
    return browser.checkScreen(imagename);
  },

  clearBrowserStorage: () => {
    browser.execute("if (window.Storage){window.localStorage.clear(); window.sessionStorage.clear()}");
  },

  setBrowserZoom: () => {
    browser.execute("document.body.style.zoom = '0.4'");
  },

  isNotDisplayed: function (element) {
    return $(element).isDisplayed();
  },

  getTitle: function () {
    return browser.getTitle();
  },

  refresh: function () {
    browser.refresh();
  },

  wait: function (seconds) {
    browser.pause(seconds * 1000);
  },

  getCSSProperty: (element, attribute) => {
    $(element).waitForDisplayed({ timeout: 60000, timeoutMsg: `Element ${element} not found for getting a property.` });
    return $(element).getCSSProperty(attribute).value;
  },

  getLocation: (element, coordinate) => {
    $(element).waitForClickable({ timeout: 5000, timeoutMsg: `Element ${element} is not clickable in 60sec.` });
    return $(element).getLocation(coordinate);
  }
}
