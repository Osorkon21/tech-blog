// const Driver = require('./Driver');
// const License = require('./License');

// Define a Driver as having one License to create a foreign key in the `license` table

// One-To-One OR One-To-Many
// ===================================
// hasOne always goes on the model that does NOT have the foreign key
// ModelA.hasOne(ModelB, {
//   foreignKey: "A_id",
//   onDelete: "CASCADE"
// });

// belongsTo always goes on the model that DOES have the foreign key
// ModelB.belongsTo(ModelA, {
//   foreignKey: "A_id",
//   onDelete: "CASCADE"
// });

// // use hasOne() on the model without the foreign key
// Driver.hasOne(License, {
//   foreignKey: 'driver_id',
//   // When we delete a Driver, make sure to also delete the associated License.
//   onDelete: 'CASCADE',
// });

// We can also define the association starting with License

// use belongsTo() on the model that has the foreign key
// License.belongsTo(Driver, {
//   foreignKey: 'driver_id',
// });

// We package our two models and export them as an object so we can import them together and use their proper names
// module.exports = { Driver, License };
