import { Sequelize } from "sequelize";
import usersModel from "./users.model.js";
import messagesModel from "./messages.model.js";

// ==== Obtenir les variables d'environnement ====
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

// ==== Init sequelize ====
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: "postgres"
})

const db = {};
export default db;

// ==== Instance sequelize ====
db.sequelize = sequelize;

// ==== Models ====
db.Users = usersModel(sequelize);
db.Messages = messagesModel(sequelize);

// ==== Relations des modèles ====
db.Users.hasMany(db.Messages);
db.Messages.belongsTo(db.Users);