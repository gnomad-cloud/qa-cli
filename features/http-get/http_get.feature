Feature: Generic HTTP GET test

Scenario: Ensure Internet connectivity
    Given I am testing Google 
    When I GET https://google.com
    Then response code should be 301
    And header Content-Type should exist
    And header Content-Type should contain text/html


Scenario: Ensure a6s is online
    Given I am testing port 5008
    When I GET http://localhost:5008/api/debug/programs
    Then response code should be 200
    And header Content-Type should exist

