Feature: Testing failure

  Scenario: Test failed
    Given I am testing failures
    When I fail
    Then I dump this

