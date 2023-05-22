import {Sequelize} from "sequelize";

//importamos la conexion a la DB
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Class_Component = db.define('class_component', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3, 50]
        }
    },
}, {
    freezeTableName:true
});

export default Class_Component;