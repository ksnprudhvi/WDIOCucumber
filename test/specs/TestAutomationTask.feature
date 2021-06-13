@regression
Feature: Test Automation Task

  Background:
    Given I launch the automation practice website

  Scenario: Verify New User Registration
    When I click on create new user
    When I fill in all the required details
    When I click on "RegisterButton"
    Then I see the message "Welcome to your account. Here you can manage all of your personal information and orders." is displayed
    Then I verify customer account name
    Then I click on "SignOutLink"

  Scenario: Add product to the cart
    When I login to the application
    When I search for "Sleeve T-shirts" in search box
    When I click on first element in the results and add to cart
    Then I proceed to check out until payment page
    Then I verify the added product is visible in payment page
