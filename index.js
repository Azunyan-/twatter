const request = require('request');
const cheerio = require('cheerio');
const fs = ('fs');

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
request('https://sl.se/sv/find/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('article.expandable').each(function(i, element){
        var header = $(this).children('header').children('h1').children('span');
        console.log(header.text());
        var shorttext = $(this).children('.short-text');
        var link = $(header).attr('data-url');
        console.log(shorttext.text());
        console.log(link);
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
