---
layout: post
title: "Cookie Auditing Tool"
author: Jono
published: true
date: 2020-07-07T22:30:00+0000
categories:
- code
---
I've been very grateful for [Simo Ahava's analytics advice](https://www.simoahava.com/) over the years - none more so that today when he helped set up headless Chrome on Google to crawl a site and store which cookies it sets. Thanks Simo! The instructions are split over two blog posts - [scraping a domain and writing results to BigQuery](https://www.simoahava.com/google-cloud/scrape-domain-and-write-results-to-bigquery/) and then [auditing cookies using BigQuery](https://www.simoahava.com/google-cloud/cookie-audit-with-google-bigquery/). It's awesome. 

It's fairly simple to re-run once the initial cloud setup is done. For me, the code to kick off a crawl is:

```
gcloud compute instances create web-crawler --metadata-from-file startup-script=./gce-install.sh --scopes=bigquery,cloud-platform --machine-type=n1-standard-16 --zone=europe-west2-a
```

Once it's set up you can make changes to the config, reupload and then go to the [instances](https://console.cloud.google.com/compute/instances), select the instance and then start (it closes itself down each time).  

For my own reference, the two BigQuery queries are:

**The list of pages on the site, and their cookies**
```
SELECT
  final_url,
  cookies
FROM
  `project.dataset.table`
  ```
  
  and:
  
  
  **The list of all cookies**
  
  ```
  SELECT
  c.name,
  c.domain,
  c.httpOnly,
  c.secure,
  c.session,
  c.sameSite
FROM
  `project.dataset.table`,
  UNNEST(cookies) AS c
GROUP BY
  1, 2, 3, 4, 5, 6
ORDER BY
  1 ASC
  ```
  
Useful Cloud console links:
* [BigQuery](https://console.cloud.google.com/bigquery)
* [Config bucket](https://console.cloud.google.com/storage/browser/sgos-web-scraper-configuration)
* [VMs](https://console.cloud.google.com/compute/instances)
* [Logging](https://console.cloud.google.com/logs/viewer)
* [Billing](https://console.cloud.google.com/billing/)
  
  
