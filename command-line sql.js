/*

//Already done for us:
    npm init -y
    npm install express@^4.0.0 pug@^2.0.0
    npm install nodemon@^2.0.0 --save-dev
    npm install morgan
    npm install per-env
    npm install dotenv dotenv-cli --save-dev
    npm install sequelize@^5.0.0 pg@^8.0.0 &&
    npm install sequelize-cli@^5.0.0 --save-dev
    npm install cookie-parser@^1.0.0

    add .sequelizerc file:

    npx sequelize init

//Need to install:

    npm install bcryptjs &&
    npm install express-validator &&
    npm install csurf

//updated /bin/www file, added sequelize authentication

//update personal .env file and .env.example
    -added session Key and PORT variable
    -updated /config/index.js

//Add the specified USER name to local database and then run:

npx dotenv sequelize db:create

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

//Update model and migration files with proper validation and data structures
//create associations

*/
//HIKE RELATIONSHIPS:

//1) MANY-MANY Join Hikes Tags

const columnMapping = {
    through: "JoinHikeTag", //  model name referencing join table
    otherKey: "hikeId",
    foreignKey: "tagId",
};

Tag.belongsToMany(models.Hike, columnMapping);

const columnMapping2 = {
    through: "JoinHikeTag",
    otherKey: "tagId",
    foreignKey: "hikeId",
};
Hike.belongsToMany(models.Tag, columnMapping2);

//2) ONE cityPark has many Hikes
Hike.belongsTo(models.CityPark, { foreignKey: "cityParkId" });
CityPark.hasMany(models.Hike, { foreignKey: "cityParkId" });

//3) ONE state has many Hikes
Hike.belongsTo(models.State, { foreignKey: "stateId" });
State.hasMany(models.Hike, { foreignKey: "stateId" });

//4) ONE routeType has many Hikes
Hike.belongsTo(models.RouteType, { foreignKey: "routeTypeId" });
RouteType.hasMany(models.Hike, { foreignKey: "routeTypeId" });

//5) ONE difficulty has many Hikes
Hike.belongsTo(models.Difficulty, { foreignKey: "difficultyId" });
Difficulty.hasMany(models.Hike, { foreignKey: "difficultyId" });

//6) One user has many reviews
Review.belongsTo(models.User, { foreignKey: "userId" });
User.hasMany(models.Review, { foreignKey: "userId" });

//7) One hike has many reviews
Review.belongsTo(models.Hike, { foreignKey: "hikeId" });
Hike.hasMany(models.Review, { foreignKey: "hikeId" });

//8) One user has many collections
Collection.belongsTo(models.User, { foreignKey: "userId" });
User.hasMany(models.Collection, { foreignKey: "userId" });

//9) MANY-MANY - Join collection hikes

const columnMapping3 = {
    through: "JoinHikeCollection", //  model name referencing join table
    otherKey: "hikeId",
    foreignKey: "collectionId",
};

Collection.belongsToMany(models.Hike, columnMapping3);

const columnMapping4 = {
    through: "JoinHikeCollection",
    otherKey: "collectionId",
    foreignKey: "hikeId",
};
Hike.belongsToMany(models.Collection, columnMapping4);

/*


npx dotenv sequelize db:migrate

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

npx dotenv sequelize db:seed:all

*/
