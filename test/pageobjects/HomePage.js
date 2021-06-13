import Page from './basePage';
import actionUtility from '../utilities/ActionUtility';
import TestData from "../../cannedData.json";
import env from '../../env.config.json';

class HomePage extends Page {
  get elements() {
    return {
      // Add Content Locators.
      SignInLink: '//a[@title="Log in to your customer account"]',
      EmailIDTextBox: '#email',
      PasswordTextBox: '#passwd',
      SignInButton: '#SubmitLogin',
      CreateEmailIDTextBox: '#email_create',
      CreateAnAccountButton: '#SubmitCreate',
      SignOutLink: '//a[@title="Log me out"]',
      AccountName: '//a[@title="View my customer account"]',
    }
  }

  loadBaseURL(linktext) {
    super.open(env["LOGIN_URL"]);
  }

  login() {
    actionUtility.click(this.elements.SignInLink);
    actionUtility.setValue(this.elements.EmailIDTextBox, TestData.USERNAME);
    actionUtility.setValue(this.elements.PasswordTextBox, TestData.PASSWORD);
    actionUtility.click(this.elements.SignInButton);
  }

  enterNewEmailID() {
    var randomstring = require("randomstring");
    var username = randomstring.generate(7) + '@test.com';
    actionUtility.setValue(this.elements.CreateEmailIDTextBox, username);
    this.writeUserNameToCannedData(username);
  }

  writeUserNameToCannedData(value) {
    const fs = require('fs');
    const fileName = __dirname + '/../../cannedData.json';
    let content = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    // edit or add property
    content.USERNAME = value;
    //write file
    fs.writeFileSync(fileName, JSON.stringify(content));
  }
}

const HomePageObj = new HomePage();
export default HomePageObj;
exports.HomePageElements = HomePageObj.elements;
