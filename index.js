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
var firstArticle = 0;
var savedTitle;
fs.readFile('lastPostTitle.txt', 'utf8', function(err, contents) {
    console.log("Saved article name: ", contents);
    savedTitle = contents;
});

request('https://sl.se/sv/find/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('article.expandable').each(function(i, element){
        var header = $(this).children('header').children('h1').children('span');

        if(firstArticle == 0){
            //console.log(header.text());
            var title = header.text();
            var shorttext = $(this).children('.short-text').text();
            var link = $(header).attr('data-url');
            //console.log(shorttext);
            //console.log(link);

            if(header.text() == savedTitle){
                console.log("No new article");
            } else {

                //String fixy bit
                title = title.trim();
                shorttext = shorttext.trim();
                link = link.trim();

                //Tweety bit
                var tweetcontent = title + " " + shorttext + " " + link;
                var tweet = {
                    status: tweetcontent
                }
                //console.log(tweet);

                //Check for length issues
                var tweetLength = tweetcontent.length;
                if( tweetLength <= 280){
                    console.log('Automatic composed tweet length under 280')

                    T.post('statuses/update', tweet, tweeted);

                    function tweeted(err, data, response) {
                        if(err) {
                            console.log("Something went wrong whilst tweeting!");
                        } else {
                            console.log("Tweet success!");
                        }
                    }

                } else {
                    console.log('Automatic tweet was to long: ', tweetLength);
                }
                //Article title save bit
                firstArticle = 1;
                fs.writeFile("lastPostTitle.txt", header.text(), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("file has been saved successfully");
                    }
                });

            }
        }




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
