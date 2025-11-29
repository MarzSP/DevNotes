---
title: 'Docker vs Podman'
description: 'Its like Docker, but different'
pubDate: 'Nov 22 2025'
tags: ['Docker']
heroImage: '../../assets/blog-placeholder-docker.png'
---
I've worked on many projects using Docker however recently I've been hearing a lot about Podman as an alternative. So I decided to do some digging and see what the differences are.
At my work I have switched to using Podman for local development, just to see how it compares to Docker.

I hope by now that you know what Docker is. If not, check out my previous blog post [Writing your first docker-compose.yml](./firstdocker.md).

## What is Podman?
Podman is also a containerization platform, similar to Docker. It allows you to create, manage, and run containers on your local machine or in the cloud. Podman is developed by Red Hat and is part of the larger Open Container Initiative (OCI) ecosystem.
Podman aims to be a more secure and modular alternative to Docker, while still offering a familiar interface.

## Key Differences
1. Rootless by Default

Podman can run containers without requiring a background daemon or root privileges. (if the words *Deamon* and *Root* scare you, read on anyway, you'll get there soon enough.)
This makes it safer, especially on development machines or shared environments.

Docker, on the other hand, relies on the Docker daemon, which traditionally runs as root.

2. No Daemon

Docker: one long-running background process (dockerd) manages everything.
Podman: no daemon. Each command runs independently.
This gives Podman better isolation and makes debugging more predictable.

3. OCI Standard & Compatibility

Both Docker and Podman support OCI images. OCI was created to standardize container images and runtimes across different platforms.
This means images are interchangeable, which means: you can pull Docker images using Podman without issues. **Love that!**

4. Docker Compose vs Podman Compose

Docker has its own support for Compose (docker-compose or docker compose).
Podman has podman-compose, which works well for most setups but is still catching up on edge-cases.
For basic stacks (db + backend + frontend), Podman works just fine.

5. Pods

Podman introduces the concept of pods: a group of containers sharing networking and resources (like a pod of whales).

## How to change from Docker to Podman
To switch from Docker to Podman, you can usually just replace the `docker` command with `podman` in the commands in your terminal.
You don't need to change your `docker-compose.yml` files, as Podman can read them directly. Which makes this transition (or experiment) soo easy to do!


## My Experience
I used Podman on a Linux (fedora) machine for local development. Here's what I found:
- Setup was easy. I like easy.
- Performance feels the same (although I didn't do any benchmarks).
- The rootless feature is a big plus for security, because I don't have to worry about running containers as root.
- Some advanced Docker Compose features were missing, but for basic use cases, it worked fine.
- There's more than enough documentation available for both Docker and Podman.

I also have a windows machine where I will still choose to use Docker. Docker Desktop is so well integrated into Windows that it makes sense to use it there. It hides all the complexity of running Linux containers on Windows, which is a big plus for me.

On a Linux machine, I would choose Podman because its rootless architecture and lack of a daemon make it more secure and lightweight. It just works well in the OS.

