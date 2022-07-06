'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        //USERID 1
        {
          //   username: 'IfIJustLayHere',
          username: 'DemoUser',
          email: 'ilovesnowpatrol@alec.com',
          hashedPassword:
            '$2a$10$dVopF/HDuLDbM0ayJFzLD./Htol.2xvTnwwfqZ8q8/wjrke176vCe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //USERID 2
        {
          //   username: 'SnowPatrolRules',
          username: 'Ansel Adams',
          email: 'snowpatrolrules@alec.com',
          hashedPassword:
            '$2a$10$g92V3Gdj0wAFwMGV.7aS4O8IA.x19y7SaluTGzgL.KnF5e0a31ZKC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //USERID 3
        {
          //   password: 'password',
          username: 'Frances',
          email: 'frances@user.io',
          hashedPassword:
            '$2a$10$NMkHOnZRabJH9Jylrxvq7uOLoq5zfuoHQnWc6g/2gv2x1qwSR7SEC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //USERID 4
        {
          //   password: 'password',
          username: 'Elan',
          email: 'elan@user.io',
          hashedPassword:
            '$2a$10$NMkHOnZRabJH9Jylrxvq7uOLoq5zfuoHQnWc6g/2gv2x1qwSR7SEC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //USERID 5
        {
          //   password: 'password',
          username: 'Lana',
          email: 'lana@user.io',
          hashedPassword:
            '$2a$10$NMkHOnZRabJH9Jylrxvq7uOLoq5zfuoHQnWc6g/2gv2x1qwSR7SEC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //USERID 6
        {
          //   password: 'password',
          username: 'Brian',
          email: 'brian@user.io',
          hashedPassword:
            '$2a$10$NMkHOnZRabJH9Jylrxvq7uOLoq5zfuoHQnWc6g/2gv2x1qwSR7SEC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
