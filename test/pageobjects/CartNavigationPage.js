import Page from './basePage';
import actionUtility from '../utilities/ActionUtility';
import TestData from "../../cannedData.json";

class CartNavigationPage extends Page {
  get elements() {
    return {
      // Add Content Locators.
      SummaryCheckOutButton: '//p[@class="cart_navigation clearfix"]//a[@title="Proceed to checkout"]',
      AddressCheckOutButton: '//button[@name="processAddress"]',
      ShippingCheckOutButton: '//button[@name="processCarrier"]',
      TermsAndConditionsCheckBox: '#uniform-cgv',
    }
  }


}

const CartNavigationPageObj = new CartNavigationPage();
export default CartNavigationPageObj;
exports.CartNavigationPageElements = CartNavigationPageObj.elements;
