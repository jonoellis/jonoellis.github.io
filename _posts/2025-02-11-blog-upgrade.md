---
layout: post
title: "Blog Upgrade"
author: Jono
published: true
date: 2025-02-11 08:52:44 -0000
categories: 
- code
---
I've spent the day trying to improve my blog. Basically I've just added search but oh what a drag it was. What I really wanted was to have #hashtags that were links to a search page so that it would be quick to group posts about, say, the #cabin. So - index.json builds the site index, discover.html renders a search page, discover.js does the search magic and inline JavaScript in _layouts/post.html turns any # followed by a word into a clickable link. Waste of a day? Not quite... but almost! 
