const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { newUser, loginUsuario, revalidateToken } = require('../contollers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

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
router.get( '/renew', validateJWT, revalidateToken);

module.exports = router;