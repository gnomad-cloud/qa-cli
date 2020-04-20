# Built-in phrases
These can be re-generated using `qa -p` 

## Set the `name` variable
	I am $actor
	I am a $actor
	I am an $actor

## Deliberately fail
	I fail

## Deliberately fail - with custom error
	I fail with $msg

## Do nothing / pass
	I pass
	I do nothing
	I succeed

## Wait for period of time
	I wait $time $units
	I wait for $time $units

## Check for elapsed time
	elapsed time should be less than $elapsed
	duration should be less than $elapsed

## Load contents of file into a variable
	I load $varname as $format from $file
	I read $varname as $format from $file

## Create a directory/folder
	I mkdir $folder

## RUN $FILENAME
	I run $filename

## EXEC $COMMAND
	I exec $command

## EMIT $EVENT
	I emit $event

## EMIT $EVENT WITH $VARLIST
	I emit $event with $varlist

## Execute Javascript commands
	I return $javascript as $varname
	I execute $javascript
	I execute
	...$javascript

	I assert $javascript
	I expect $javascript

## Check TCP ports
	port $port at $target is open
	I open port $port at $target
	port $port is open
	I open port $port
	port $port at $address is closed
	port $port is closed

## Test DNS lookup
	I lookup DNS
	I lookup DNS $address
	I lookup DNS for $address
	I lookup $address
	I resolve DNS $type for $address
	I resolve DNS $type record for $address
	I resolve $type for $address
	I resolve DNS for $address
	I resolve for $address

## Working with variables
	I clear variables
	I reset variables
	I set $varname to $value
	I set $varname = $value
	I define $varname = $value
	I set $varname is $value
	I set $varname from $varname2
	I unset $varname
	I convert $varname to text
	I sanitize $varname
	variable $varname should exist
	variable $varname exists
	$varname should exist
	$varname exists
	variable $varname should be $value
	$varname should be $value
	$varname equals $value
	$varname must equal $value
	$varname = $value
	variable $varname should contain $value
	variable $varname should match $regex
	variable $varname must match $regex
	$path should match $regex
	$path matches $regex
	$path must match $regex
	$path in $varname should contain $match
	$path in $varname contains $match
	$path in $varname must contain $match
	$path in $varname should be empty
	$path in $varname should match $regex
	$path in $varname must match $regex
	$path in $varname matches $regex
	any $path in $varname should match $regex
	any $path in $varname must match $regex
	any $path in $varname matches $regex
	I merge $varnames as $newvar
	I merge $varnames into $newvar
	I transform $varname as $newvar with:
	...$javascript

	I map $varname as $newvar with:
	...$javascript

	I set $varname to JSON:
	...$JSON

	some JSON as $varname:
	...$JSON

	I set $varname to text:
	...$TEXT

	some text as $varname:
	...$TEXT


## dump $varname
	dump $varname
	I dump $varname

## Set variables from block of formatted text
	I set $varname to CSV:
	...$CSV

	some CSV as $varname:
	...$CSV


## TLS X.509 Certificates
	I use a $CERT client certificate
	I use an $CERT client certificate
	I enable strict SSL
	I enable strict TLS
	I disable strict SSL
	I disable strict TLS
	I require client certificates
	I don't require client certificates

## HTTP query parameter
	I set parameter $key to $value
	I set $key parameter to $value
	I set $key param to $value
	I set param $key to $value
	I set parameter $key from $varname
	I set $key parameter from $varname
	I set $key param from $varname
	I set param $key from $varname

## HTTP Basic Authentication
	I use basic authentication
	I login
	I authenticate
	I use basic authentication as $agent
	I login as $agent

## HTTP OAuth2 Authentication
	I use OAuth2
	I use oauth
	I use OAuth2 credentials
	I use oauth credentials
	I use OAuth2 credentials as $agent
	I use oauth credentials as $agent
	I use client-credentials as $agent
	I set oauth token from $var
	I set oauth access_token from $var

## HTTP cookies
	I set cookie $cookie to $value
	I set cookie $cookie = $value
	cookie $cookie should exist

## HTTP options
	I set request timeout to $time
	I enable keep alive
	I disable keep alive
	I enable gzip
	I disable gzip
	I set encoding to $encoding
	I enable redirects
	I disable redirects
	I request JSON

## File upload/downlload
	I upload $file
	I send $file as body
	I upload $file as body
	I send $file as attachment
	I upload $file as attachment

## Sending data, forms and files
	I set body to $payload
	I set body from $varname
	I set text body from $varname
	I set form $name to $value

## Sending block of formatted text as data
	I set body to CSV:
	...$CSV

	I send CSV:
	...$CSV

	I set body to JSON:
	...$JSON

	I send JSON:
	...$JSON

	I set body to XML:
	...$XML

	I send XML:
	...$XML

	I set body to:
	...$TEXT

	I send:
	...$TEXT


## Downloading data and files
	I GET JSON from $resource
	I GET JSON $resource
	I download $resource to $path $file

## Basic HTTP operations
	I GET $resource
	I GET from $resource
	I POST $resource
	I POST to $resource
	I PUT $resource
	I DELETE $resource
	I PATCH $resource
	I request HEAD for $resource
	I request OPTIONS for $resource

## Extract variables from body
	I store body path $path as access token
	I store body path $path as $name
	I store header $header as $name
	I parse body as JSON
	I convert body to JSON

## HTTP status / response codes
	response code should be $code
	response code should not be $code

## Test HTTP headers for values
	header $header should be $value
	header $header should contain $value
	header $header should not be $value
	header $header should exist
	header $header should not exist

## HTTP headers
	I set $header header to $value
	I set header $header = $value
	I set $header header from $varname
	I set header $header from $varname

## Test HTTP body for values
