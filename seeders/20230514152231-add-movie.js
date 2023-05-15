"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Movies", [
      {
        title: "Fast and Furious",
        genre: "Action",
        year: "2016",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Cars",
        genre: "Cartoon",
        year: "2020",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Narcos",
        genre: "Adventure",
        year: "2000",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
