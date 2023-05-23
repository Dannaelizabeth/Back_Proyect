import { Sequelize } from "sequelize";
import db from '../config/Database.js'

const {DataTypes} =Sequelize;

const Departament =db.define('departament',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,50]
        }
    }
})