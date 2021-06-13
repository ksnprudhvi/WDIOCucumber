import { CreateAnAccountPageElements } from './CreateAnAccountPage';
import { HomePageElements } from './HomePage';
import { SearchPageElements } from './SearchPage';
import { CartNavigationPageElements } from './CartNavigationPage';
import { ProductPageElements } from './ProductPage';

let elements = {
  ...CreateAnAccountPageElements,
  ...HomePageElements,
  ...SearchPageElements,
  ...ProductPageElements,
  ...CartNavigationPageElements
};

export default elements;
