import { Sequelize } from 'sequelize';

const db = new Sequelize('database_app', 'root', '26192031Jean.',{
    host:'localhost',
    dialect:'mysql'
})

export default db