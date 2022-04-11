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
