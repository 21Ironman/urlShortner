# URL Shortner
## _Convert big link into short one_

## Features
- Short big urls
- Track total clicks
- Database Storage

## Tech Stack :
- Backend: ```NodeJS , ExpressJS```
- Frontend: ```React Js```
- Libraries : ```Axios , ShortId, Cors ```
- Database:  ```Mysql 8.x```

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm install  // On both [view & controller]
```

After Completion Start the both server
```sh
npm start  //on view folder
node index.js  //on controller folder
```

## Database
Open ```url-shortner-modal``` folder and import ```sqldump``` file to your workbench
Mysql Database Details :
- Database Name:  ``` url ```
- Table Name: ``` short_url ```
- Columns:
-- ```id [INT][PK][AI]```
-- ```fullurl [VARCHAR]```
-- ```shorturl [VARCHAR]```
-- ```clicks [INT]```

Open ```url-shortner-controller``` folder then open ```index.js``` and update your database credentials

```sh
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'url'
})
```

## Server 
- Frontend: ```https://localhost:3000```
- Backend: ```https://localhost:9000```



