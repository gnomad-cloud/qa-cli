
I want to do something before every scenario
=============================================

Backgrounds are similar to scenarios, except they do not support annotations.

Any feature can contain a background, in which case the steps that carried out before each scenario.

```
	Background: Authenticate
	GIVEN I login
	AND I use a valid client certificate
```

Instead, you should use @skip or @todo before a Feature: or Scenario: definition.
 
An @bug scenario will pass normally (skipped) but fail when --debug is used.

	@bug=something is broken

	Scenario: A Bug
		Given I am a bug
		Then I fail

