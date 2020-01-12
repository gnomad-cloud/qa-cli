Feature: Generic HTTP POST test

Scenario: Send JSON payload
    Given I am uploading JSON
    And I send ./files/hello_world.json as body
    When I POST http://jsonplaceholder.typicode.com/posts
    Then response code should be 201
    And header Content-Type should exist
    And header Content-Type should contain application/json

