import User from '../models/UserModel.js'

export const verificationUser = async (req, res, next) =>{

    if(!req.session.userId){
        return res.status(401).json({msg:"Ingrese a su cuenta"})   
    } 
    const user = await User.findOne ({
        where:{
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg:'no se encontro el usuario'})
    req.userId = user.id;
    req.role = user.role;
    next();
}   

export const onlyAdmin = async (req, res, next) => {
    const user = await User.findOne({
        where:{
            uuid: req.session.userId
        }
    });

    if (!user) return res.status(404).json({msg:"no se encontro el usuario" })
    if( user.role !== "administrador") return res.status(403).json({msg:"no tiene permisos"});

    next();
}