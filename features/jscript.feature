Feature: Javascript is working

@target=test
  Scenario: Inline Javascript

    Given I am testing javascript
    When I dump this
    When I execute return this.started>0;


  Scenario: Multi-line Javascript

    Given I am testing more javascript
    When I execute
  --------
  return this.started>0;
  --------
