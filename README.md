Quoter
======

A journal that cures writer's block.
Write about anything, and related quotes
will appear before you.

Live App
--------
https://loxphordex-quoter-client.now.sh

API
---

Quoter uses the TheySaidSo API:
https://theysaidso.com/api/#

Every few seconds, your journal will be scanned
for a category. This category will be run through
the TheySaidSo API like so:
GET http://quotes.rest/quote/search.json?category=<category>

Note: this is a private endpoint. The link above will
not work without a paid token. But don't worry, Quoter
is free!

Authorization
-------------

Users can sign up to save their entries for later.
More user functions are in development.

https://imgur.com/gallery/zirjhSs

