import { Sequelize } from "sequelize";

//importamos la conexion a la DB
import db from "../config/Database.js";

// Definimos sequelize
const {DataTypes} = Sequelize;

const Users = db.define('users', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 20]
        }
    },

    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 20]
        }
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },

    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    }
},{
    freezeTableName:true
});

export default Users;
