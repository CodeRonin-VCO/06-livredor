import { DataTypes, Sequelize } from "sequelize";


/**
 * 
 * @param {Sequelize} sequelize;
 */
export default function usersModel(sequelize) {
    
    const User = sequelize.define(
        "User", {
            email: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(250),
                allowNull: false
            },
            username: {
                type: DataTypes.STRING(150),
                allowNull: true
            }
        }, {
            tableName: "user",
            timestamps: true
        }
    )
    return User;
}