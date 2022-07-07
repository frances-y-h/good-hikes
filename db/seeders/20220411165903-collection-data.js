"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
          'Collections',
          [
            {
              userId: 1,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 1,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 1,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 1,
              name: 'California',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 1,
              name: 'National Parks',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 1,
              name: 'Dog Friendly',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            //USER 2 - ADDED 3 Default collections and 3 custom collections
            {
              userId: 2,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 2,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 2,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 2,
              name: 'California',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 2,
              name: 'National Parks',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 2,
              name: 'Dog Friendly',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            //USER 3 - 3 Default collections
            {
              userId: 3,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 3,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 3,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            //USER 4 - 3 Default collections
            {
              userId: 4,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 4,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 4,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            //USER 5 - 3 Default collections
            {
              userId: 5,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 5,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 5,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            //USER 6 - 3 Default collections
            {
              userId: 6,
              name: 'Want To Hike',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 6,
              name: 'Planned',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              userId: 6,
              name: 'Completed',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Collections", null, {});
    },
};
