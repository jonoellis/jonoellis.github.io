---
layout: post
title: "Twine Interactive Fiction Reformatter Tool"
author: Jono
published: true
date: 2023-08-26 08:00:00 -0000
categories: 
- code
- writing
---
I use [Twine](https://twinery.org/) to write Interactive Fiction/Choose Your Own Adventures. The ones I write I like to format so that they could be a book... and we all know that CYOAs have chapter 1 at the start, then the chapters are ordered in number order but the chapter that you need to read at the end of chapter one might be 17 or it could be 49. Twine doesn’t let you format stories for print like that so I’ve put together [some scripts to do that](https://colab.research.google.com/drive/1TLAgxwaO_4R2nqUI9i0F0u9L3fEIICaB?usp=sharing).

Before you export your file from Twine, make sure that all of your chapters are named simply with a number. Your linking will look like “For X, go to chapter [[2]]”. You need to randomise the chapters yourself. The script will then take your HTML file and split each chapter out as "1.txt", "2.txt", etc. The next step then puts all of those numbered chapters into a single file in order. Then it all gets cleaned up, reformatted for print (so no links), and is then saved as a .html file at the end. All you need to do is download and copy the text into your word processor of choice and you're good to go. 

Let me know if you use the script.
