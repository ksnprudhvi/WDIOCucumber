import Page from './basePage';
import actionUtility from '../utilities/ActionUtility';
import TestData from "../../cannedData.json";

class CreateAnAccountPage extends Page {
  get elements() {
    return {
      // Add Content Locators.
      FirstNameTextBox: '#customer_firstname',
      LastNameTextBox: '#customer_lastname',
      PasswordTextBox: '#passwd',
      AddressTextBox: '#address1',
      CityTextBox: '#city',
      StateDropDown: '#id_state',
      PostalCodeTextBox: '#postcode',
      MobileTextBox: '#phone_mobile',
      RegisterButton: '#submitAccount',
    }
  }


}

const CreateAnAccountPageObj = new CreateAnAccountPage();
export default CreateAnAccountPageObj;
exports.CreateAnAccountPageElements = CreateAnAccountPageObj.elements;
