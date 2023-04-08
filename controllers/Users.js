import User from "../models/UserModel.js";
import argon2 from "argon2";
import {Op} from 'sequelize'


//MOSTRAR A TODOS LOS USUARIOS
export const getUser = async (req, res) =>{
    try {
        const resp = await User.findAll({
            //SOLO PARA MOSTRAR CIERTOS ATRIBUTOS
            attributes:['id','uuid', 'name', 'lastName', 'email', 'role']
        });
        res.status(200).json(resp);
        
    } catch (error) {
        res.status(500).json({mesg:error.message});
    }
}

//MOSTRAR SOLO EL USUARIO CON EL ID
export const getUserById = async (req, res )=>{
    const id = req.params.id;
    try {
        const resp = await User.findOne({
            attributes:['id','uuid', 'name', 'lastName', 'email', 'role'],
            where: {
                //Mostrara ambas busqueda 
                [Op.or] : [{id:id}, {uuid:id}]
            }
        });
        res.status(200).json(resp)
        
    } catch (error) {
        res.status(500).json({msg: error.message })
    }
}

//CREACION DE USUARIO

export const createUser = async (req, res) =>{
    const {
        name,
        lastName,
        email,
        password,
        verfPassword,
        role
    } = req.body
    //VERIFICACION DE LAS CONTRASE;AS
    if (password !== verfPassword) return res.status(400).json({msg:"No coincide las contraseñas"})

    const hashPassword = await argon2.hash(password);

    try {
        await User.create({
            name:name,
            lastName:lastName,
            email:email,
            password:hashPassword,
            role:role
        });
        res.status(201).json({msg:"Usuario Registrado Exitosamente"});
        
    } catch (error) {
        res.status(400).json({msg: error.message });
    }
}

//ACTUALIZACION DE DATOS DE USUARIO
export const updateUser = async (req, res) =>{
    const id = req.params.id;
    const user =await User.findOne({
        where:{
            [Op.or] : [{id:id}, {uuid:id}]
        }
    });
    if(!user) return res.status(400).json({msg:"No se encontro el usuario"})

    const {name, lastName,email,password,verfPassword,role} =req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else {
        hashPassword = await argon2.hash(password);
    }
    
    if(password !== verfPassword) return res.status(400).json({msg:"Las contrase;as no coinciden"});

    try {
        await User.update({
            name:name,
            lastName:lastName,
            email:email,
            password:hashPassword,
            role:role
        },{
            where:{
                id:user.id
            }
        });
        res.status(200).json({msg:"Usuario Actualizado Exitosamente"})
    } catch (error) {
        
    }



}

//ELIMINACION DE USUARIO

export const deleteUser = async (req, res)=>{
   const id = req.params.id;
    const user = await User.findOne({
        where:{
            [Op.or] : [{id:id}, {uuid:id}]
        }
    });
    if(!user) return res.status(400).json({msg:"No se encontro el usuario"})
    try {
        await User.destroy({
            where:{
                 [Op.or] : [{id:user.id}, {uuid:user.id}]
            }
        });
    
        res.status(200).json({msg:"Usuario Eliminado Exitosamente"})
        
    } catch (error) {
        res.status(400).json({msg:error.message})
        
    }
    
}
