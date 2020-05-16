//ARCHIVO DE CONFIGURACION
//Importar express
//require para importar
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes')
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({ path: 'variables.env' })

db.authenticate()
    .then(() => console.log('DB CONECTADA'))
    .catch(error => console.log(error));

//Configurar express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));//le decimos donde va a encontrar las views

//Cargar unca carpeta estatica llamada public
app.use(express.static('public'));

//Validar si estamos en desarrollo o produccion
const config = configs[app.get('env')];//para detectar el ambiente en el qu estams

//Creamos la vairable para e sitio web
app.locals.tittle = config.nameSite;
//Muestra el año actual
app.use((req, res, next) => {
    //crear una nueva fecha
    const date = new Date();
    res.locals.currentDate = date.getFullYear();//currentedate nombre cualquiera
    // res.locals.wave = 'Hola'
    // console.log(res.locals);
    res.locals.route = req.path;//imprime la ruta loq ue esta despues del diagonal

    return next();//para que continue ejecutando la proxima funcion
})
//EJECUTAR EL BODYPARSER PARA QUE NO IMPRIMA UNDEFINED EN EL REQ.BODY
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar las rutas
app.use('/', routes());

//PUERTO Y HOST PARA LA APP
const host = process.env.HOST || '0.0.0.0'//en caso de que no exista 0000, si no es valido le asigna uno para eso es el 0000
const port = process.env.PORT || 3000;//en caso de que no exista en el variables.env asiganamos 3000,, el eroku asigna
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});//puerto