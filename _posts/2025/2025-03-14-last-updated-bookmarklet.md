---
layout: post
title: "Last Updated Date Bookmarklet"
author: Jono
published: true
date: 2025-03-14 07:50:58 -0000
categories: 
- code
---
I work on a couple of sites with "last updated" dates and it's sometimes handy to have an idea of where that date sits compared to an arbritary review date so I've put together this little bookmarklet. Click and it appends Fresh, Ripe or Rotten to a date depending on recency.
```
javascript:(function() {
    function getTextStatus(dateText) {
        const now = new Date();
        const date = new Date(dateText);
        const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());

        if (diffMonths < 3) {
            return "Fresh";
        } else if (diffMonths < 9) {
            return "Ripe";
        } else {
            return "Rotten";
        }
    }

    const elements = document.querySelectorAll('.ds_metadata__item');
    elements.forEach(function(element) {
        const keyElement = element.querySelector('.ds_metadata__key');
        const valueElement = element.querySelector('.ds_metadata__value');

        if (keyElement && keyElement.textContent.trim() === 'Last updated' && valueElement) {
            const dateElement = valueElement.querySelector('#sg-meta__last-updated-date');
            const dateText = dateElement ? dateElement.textContent.trim() : valueElement.textContent.trim();
            const status = getTextStatus(dateText);
            if (dateElement) {
                dateElement.textContent += ` (${status})`;
            } else {
                valueElement.textContent += ` (${status})`;
            }
        }
    });
})();
```
