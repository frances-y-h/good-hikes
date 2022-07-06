'use strict';

// import array of object records
const { reviewSeed } = require('../tables-seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Reviews',
      [
        {
          userId: 3,
          hikeId: 43,
          rating: 5,
          comment:
            'Beautiful 🤩, short stop that you must visit when in Joshua Tree! The abundance of Cholla Cactus is really something to behold',
          dateHike: new Date(new Date(2022, 6, 8).valueOf()),
          createdAt: new Date(new Date(2022, 6, 8).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          hikeId: 43,
          rating: 4,
          comment:
            'Nice garden with cool view of mountains and desert. If you’re there when the cacti are blooming, smell the flowers, they smell exactly like bubble soap!',
          dateHike: new Date(new Date(2022, 6, 7).valueOf()),
          createdAt: new Date(new Date(2022, 6, 7).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          hikeId: 43,
          rating: 4,
          comment: 'Very sandy and lovely hike! 🌵',
          dateHike: new Date(new Date(2022, 6, 6).valueOf()),
          createdAt: new Date(new Date(2022, 6, 6).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          hikeId: 43,
          rating: 5,
          comment:
            'So much fun to frolic amongst the cholla, but be careful their needles are super sharp!',
          dateHike: new Date(new Date(2022, 6, 5).valueOf()),
          createdAt: new Date(new Date(2022, 6, 5).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Can not get enough of these chollas!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Would recommend as a must see!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Never disappoints!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment:
            'My friend tripped and fell, those needles are sharp, be careful!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'LOVE LOVE LOVE 🤩 🤩 🤩',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Great views of the valley below!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Put some sunglasses on the cactus for a good laugh.',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Out of this world!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'A must see!',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          hikeId: 43,
          rating: 5,
          comment: 'Visit at sunrise for the best photos.',
          dateHike: new Date(new Date(2022, 6, 4).valueOf()),
          createdAt: new Date(new Date(2022, 6, 4).valueOf()),
          updatedAt: new Date(),
        },
        ...reviewSeed,
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
