---
title: "Multiplayer Game"
date: "2021-05-31"
excerpt: "Calling it a game might be a stretch"
tags:
    - C++
    - Windows API
    - Linux
    - Sockets
    - SDL2
category:
    - project
---

View the source code [here](https://github.com/usdaproved/MultiplayerGame) and download the game [here](https://usdaproved.itch.io/multiplayer-game).

## The "Game"
Okay so it's only really a game if you consider moving a square around the screen with no motivation a game. But it does contain the same networking principles that a basic game would. A player opens the program, gets a square that they can control, and sees other player's squares move in real time. Test it out yourself, download the game and open multiple instances at the same time. If the server is down, that means you probably wouldn't be on this web page either. As it's all on the same $5 DigitalOcean droplet.

<iframe src="https://giphy.com/embed/BM1DmiTaaexON0Lmyn" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/BM1DmiTaaexON0Lmyn">via GIPHY</a></p>

## The Client
Built using the Windows Winsock API and SDL2. I wanted this to be completely from scratch, but rendering is an entire project unto itself and I decided that networking was the focus of this project. So it's using SDL2's hardware accelerated renderer, which I think is just D3D9 in immediate mode. If the client doesn't hear from the server for 10 seconds it will attempt to reconnect. The client also has a rudimentary attempt at smoothing other player's square positions. It will do linear interpolation between the current square positions and the next, this was smooth when testing locally because it hit the server tick rate exactly. Whereas in actual "production" the interpolation is done before the next packet arrives, which creates a stuttering effect. Another thing I would like to add is client correction. At the moment, the player can get out of sync with the server and never be corrected. 

## The Server
The code for the server is as bare-bones as I could make it; no libraries, just Linux OS calls. It was built with a few best practices in mind, the core of which is that the server is authoritative. The clients do not send their position to the server, the clients send button presses and the duration of the presses. The server then runs the same code that the client does regarding square movement and sends out the position of everyone's squares to the clients. The server is set to only allow 8 connections at the same time, I didn't want to overload my $5 droplet. It can handle disconnects, freeing up the connection to be used again. So once the server is started, there should never be any state that crashes it. When no one is connected it waits infinitely for an incoming connection, so that used resources when idling is near zero. If a client crashes the server will automatically disconnect them after 10 seconds of not receiving any messages. I wrote the data serialization myself, floats are encoded into a 32 bit integer and then unpacked and decoded on the receiving end. This ensures minimum packet size and network usage.

## Where to go from here?
One silly fun and challenging thing I would like to do is create a small website that shows you how far your square has traveled. You would register on the website, then log in through the program on startup, and the game server would tell the web server how far that square has moved. Perhaps in real time.