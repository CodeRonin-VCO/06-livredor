import db from "./models/index.model.js";

try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({
        alter: { drop: false }
    });


} catch (error) {
    console.log(`L'initialisation a échoué`, error);
}

process.exit(0);