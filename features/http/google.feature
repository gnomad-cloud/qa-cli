Feature: Verify that Google is accessible

  Scenario: Request Google homepage - with redirects
    Given I enable redirects
    When I GET http://google.com
    Then response code should be 200

Scenario: Request Google homepage - no redirect
  Given I disable redirects
  When I GET http://google.com
  Then response code should be 302

