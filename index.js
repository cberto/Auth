const express = require('express');
const cors = require('cors');
require('dotenv').config();



// console.log(process.env);
//crear Servidor/app de express

const app = express();


//Directorio
app.use(express.static('public'));
// cors
app.use(cors());

//Lesctura y parseo del body
app.use( express.json());


//Rutas

app.use( '/api/auth', require('./routers/auth'));

//GET

// app.get('/', (req, res) => {

//     // res.status()json({
//     res.json({
//         ok: true,
//         msg: 'OK',
//         uid: 123
//     })
//     // console.log('Petición en el /')

// });

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});