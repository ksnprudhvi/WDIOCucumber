import { Given, When, Then } from 'cucumber';
import actionUtility from '../utilities/ActionUtility';
import elements from '../pageobjects/elementsPage';
import env from '../../env.config.json';
import { expect } from 'chai';

When(/I click on "([^"]*)"$/, function (element) {
    actionUtility.click(elements[element]);
});

When(/^I fill in "([^"]*)" with "([^"]*)"$/, function (element, value) {
    actionUtility.setValue(elements[element], value);
});

Then(/I should see text "([^"]*)" on the "([^"]*)"/, function (text, element) {
    expect(actionUtility.getText(elements[element])).to.equal(text);
});

Then(/the "([^"]*)" should contain text "([^"]*)"/, function (element, text) {
    expect(actionUtility.getText(elements[element])).to.include(text);
});

Then(/I should see "([^"]*)"/, function (element) {
    expect(actionUtility.waitForDisplayed(elements[element])).to.equal(true);
});

When(/I select "([^"]*)" from the "([^"]*)"/, function (text, element) {
    actionUtility.selectByText(elements[element], text);
});

Then(/I should not see "([^"]*)"/, function (element) {
    expect(actionUtility.isDisplayed(elements[element])).to.equal(false);
});

Then(/I see the message "([^"]*)" is displayed/, function (messageText) {
    expect(actionUtility.isDisplayed('//*[contains(text(),"' + messageText + '")]')).to.equal(true, "the message '" + messageText + "' is not displayed")
});

Then(/I wait for "([^"]*)" seconds/, function (seconds) {
    actionUtility.wait(seconds);
});

Then(/I click on link text "([^"]*)"/, function (linkText) {
    actionUtility.clickLinkText(linkText);
});
