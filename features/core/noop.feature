Feature: Test Laziness

  Scenario: Always successful
	Given I am testing 'pass'
	Then I pass

  Scenario: Wait for 1 second
	Given I am testing 'wait'
	And I wait 1 second
	Then I succeed

  Scenario: I do nothing
    Given I am a work-in-progress
