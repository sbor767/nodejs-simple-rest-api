# Forum test job Repository

This rep reflect next job task:

Test task for the JS developer
 Design and implement simple web forum. Server side should be developed in node.js and should provide REST API. Forum have a list of messages. Each message have ID, header and body. Messages should be stored in DB. The following REST methods should be implemented:
 1. Create new message
 2. Get list of messages (as list of pairs <ID, header>))
 3. Get message body (by ID)
 4. Delete message (by ID)
 5. Edit message (by ID)
 Code should have unit tests and comments.
 Optionally frontend should be developed. Also short doc with description about to install and run should be provided.


# What are Ready?

There are 2 part: 
- frontend - placed in repository root. *NOT READY now*. 
- and REST API backend - placed in the app_api folder

At this moment are ready only API backend and frontend to be some late.

Backend can be tested on stage server forum-test-job.stripway.ru by next endpoints
1. POST to http://forum-test-job.stripway.ru:4911/api/v1.0/messages with JSON in body {"header":"some","body":"some"}.
2. GET http://forum-test-job.stripway.ru:4911/api/v1.0/messages
3. GET http://forum-test-job.stripway.ru:4911/api/v1.0/messages/<message_id>
4. DELETE http://forum-test-job.stripway.ru:4911/api/v1.0/messages/<message_id>
5. PUT http://forum-test-job.stripway.ru:4911/api/v1.0/messages/<message_id>

To make mocha|chai tests do `yarn test`.

## Dependencies

- NodeJS
- YARN

## Environment Variables

Certain environment variables are required to run the server and access data. These should be provided for you and you should place them in a file called `.env` in the root of the repository and also in the app_api folder.
- app_api/.env
  - SERVER_PORT=4911
  - MYSQL_HOST=127.0.0.1
  - MYSQL_PORT=3306
  - MYSQL_DATABASE=db_name
  - MYSQL_USER=user
  - MYSQL_PASSWORD=password


## Working with the Server and Data Locally

In order to run the server locally, you must follow these steps:

- Clone the repository
- Switch to the branch `180705-forum-test-w-db`
- Go to the `app_api` folder. 
- Run `yarn install` once you've installed any global dependencies above.
- Add any environment variables above.
- Prepary MySQL base with credentials from the .env.
- Create table `messages` 
- Run `node server.js`.
- Verify it's working by visiting `http://localhost:4911/`.

To test that a query is available, visit something like `http://localhost:4911/api/v1.0/messages .

## Working with the Live Server

In order to merge changes and restart the server, follow these steps:

- `ssh` into the server.
- Do same steps as locally.
- Instead `node server.js` do next:
  - Restart the Node server with `ps aux | grep -ie server.js | awk '{print $2}' | xargs kill -9;  nohup node server.js > server.log &`.
  - Check that the server has been restarted by visiting a url, such as [api.forum-test-job](http://forum-test-job.stripway.ru:4911/api/v1.0/messages).
