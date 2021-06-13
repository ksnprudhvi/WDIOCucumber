import { Given, When, Then } from 'cucumber';
import actionUtility from '../utilities/ActionUtility';
import elements from '../pageobjects/elementsPage';
import TestData from "../../cannedData.json";
import env from '../../env.config.json';
import { expect } from 'chai';
import HomePage from '../pageobjects/HomePage';
var cart = {};

Given(/^I launch the automation practice website$/, () => {
    HomePage.loadBaseURL();
});

When(/^I login to the application$/, () => {
    HomePage.login();
});

When(/^I click on create new user$/, () => {
    actionUtility.click(elements['SignInLink']);
    HomePage.enterNewEmailID();
    actionUtility.click(elements['CreateAnAccountButton']);
});

When(/^I fill in all the required details$/, () => {
    actionUtility.setValue(elements['FirstNameTextBox'], TestData.FIRSTNAME);
    actionUtility.setValue(elements['LastNameTextBox'], TestData.LASTNAME);
    actionUtility.setValue(elements['PasswordTextBox'], TestData.PASSWORD);
    actionUtility.setValue(elements['AddressTextBox'], TestData.ADDRESS);
    actionUtility.setValue(elements['CityTextBox'], TestData.CITY);
    actionUtility.selectByText(elements['StateDropDown'], TestData.STATE);
    actionUtility.setValue(elements['PostalCodeTextBox'], TestData.POSTALCODE);
    actionUtility.setValue(elements['MobileTextBox'], TestData.MOBILE);
});

Then(/^I verify customer account name$/, () => {
    expect(actionUtility.getText(elements['AccountName'])).to.equal(TestData.FIRSTNAME + ' ' + TestData.LASTNAME);
});

Then(/^verify the page is navigated to "([^"]*)" page$/, (page) => {
    expect(actionUtility.getUrl()).to.include(page);
});

When(/^I search for "([^"]*)" in search box$/, (searchText) => {
    actionUtility.setValue(elements['SearchTextBox'], searchText);
    actionUtility.click(elements['SearchButton']);
});

When(/^I click on first element in the results and add to cart$/, () => {
    cart['item1'] = actionUtility.getText(elements['SearchResult']);
    console.log(cart.item1);
    actionUtility.click(elements['SearchResult']);
    actionUtility.click(elements['AddToCartButton']);
});

Then(/^I proceed to check out until payment page$/, () => {
    actionUtility.click(elements['ProceedToCheckOutButton']);
    actionUtility.click(elements['SummaryCheckOutButton']);
    actionUtility.click(elements['AddressCheckOutButton']);
    actionUtility.click(elements['TermsAndConditionsCheckBox']);
    actionUtility.click(elements['ShippingCheckOutButton']);
});

Then(/^I verify the added product is visible in payment page$/, () => {
    expect(actionUtility.isDisplayed('//a[text()="' + cart.item1 + '"]')).to.be.true;
});
