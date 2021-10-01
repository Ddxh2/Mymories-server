# Mymories (server)

Code for the server side of the MyMories social media project. 

This project was built for the purpose of full stack development practice and to gain experience with the MER(R)N stack. The following two tutorial videos by JavaScript Mastery were followed to form the basis of this project. Additional changes are included in the **Summary** section in **bold**.

- [Part 1](https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery)
- [Part 2](https://www.youtube.com/watch?v=aibtHnbeuio&ab_channel=JavaScriptMastery)

## Summary 

The server is built using Express and NodeJS and all data is stored in a MongoDB database.

From the tutorial we developed simple CRUD functionality for posts.

Additional changes I made are: 

- **CREATE/READ/UPDATE functionality for users involving RSA decryption and hashing for password authentication**
- **Friendships model to track friendships between users along with CREATE/READ/DELETE functionality**
- **Added custom queries for posts to return only the posts made by the user or their friends**

## Local Pre-requisites

- NodeJs and NPM
- RSA key pair

## Local Setup 

After cloning the repo, set the appropriate environment variables (see .env.example)

1. Run ```npm install``` to install all dependencies
2. Run ```npm start``` to start the backend of the MyMories project.

## Future Changes

Below are a list of additional features of additions that I would have liked to include

- Unit tests
- Tracking which users have liked which posts in order to prevent a user from liking one post multiple times
- Implement code to support requests being sent to users for freindship instead of automatic two sided friendships being created from a one sided interaction
