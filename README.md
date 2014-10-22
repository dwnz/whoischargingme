WhosChargingMe
==============

Find out which cloud services are charing you each month.

Future
======

Keen as to turn this into a web app. Keen to help? Let me know - Twitter, @dwnz 

Running it
==========

Make sure you have node installed.

* npm install
* node app export.ofx

Current Services
================

* Adobe Creative Cloud
* Dropbox
* Ghost
* Microsoft Azure
* Mindscape (Raygun)

Contributing
============

Most useful thing at this point would be more companies - if you subscribe to something, either send me an issue with the transaction line
or create a json config file and make a pull request.

JSON Format

```js
{
    "name": "Ghost Blog",
    "regex": ".*GHOST.ORGCHA.*",
    "author": "dwnz <hello@danielwylie.me>"
}
```