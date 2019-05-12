Feature: start demo app
  To start demo, user has to click on share account history
  
  Scenario: starting demo app
    Given user is on demo app's homepage
    When clicks on share account history
    Then should be redirected to login page