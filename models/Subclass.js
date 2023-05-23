import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Class_Component from "./Class_Component.js";
import Marca from "./Marca.js";


const{DataTypes} = Sequelize;

const Subclass = db.define('subclass', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3, 50]
        }
    },
    classId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    marcaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }

    }
},{
    freezeTableName:true
})

//Relacion con la Clase del componente 
Class_Component.hasMany(Subclass);
Subclass.belongsTo(Class_Component,{
    foreignKey:'classId'
});

//Relacion con la marca
Marca.hasMany(Subclass);
Subclass.belongsTo(Marca,{
    foreignKey:'marcaId'
})

export default Subclass;