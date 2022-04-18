const mongoose = require('mongoose');

const dbConnection =async() => {


    try {
       await mongoose.connect(process.env.BD_CNN,{
           userNewUrlParser: true,
           useUnifiedTopology: true,
           useCreteIndex: true
       });
       console.log('bdd online');
    } catch (error) {
        console.error(error);
        throw new Error('Erorr a la hora de inicialización bdd');
    }
}