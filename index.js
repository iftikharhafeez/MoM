const express = require('express');
const requests = require('./requests'); 
const modules = require('./modules');

const appModules = modules();

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

requests(app, appModules);

//port listner
app.listen(3000);
console.log('Let`s Goooo!!');





