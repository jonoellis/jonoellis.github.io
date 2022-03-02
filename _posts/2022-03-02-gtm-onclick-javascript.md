---
layout: post
title: "Extracting JavaScript OnClick to Google Tag Manager"
author: Jono
published: true
date: 2022-03-02T10:30:00+0000
categories:
- code
---
This Google Tag Manager custom JavaScript takes an onclick event for a button which opens link as a document.location and extracts the contents e.g. the filename from onclick="document.location='https://example.com/download/filetype'" 

```
function() {
var field = {{Click Element}}.getAttribute('onclick');
var myRegexp = /'(.*)'/;
var result = field.match(myRegexp);
return result ? result[1] : null; 
}
```
