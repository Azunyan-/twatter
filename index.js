const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
/*
const options = {
    uri: 'https://sl.se/sv/find/',
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($'article') => {
        console.log($);
    })
    .catch((err) => {
        console.log(err);
    });
*/
var titleArray = fs.readFileSync('lastPostTitle.txt').toString().split("\n");
for(i in titleArray) {
    console.log("Line ", i, " ", titleArray[i]);
}


request('https://sl.se/sv/find/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('article.expandable').each(function(i, element){
        var header = $(this).children('header').children('h1').children('span');

        var title = header.text();
        var shorttext = $(this).children('.short-text').text();
        var link = $(header).attr('data-url');
        //console.log(title);
        //console.log(shorttext);
        //console.log(link);
        var match = 0;

        for(i in titleArray){
            if(header.text() == titleArray[i]){
                match = 1;
            }
        }

        if(match == 0) {
            //String fixy bit
            title = title.trim();
            shorttext = shorttext.trim();
            link = link.trim();

            //Title appending if it didnt exist in the actual thing
            fs.appendFileSync('lastPostTitle.txt', title + "\n" );
            //Tweety bit
            var tweetcontent = title + " " + shorttext + " " + link;
            var tweetLength = tweetcontent.length;
            if(tweetLength <= 280){
                console.log('Automatic composed tweet length under 280 \n');
            } else {
                var tweetcontent = title + " " + link;
                tweetLength = tweetcontent.length;
            }
            var tweet = {
                status: tweetcontent
            }
            //console.log(tweet);


            //Check for length issues
            if( tweetLength <= 280){

                T.post('statuses/update', tweet, tweeted);

                function tweeted(err, data, response) {
                    if(err) {
                        console.log("Something went wrong whilst tweeting!");
                    } else {
                        console.log("Tweet success!");
                    }
                }

                console.log("Tweet have been sent", title, "\n");
            } else {
                console.log('Automatic tweet was to long: ', tweetLength);
            }
        }
        match = 0;
    });
  }
});



/*
request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      var a = $(this).prev();
      console.log(a.text());
    });
  }
});
*/
