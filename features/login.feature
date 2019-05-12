Feature: log user in to demo app
  To log in demo app we have to enter login details
  
  Scenario: log in demoapp with valid user credentials
    Given user is on demo app's login page
    When logs in with valid credentials
    Then should be redirected to choosing bank
    
  