// Beginning of the Language interpretation and Recognition Software

// Beginning of variable definition
var keys = require('./unlock.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');
var twitterclient = new twitter(keys.twitterKeys);
var spotifyclient = new spotify(keys.spotifyKeys);
var command = process.argv[2];
var queryURL = "http://www.omdbapi.com/?apikey=" + keys.omdbkey.apikey + "&t="
// EO variable definition


switch (command) {
  case 'my-tweets':
  tweets();
    break;

  case 'spotify-this-song':
    spotifyclient.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
      return console.log('Error occurred: ' + err);
    }
      console.log(data.tracks.items[0]);
    });
    break;

  case 'movie-this':
    movies();
    break;

  case 'do-what-it-says':
    fs.readFile('./random.txt', "utf-8", function(err, data){
        console.log(data);
    });
    break;

  default:
    console.log("Cannot compute");
}

// Start of function declarations
function tweets() {
    twitterclient.get('statuses/user_timeline', {screen_name: process.argv[3]}, function(error, tweets, response){
      if (!error){
        for ( var i = 0; i < 20; i++ ){
          if(tweets[i]){
            console.log(tweets[i].text);
          }
        }
      } else {
        console.log(error.stack);
      }
    })
};

function movies(){
    console.log("movie-this case activated")
    request(queryURL + process.argv[3], function (error, response, body){
      console.log(response.body);
    })
    if (process.argv[3] = ""){
      request(queryURL + "Mr. Nobody", function (error, response, body){
        console.log(response.body);
      })
    }
}
// End of function declarations
