---
title: 'Writing your first docker-compose.yml'
description: 'You can do it'
pubDate: 'Sept 17 2025'
tags: ['Guide', 'Docker']
heroImage: '../../assets/blog-placeholder-5.jpg'
---

Always worked on projects where the `docker-compose.yml` already existed? Or your smart classmates made one for you?
Daunted by the black magic that is Docker?

So was I. And if I can learn how to write one, so can you! (Did I miss a career in sales?)
### Things you'll need to have
- On a windows machine, like me, you need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
- A project in your favourite IDE (I use IntelliJ IDEA).
- Patience

### Things you'll need to know
- Assuming you already know what Docker is and how to use it.
- ~~Basic knowledge of YAML syntax~~ We'll figure that out as we go.

#### Anatomy
- `services:` = the containers you want to run.
- `web:` = name of the service.
- `image:` = which container image to use (here: Nginx).
- `ports:` = maps host:container → visit <http://localhost:8080>.
- `docker compose up` = runs the containers.
- `docker compose down` = stops and removes the containers.

---

## The bare minimum

Here’s the smallest working `docker-compose.yml` you can write:

```yaml
version: "3.9"

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
````

Now run:
`docker compose up` and go to http://localhost:8080 in your browser. You should see the Nginx welcome page.

And BOOM — just like that, you did it.

Yes, you can now do black magic too. 