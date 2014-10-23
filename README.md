Who's Charging Me
==============

Find out which cloud services are charing you each month.

Future
======

Keen as to turn this into a web app. Want to help? Let me know - Twitter, @dwnz 

Running it
==========

Make sure you have node installed.

Download an OFX file from your bank.

* npm install
* node app export.ofx

Current Services
================

* Adobe Creative Cloud
* Dropbox
* Ghost
* Microsoft Azure
* Mindscape (Raygun)
* Spotify
* Whatbox
* Sqaurespace
* Zendesk
* Github
* AWS
* Jungle Disk

Banks Tested
============

* ASB Streamline Account
* ASB Visa

Contributing
============

Most useful thing at this point would be more companies - if you subscribe to something, either send me an issue with the transaction line
or create a json config file and make a pull request.

JSON Format

```js
{
    "name": "Company Name",
    "website": "http://website.com",
    "regex": "Regex to detect in bank statement",
    "author": "your name <your email or twitter>"
}
```
