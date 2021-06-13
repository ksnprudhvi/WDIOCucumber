import Page from './basePage';
import actionUtility from '../utilities/ActionUtility';
import TestData from "../../cannedData.json";

class ProductPage extends Page {
  get elements() {
    return {
      // Add Content Locators.
      AddToCartButton: '//button/span[text()="Add to cart"]',
      ProceedToCheckOutButton: '//a[@title="Proceed to checkout"]',
    }
  }


}

const ProductPageObj = new ProductPage();
export default ProductPageObj;
exports.ProductPageElements = ProductPageObj.elements;
