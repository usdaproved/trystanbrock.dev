---
title: "The Server"
date: "2020-06-25"
excerpt: "What is running it all?"
tags:
    - DigitalOcean Droplet
    - Nginx
    - OpenSMTPD
category:
    - project
---

While not really a project itself, I think it would be a mistake not to mention how I set up this website and [Tony's](https://tonys.trystanbrock.dev). 
Everything is running on a single $5 DigitalOcean Droplet, including my mail server.

## Nginx
Both websites are running as virtual servers on Nginx, listening on both ipv4 and ipv6. Some additional setup was required for Tony's
as all page requests are routed through a single entry point, the index page. This portfolio website is extremely simple, I just `scp`
the contents of the public folder after running `gatsby build`.

## Email
Great pains were taken to ensure emails that I send out won't get caught in anyone's spam filter.
I followed [this](https://poolp.org/posts/2019-09-14/setting-up-a-mail-server-with-opensmtpd-dovecot-and-rspamd/) post
by Gilles Chehade who works on OpenSMTPD, the SMTP client I use to send and receive emails. I setup a spam filter
and an IMAP client, Dovecot, so that I can login from my phone. In one night I went from knowing nothing about
hosting your own email server to having one set up.