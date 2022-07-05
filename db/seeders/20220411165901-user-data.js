'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          //   username: 'IfIJustLayHere',
          username: 'DemoUser',
          email: 'ilovesnowpatrol@alec.com',
          hashedPassword:
            '$2a$10$dVopF/HDuLDbM0ayJFzLD./Htol.2xvTnwwfqZ8q8/wjrke176vCe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Added USER 2
        {
          //   username: 'SnowPatrolRules',
          username: 'Ansel Adams',
          email: 'snowpatrolrules@alec.com',
          hashedPassword:
            '$2a$10$g92V3Gdj0wAFwMGV.7aS4O8IA.x19y7SaluTGzgL.KnF5e0a31ZKC',
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
