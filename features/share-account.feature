Feature: share bank account to data aggregation demo app
  
  Scenario: user successfully shares bank account info 
    When user starts the demo app
      And he logs in with valid credentials
      And he chooses his account to sync
      And he allows to share account
    Then he should see the list of transactions

  #Scenario: user successfully revokes permission to share account info
  #  Given user is on demo app's login page
  #  When he logs in with valid credentials
  #    And he chooses to edit permissions of account
  #    And he chooses to revoke permission
  #  Then the account should not be available


