/*
PROJECT SETUP:

//Initialize project and install dependencies
    ~$ npm init -y
    ~$ npm install express@^4.0.0 pug@^2.0.0
    ~$ npm install nodemon@^2.0.0 --save-dev
    ~$ npm install morgan
    ~$ npm install per-env
    ~$ npm install dotenv dotenv-cli --save-dev
    ~$ npm install sequelize@^5.0.0 pg@^8.0.0 &&
    ~$ npm install sequelize-cli@^5.0.0 --save-dev
    ~$ npm install cookie-parser@^1.0.0

//Add .sequelizerc file and run `~$ npx sequelize init`

//Install additional Dependencies:
  ~$ npm install bcryptjs &&
  ~$ npm install express-validator &&
  ~$ npm install csurf

//Update /bin/www file with sequelize authentication

//Update .env file based on .env.example
  -add session Key and PORT variable

//Update /config/index.js

//Add the specified USER name to local database and then run:
  ~$ npx dotenv sequelize db:create

//Generate sequelize model and migration files for each table:
  npx sequelize model:generate --name Tag --attributes name:string
  npx sequelize model:generate --name CityPark --attributes name:string
  npx sequelize model:generate --name State --attributes abbreviation:string,state:string
  npx sequelize model:generate --name RouteType --attributes name:string
  npx sequelize model:generate --name Difficulty --attributes level:string
  npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
  npx sequelize model:generate --name Hike --attributes cityParkId:integer,stateId:integer,name:string,length:numeric,elevationChange:integer,difficultyId:integer,routeTypeId:integer,imgUrl:text
  npx sequelize model:generate --name Collection --attributes userId:integer,name:string
  npx sequelize model:generate --name Review --attributes userId:integer,hikeId:integer,rating:integer,title:string,comment:text,dateHike:dateonly
  npx sequelize model:generate --name JoinHikeCollection --attributes hikeId:integer,collectionId:integer
  npx sequelize model:generate --name JoinHikeTag --attributes hikeId:integer,tagId:integer

//Update model and migration files with proper validation and data structures and associations

//Add Model Associations
  //1) MANY-MANY Join Hikes Tags
    const columnMapping = {
      through: 'JoinHikeTag', //  model name referencing join table
      otherKey: 'hikeId',
      foreignKey: 'tagId',
    };
    Tag.belongsToMany(models.Hike, columnMapping);

    const columnMapping2 = {
      through: 'JoinHikeTag',
      otherKey: 'tagId',
      foreignKey: 'hikeId',
    };
    Hike.belongsToMany(models.Tag, columnMapping2);

  //2) ONE cityPark has many Hikes
    Hike.belongsTo(models.CityPark, { foreignKey: 'cityParkId' });
    CityPark.hasMany(models.Hike, { foreignKey: 'cityParkId' });

  //3) ONE state has many Hikes
    Hike.belongsTo(models.State, { foreignKey: 'stateId' });
    State.hasMany(models.Hike, { foreignKey: 'stateId' });

  //4) ONE routeType has many Hikes
    Hike.belongsTo(models.RouteType, { foreignKey: 'routeTypeId' });
    RouteType.hasMany(models.Hike, { foreignKey: 'routeTypeId' });

  //5) ONE difficulty has many Hikes
    Hike.belongsTo(models.Difficulty, { foreignKey: 'difficultyId' });
    Difficulty.hasMany(models.Hike, { foreignKey: 'difficultyId' });

  //6) One user has many reviews
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });

  //7) One hike has many reviews
    Review.belongsTo(models.Hike, { foreignKey: 'hikeId' });
    Hike.hasMany(models.Review, { foreignKey: 'hikeId' });

  //8) One user has many collections
    Collection.belongsTo(models.User, { foreignKey: 'userId' });
    User.hasMany(models.Collection, { foreignKey: 'userId' });

  //9) MANY-MANY - Join collection hikes
    const columnMapping3 = {
      through: 'JoinHikeCollection', //  model name referencing join table
      otherKey: 'hikeId',
      foreignKey: 'collectionId',
    };
    Collection.belongsToMany(models.Hike, columnMapping3);

    const columnMapping4 = {
      through: 'JoinHikeCollection',
      otherKey: 'collectionId',
      foreignKey: 'hikeId',
    };
    Hike.belongsToMany(models.Collection, columnMapping4);

//run migration
  ~$ npx dotenv sequelize db:migrate

//create seed data files
  npx sequelize seed:generate --name tag-data &&
  npx sequelize seed:generate --name cityPark-data &&
  npx sequelize seed:generate --name state-data &&
  npx sequelize seed:generate --name routeType-data &&
  npx sequelize seed:generate --name difficulty-data &&
  npx sequelize seed:generate --name user-data &&
  npx sequelize seed:generate --name hike-data &&
  npx sequelize seed:generate --name collection-data &&
  npx sequelize seed:generate --name review-data &&
  npx sequelize seed:generate --name joinHikeCollection-data &&
  npx sequelize seed:generate --name joinHikeTag-data

//update all the seed files with seed data

//seed the database
  ~$ npx dotenv sequelize db:seed:all

//generate hashed password for the demo user
    (async () => {
      const bcrypt = require('bcryptjs');
      let password = 'I<3ChasingCars!';
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
    })();

     (async () => {
      const bcrypt = require('bcryptjs');
      let password = 'I<3CrackTheShutters!';
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
    })();

//add "clean" script to package.jon
    "clean": "npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"

//DO NOT DROP HEROKU DATABASE
    ~$ heroku run npx sequelize-cli db:seed:undo:all
    ~$ heroku run npx sequelize-cli db:migrate:undo:all
    ~$ heroku run npx sequelize-cli db:migrate
    ~$ heroku run npx sequelize-cli db:seed:all

FUTURE TODOs:
-make collections table mobile friendly
-make explore page hike list update dynamically without page refresh

PROJECT CHALLENGES NOTES:
- Git and Version Control
  - First team project, learning curve about proper use of feature branches, rebasing, merging, and pull requests
  - Reviewed online guides about proper git flow and worked together online in the beginning when submitting and reviewing PRs
- Search Feature
  - implement a custom search with both free text and multiple filters as well as a clear all filters functionality
  - utilized Pug template engine mixins to create dynamic DRYer html code across 8 filter types
  - utilized url query parameters, regex, raw sequel and sequelize to create custom search algorithm to query database
  - repopulating filters and search input
- Database setup
  - Missing associating in sequelize model
- USER Auth Feature
  - Demo - form submission vs ajax and window refresh fetch stops the default refresh behavior
  - csurf form submission issues
  - requireAuth middleware
- Splash page Feature
- Collections Feature
  - add to collection dropdown
  - as added more dom manipulation, some buttons disappeared, better organization on selectors
  - deleting collections with associated data,
- Reviews Feature
  - adding event listeners to buttons created in front end post fetch request
  - merge conflict doubled the router code
  - updating the table after adding a review without rerendering. parent./child node (delete last and add first) vs fetch to database and refill entire table
  - re-populate and clear the data field
- Production
  - new to heroku, and learning about production errors and heroku cli
  */
