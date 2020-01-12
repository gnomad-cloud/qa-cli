Feature: Javascript is working

  Scenario: Inline Javascript
    Given I am testing javascript
    When I execute return this.started>0;
    When I set tested to test-1
    When I dump this

  Scenario: Multi-line Javascript
    Given I am testing more javascript
    When I execute
  --------
  this.test = "test-2"
  return this.started>0;
  --------
    When I set tested to test-2
    When I dump this
