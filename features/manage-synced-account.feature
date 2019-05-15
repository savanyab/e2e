Feature: manage shared accounts
  As a user
  I want to be able to revoke sharing my bank account info  with the demo app
  In order to control access to my bank account info

 
  Background: user successfully shares bank account info
    When user starts the demo app
      And he logs in with valid credentials
      And he chooses his account to sync
      And he chooses his account to share
      And he allows to share account
    Then he should see the list of transactions
    

  Scenario: user successfully revokes permission to share account info
    Given user is on demo app's login page
    When he logs in with valid credentials
      And he chooses to edit permissions of account
      And he chooses to revoke permission
    Then the account should not be available


