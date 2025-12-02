---
title: 'Previewing LocalHost on Mobile Devices'
description: 'The magic tunnel trick'
pubDate: 'Dec 1 2025'
tags: ['Javascript']
heroImage: '../../assets/blog-placeholder-js.png'
---

Disclaimer: This is not an advertisement for Cloudfare Tunnel, it's just the way I learnt to do it. There are many other services that can achieve this!

# Want to see your LocalHost on a mobile device?

When developing web applications, it's often necessary to test how they behave on mobile devices. However...how do you view what you're doing on your LocalHost on a mobile phone?
One easy solution is to use a Cloudflare Tunnel to expose your localhost to the internet securely. This has been very helpful for me when testing mobile responsiveness and functionality.

So the term we are going to use is: A reverse proxy tunnel. You may also see it being called a secure tunnel, or just a tunnel.

## What does a Reverse Proxy Tunnel do?
The tunnel opens a temporary, secure tunnel from the internet straight to your local Node app. No port-forwarding, no fiddling with routers and no worrying about security on the way.

A reverse proxy tunnel acts like a short lived doorway between your local machine and the outside world. (It gives me a platform 9 3/4 vibe).
The tunnel creates an outbound, encrypted connection from your machine to a secure relay on the internet.

That remote relay then hands you a neat public URL. Anyone who visits that URL gets quietly routed back through the tunnel to whatever you’re running on localhost.

The result looks deceptively simple:
your phone loads your local Node app as if it were deployed somewhere in the cloud.
Under the hood, though, there’s a lot of elegant trickery happening:

- Your laptop reaches out first, so there’s no need to poke holes in the firewall.
- All traffic is encrypted inside the tunnel, so nothing leaks into the digital wilderness.
- The remote server acts as the public “face”, while your actual machine stays hidden.
- Close the tunnel, and the URL vanishes. No clean up needed.

It’s a super useful solution when you want to test something real: like camera access, touch behaviour, or an annoying CSS grid, but on a real device rather than guessing in a desktop browser.

A reverse tunnel lets your local development environment briefly pretend it’s a fully deployed service. Quite handy when you want to know if it actually works on a mobile before deploying it for real.

### Setting up a tunnel on a node app
1. I'm going to assume you have a Node app already. 
2. Install Cloudflare's `cloudflared` tool. You can find installation instructions on the [Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation).
3. Once installed, you can create a tunnel to your local server. For example, if your Node app is running on port 3000, you can run the following command in your terminal
    ```bash
    cloudflared tunnel --url http://localhost:3000
    ```
4. After running the command, `cloudflared` will give you  a public URL (something like `https://randomstring.cloudflare tunnels.com`). You can open this URL on your mobile device to access your local Node app.
5. When you're done testing, simply stop the `cloudflared` process in your terminal to close the tunnel.
6. Remember that the public URL is temporary and will change each time you start a new tunnel.

### Important!
- Make sure your local server is running before starting the tunnel.
- Be cautious about exposing sensitive data or services to the internet, even temporarily. (Which basicly means, do *NOT* do anything that has anything to do with production data, ever.)


It takes the guesswork out of mobile testing. (We don't like guesswork.) IT also makes sharing your mobile-dev work with colleagues a little easier.No more weird “just imagine this on mobile” hand waving and "ahh's". 

Once you’ve used a tunnel a few times, it folds itself into your habits almost automatically. It's just something you've added to your invisible toolbox, and we like our toolboxes.
