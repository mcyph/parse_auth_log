# parse_auth_log backend

To run this assessment demo on Windows, install python 3.7 or above, 
then type on the command line:

* install curl from https://curl.se/windows/ and mongo server from 
  https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
* install mongo 
* pip3 --upgrade pip
* pip3 install -r requirements.txt
* run_server.bat

Or on Linux/Unix,  then type on the command line:

* install curl and mongodb using a package manager, e.g. `sudo apt install curl mongodb`
* sudo pip3 --upgrade pip
* sudo pip3 install -r requirements.txt 
* bash ./run_server.sh

Then on either platform, paste into the console:

    curl --location --request POST http://127.0.0.1:8080/incoming --header "Content-Type: application/json" --data-raw "{ \"id\":\"652\", \"findDuplicates\":\"HereWeHaveSomeDuplicatedCharacters\", \"whiteSpacesGalore\":\"Can we replace all this white spaces without using replace please\", \"validateMeOnlyIActuallyShouldBeABoolean\":false,\"numbersMeetNumbers\":[35, 2, 100, 15, 75, 25, 99]}"

Then visit the following link with a web browser:

> http://127.0.0.1:8080/outgoing
