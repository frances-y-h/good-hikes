'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: "IfIJustLayHere", email: "ilovesnowpatrol@alec.com", hashedPassword:"$2a$10$dVopF/HDuLDbM0ayJFzLD./Htol.2xvTnwwfqZ8q8/wjrke176vCe", createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
