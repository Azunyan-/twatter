# twatter

Launch the bot with
```
node index.js
```
Setup a file called `config.js` according to `config-sample.js` to make sure that it is able to tweet.

Since we aren't using databases the last post title is simply saved in the file `lastPostTitle.txt`, really lazy solution but this is meant to be hosted from a lone raspberry pi.

It also currently logs last time it ran in `runLog.txt`

It currently does not run on a loop so I am planning on making a cron job that simply executes it regularly, once an hour(?)

Current version of crontjob:
`5 * * * * /usr/bin/nodejs /home/twatter/twatter/index.js`

You can view cronjob execution in `/var/log/syslog`
