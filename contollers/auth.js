
const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');


const newUser = async(req, res = response) => {

   
    // console.log(req.body)
    const {email, password, name} = req.body;

    try {
    // email is required 
    const user = await User.findOne({ email });

    if ( user ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        });
    }
 //create user con el modelo
 const dbUser = new User( req.body );


    // encrypt the password

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt );

    //JWT
    const token = await generateJWT( dbUser.id, name );

   // create user bdd
   await dbUser.save();

 return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

    //  console.log(email,password,name);

  

}




const loginUsuario = async(req, res = response) => {

  

    const { email, password } = req.body;

    try {
        
        const dbUser = await User.findOne({ email });

        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        //  password  match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // JWT
        const token = await generateJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    // console.log(email,password);

    // return res.json({
    //     ok: true,
    //     msg: 'Login user /'

    // });

}

const revalidateToken = async (req,  res = response) => {

    const { uid } = req;

    //bdd
    const dbUser = await User.findById(uid);


     // JWT
     const token = await generateJWT( uid, dbUser.name );

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
        

    });

}

module.exports = {
    newUser,
    loginUsuario,
    revalidateToken
}