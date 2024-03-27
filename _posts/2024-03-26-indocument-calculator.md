---
layout: post
title: "In-document Calculator"
author: Jono
published: true
date: 2024-03-26T08:00:00+0000
categories:
- code
---
A little Google Doc calculator. Whenever there's number+number written in the text you can run the Google App Script and it will add the numbers, formatting it as number+number=answer
```
function calculateInDocument() {
  var body = DocumentApp.getActiveDocument().getBody();
  var text = body.getText();

  // Split the text into lines
  var lines = text.split(/\r?\n/);

  // Iterate over each line
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    
    // Find and process expressions that contain a '+'
    if (line.includes('+') && !line.includes('=')) {
      // Split the line into parts based on '+'
      var parts = line.split('+');
      var sum = 0;

      // Iterate over each part
      for (var j = 0; j < parts.length; j++) {
        // Extract number strings
        var numberString = parts[j].match(/[\d,]+/);
        if (numberString) {
          // Remove commas and parse the number
          var number = parseInt(numberString[0].replace(/,/g, ''), 10);
          sum += number;
        }
      }

      // Replace the line with the calculated sum appended after the addition expression
      lines[i] = line.replace(/([\d,]+\s*\+\s*[\d,]+)/, function(match) {
        return match + '=' + sum.toLocaleString();
      });
    }
  }

  // Update the document body with the modified text
  body.setText(lines.join('\n'));
}

```
