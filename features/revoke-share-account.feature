Feature: revoke sharing account

Background:
  Given user has a shared account

Scenario: user successfully revokes permission to share account info
    Given user is on demo app's login page
    When he logs in with valid credentials
      And he chooses to edit permissions of account
      And he chooses to revoke permission
    Then the account should not be available