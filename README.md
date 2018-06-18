# twatter

Launch the bot with
``` node index.js
```
Setup a file called `config.js` according to `config-sample.js` to make sure that it is able to tweet.

Since we aren't using databases the last post title is simply saved in the file `lastPostTitle.txt`, really lazy solution but this is meant to be hosted from a lone raspberry pi.

It currently does not run on a loop so I am planning on making a cron job that simply executes it regularly, once an hour?
