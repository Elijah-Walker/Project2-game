module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 3]
      }
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });
  return Player;
};
