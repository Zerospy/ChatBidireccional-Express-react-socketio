const express = require('express');
const http = require('http');

const socketIo = require('socket.io');
const path = require('path'); 

//Webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); 
const config  = require('./webpack.config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//middleware
app.use(webpackDevMiddleware(webpack(config)));
// De esta manera copiamos el contenido de src a public y evitamos tener que abrir otra consola aparte
app.use(express.static(path.join(__dirname, 'public')));  
//__dirname significa unir con el directorio, en este caso public. webpack-dev-server utiliza express

io.on('connection', socket => {


    console.log('socket connected: ', socket.id );

    socket.on('message', body => {

        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(8)

        });
    })

});

server.listen(3000, () => {

console.log('server on port 3000'); 

});