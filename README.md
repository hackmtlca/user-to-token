# User to Token

This problem is part of the `Intro to Hacking Workshop`. View the [Bug Bounty Guide](https://github.com/hackmtlca/bug-bounty-guide) for more information about the score system.

## Context

User to Token is a "safe" no password solution to store personal information. All your user information is stored in your one-time `JWT`. Our lead programmer, a security noob, told us that there shouldn't be any `XSS Injection` nor `SQL Injection`. This said, during the past week, our `Sqlite Database` has been acting weirdly. Can you help us figuring out why?

## Running the App

All you need is `Docker`. Run the following command in the root of this repository (hold CTRL+C to quit):

```
docker-compose up
```

A frontend instance will be created at `http://localhost/`. A backend instance will be created at `http://localhost:1337/`.