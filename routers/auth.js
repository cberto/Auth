const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { newUser, loginUsuario, revalidarToken } = require('../contollers/auth');
const { validateFields } = require('../middlewares/validate-fields');

//new user
router.post( '/new', [
    check('name', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Contraseña obligatoriaa').isLength({min: 6}),
    validateFields
], newUser);

//Login user
router.post( '/',[
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Contraseña obligatoriaa').isLength({min: 6}),
    validateFields
], loginUsuario);


//Validator token
router.get( '/renew', revalidarToken);

module.exports = router;