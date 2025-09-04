import { Sequelize } from "sequelize";

/**
 * 
 * @param {Sequelize} sequelize 
 */
export default function messagesModel(sequelize) {

    const Messages = sequelize.define(
        "Messages", {
            id: {
                type: DataTypes.STRING(150),
                autoIncrement: true,
                autoIncrementIdentity: true,
                primaryKey: true
            },
            message: {
                type: DataTypes.STRING(5_000),
                allowNull: false
            },
            hasSpoiler: {
                type: DataTypes.BOOLEAN
            }
        }, {
            tableName: "user",
            timestamps: true
        }
    )
    return Messages;
}