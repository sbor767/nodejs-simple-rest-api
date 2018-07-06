# GCE Mapcat Server

## Dependencies

- NodeJS
- NPM

## Environment Variables

Certain environment variables are required to run the server and access data. These should be provided for you and you should place them in a file called `.env` in the root of the repository.

## Working with the Server and Data Locally

In order to run the server locally, you must follow these steps:

- Clone the repository
- Run `npm install` once you've installed any global dependencies above.
- Add any environment variables above.
- Start the crate server locally with `ssh -L 4200:localhost:4200 [USERNAME]@[IP_ADDRESS]`.
- Verify it's working by visiting `http://localhost:4200`.
- Run `node server.js`.
- Verify it's working by visiting `http://localhost:3911/`.

To test that a query is available, visit something like `http://localhost:3911/api/v2/items?lat=37.7557675&long=-122.4246298&q=pizza`.

## Working with the Live GCE Server

In order to merge changes and restart the server, follow these steps:

- `ssh` into the server with `ssh -L 4200:localhost:4200 [USERNAME]@[IP_ADDRESS]`.
- `cd ../api/gce-api-server` to get into the repository directory `/home/api/gce-api-mapcat`.
- From inside the repository directory `/home/api/gce-api-mapcat`, use `git` to `fetch` and `merge` into the `master` branch.
- Restart the Node server with `ps aux | grep -ie server.js | awk '{print $2}' | xargs kill -9;  nohup node server.js > server.log &`.
- Check that the server has been restarted by visiting a url, such as [api.mapcat.io](http://api.mapcat.io:3911/).
