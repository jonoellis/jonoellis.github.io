---
layout: post
title: "Postcode redacted search query to the DataLayer"
author: Jono
published: true
date: 2020-10-30T22:30:00+0000
categories:
- code
---
This is a super fast post just to share some JavaScript that I've cobbled together and that I've found useful for Google Tag Manager/Google Analytics. This code takes a site search query from the URL (in this format it would be ?q= ), removes any UK postcodes and then puts the redacted search term into the dataLayer so that it can be picked up by GTM.
```
<script>
const params = new URLSearchParams(window.location.search);
const query = params.get('q');
nospacequery = query.replace(/\s/g, "");
var postcoderegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
window.dataLayer = window.dataLayer || {};
if (postcoderegex.test(nospacequery)==true){
window.dataLayer.push({'query': '[postcode]'}); 
} else {
window.dataLayer.push({'site search': query}); 
}
</script>
```
