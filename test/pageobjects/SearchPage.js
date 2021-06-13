import Page from './basePage';
import actionUtility from '../utilities/ActionUtility';
import TestData from "../../cannedData.json";

class SearchPage extends Page {
  get elements() {
    return {
      // Add Content Locators.
      SearchTextBox: '#search_query_top',
      SearchButton: '//button[@name="submit_search"]',
      SearchResult: '//ul[@class="product_list grid row"]//a[@class="product-name"]',
    }
  }


}

const SearchPageObj = new SearchPage();
export default SearchPageObj;
exports.SearchPageElements = SearchPageObj.elements;
