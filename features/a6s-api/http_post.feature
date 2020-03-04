Feature: Generic HTTP POSTs

Scenario: POST JSON
    Given I am uploading JSON
    And I send ./files/hello_world.json as body
    When I POST http://localhost:5008/example/debug
    Then response code should be 2xx
    And header Content-Type should contain application/json
    And response body should be valid json
    And I dump this

