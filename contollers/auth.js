
const { response } = require('express')


const newUser = (req, res = response) => {

   
    // console.log(req.body)
    const {email, password, name} = req.body;
     console.log(email,password,name);

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'

    });

}




const loginUsuario = (req,  res = response) => {

  

    const {email, password} = req.body;
    console.log(email,password);

    return res.json({
        ok: true,
        msg: 'Login user /'

    });

}

const revalidarToken = (req,  res = response) => {

    return res.json({
        ok: true,
        msg: 'Renew'

    });

}

module.exports = {
    newUser,
    loginUsuario,
    revalidarToken
}