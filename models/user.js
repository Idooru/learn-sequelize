const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블 컬럼 설정
            {
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                age: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                married: {
                    type: Sequelize.BOOLEAN, // true false
                    allowNull: false,
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE, // DATETIME, MYSQL DATE -> sequelize Dateonly
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                // User 모델의 대한 설정
                sequelize,
                timestamps: false, // true 설정 시 createdAt 과 updatedAt을 자동으로 생성해준다.
                underscored: false, // '_'를 쓸지 말지 정해준다.
                modelName: "User",
                tableName: "users",
                paranoid: false, // true 설정 시 deletedAt을 자동으로 생성해준다.
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.User.hasMany(db.Comment, {
            foreignKey: "commenter",
            sourceKey: "id",
        });
    }
};
