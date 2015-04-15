An simple RESTful API example
====

Installation
===

1. Create MySql database using DB schema or MySql dump from "/_doc" directory
2. Setup access to your MySql server and DB in "/app/config/config.js" file
3. Setup a Firebase account https://www.firebase.com and update credentials in config "/app/config/config.js" file
4. Setup a Cloudinary account https://cloudinary.com and update url in config "/app/config/config.js" file
5. Install NodeJs https://nodejs.org/ on your machine
6. Install GIT http://git-scm.com/ on your machine
7. Get project from Repo https://github.com/creoLIFE/restapi-contacts and save it to some folder
    [example ./your_folder_with_project/]
8. Use NPM https://www.npmjs.com/ manager to install all necessary libraries
    [example ./your_folder_with_project/npm install]
9. Run project
    [node app.js]
10. Try to use example Postman https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en to do some queries to API
    [example GET http://localhost:8080/access_token/some.email@gmail.com/12345
11. Run basic unit test
    [example ./your_folder_with_project/node_modules/.bin/falkor test/test.js]