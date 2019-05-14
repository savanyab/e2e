Feature: share bank account to data aggregation demo app

  Scenario: user does not have a synchronized bank account 
    When user starts the demo app
      And he logs in with valid credentials
      And he chooses his account to sync
      And he allows to share account
    Then he should see the list of transactions


