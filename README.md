# GoTransport
> It is a web application that makes the life of people using public transport easier.

Link: https://gotransport.herokuapp.com

Presentation Link: https://gotransport.netlify.com 

## Features of our WebApp: 

1. Safe House
1. SOS
1. Route Tracing
1. Book Seats according to preference 
1. Track the Mode of Transport 
1. Geographic Information System 
1. QR Based Ticket System 
1. Free Coins on Every Transaction 
1. Leaderboard for most no. of coins
1. SocialPosts for creating awareness among the Youth 
1. Authorization/Authentication
1. Chatbot for Complaining

> We are focussing on the need of safety in our transportation system. That's why we are taking the helping hand of Mapping Technologies along with some other user-interactive applications to improvise these situations so that the transportation system can be made safe for people of all genders and each age group.

## SOME DETAILS THAT HELP MAKE THIS POSSIBLE:

### SafeHouse:
This is a Map based solution in which if the user is struck at some location he is not feeling safe , he/she can use this utility to locate a nearby safehouse which would be located on the map so that cabs and other modes of transport could be boarded from there.

### SOS:
For Someone struck in trouble we have developed a Emergency button which on clicking will send the location co-ordinates of the user via mail along with the message that the user is in danger.

### Route Tracing:
We have used the Maps API in order to trace the route of the respective mode of transport.This Utility not only traces the route but can also help in booking the seats via the payment gateway. With the help of this user can book any seat of his choice and can easily check the route to be followed.

### Track Your Mode:
In this Project we have deployed a JavaScript Based Maps API in order to trace the location of the mode of transport the user wants to trace.

### Geographic Information System:
GIS offer transport planners a medium for storing and analyzing data on population densities, land uses, travel behavior, etc.Typical applications include highway maintenance, traffic modelling, accident analysis, and route planning and environmental assessment of road schemes.

## OTHER USEFUL USER-INTERACTIVE TECHNOLOGIES:
* QR Code Based Tickets
* Free Coins on Every Transaction
* Leaderboard based on the number of coins
* SocialPosts for Increasing awareness among Youth
* Interactive UI having animations.
* ChatBot for Complaints

## Getting the Sources
First, fork the GoTransport repository so that you can make a pull request. Then, clone your fork locally: git clone https://github.com/[your-github-account]/GoTransport.git Occasionally you will want to merge changes in the upstream repository (the official code repo) with your fork.
```
cd GoTransport
git checkout master
git pull https://github.com/hargun79/GoTransport.git master
```
Manage any merge conflicts, commit them, and then push them to your fork.

```
Next, open the app.js file and on line no. 16 and 24 replace with your own MongoDb cluster link.
```

To setup all node modules, in the terminal run:
```
npm install
```
## Production
in the terminal just run
```
node app.js
```
> Note : The SocialPosts page has been set to a timeout of 6 seconds so be patient for a 6 seconds for proper loading.
