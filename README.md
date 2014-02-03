# joola.io.express [![Build Status][3]][4] [![Coverage Status][1]][2]
**EXPERIMENTAL**

Instant, real-time, back-end performance analytics for your [Express.js][express] app.

<img src="http://i.imgur.com/t5WJcuh.png"></img>

**joola.io.express** is a small middleware you can seamlessly plug into your [expressjs][express] app to log 
performance data on your app and later query it using expressive queries and visualizations. 
**joola.io.express** is based on the [**joola.io**][joola.io] framework and uses [**reflect.io**]
(http://reflect.io) as a free store for your website performance data. 
This means that data is securely stored, backed up and managed by reflect.io and its team.
 
If you prefer you can install your own copy of [[joola.io]] and save data on your premises.

## Install
```bash
$ npm install joola.io.express
```

## Basic Usage

1. ```npm install joola.io.express```
2. In your app.js add: ```app.use(require('joola.io.express')({APIToken:'TOKEN'});```
3. Run your node app and navigate to: ```http://yourwebserver/analytics```

## Getting Read/Write KeyS
Before you can start writing and reading data securely, you will need to obtain read/write keys from [reflect.io](http://reflect.io).

If you wish to avoid registration, you can download and install your copy of [[joola.io]].

## Experimental
**This is an Experimental package**  
Other than guaranteeing that any data collected is securely stored within our servers, there are no guarantees.

## Contribute
We would love to get your help! We have outlined a simple [Contribution Policy][18] to support a transparent and easy merging
of ideas, code, bug fixes and features.

If you're looking for a place to start, you can always go over the list of [open issues][17], pick one and get started.
If you're feeling lost or unsure, [just let us know](#Contact).

## Contact
Contacting us is easy, ping us on one of these:

- [@joolaio][19]
- [info@joo.la][20]
- #joola.io on irc.freenode.net
- You can even fill out a [form][21].

## License
Copyright (c) 2012-2013 Joola Smart Solutions. MIT Licensed, see [LICENSE][24] for details.

[1]: https://coveralls.io/repos/joola/joola.io.express/badge.png
[2]: https://coveralls.io/r/joola/joola.io.express
[3]: https://travis-ci.org/joola/joola.io.express.png?branch=master
[4]: https://travis-ci.org/joola/joola.io.express?branch=master
[17]: https://github.com/joola/joola.io.express/issues
[18]: https://github.com/joola/joola.io/blob/master/CONTRIBUTING.md
[19]: http://twitter.com/joolaio
[20]: mailto://info@joo.la
[21]: http://joo.la/#contact
[24]: https://github.com/joola/joola.io.express/blob/master/LICENSE.md

[express]: http://expressjs.com
[joola.io]: http://github.com/joola/joola.io
[joola.io.wiki]: http://github.com/joola/joola.io/wiki