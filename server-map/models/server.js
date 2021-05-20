// Configuracion de Express
const express = require('express');
// Servidor de Sockets
const http  = require('http');
// Configuracion del socket server
const socketio  = require('socket.io');
const path  = require('path');
const cors = require('cors')

const Sockets = require('./sockets');

class Server {
  constructor (){
    this.app = express();
    this.port = process.env.PORT;
    
    // Http server
    this.server = http.createServer(this.app);

    // Configuracion de socket
    this.io = socketio(this.server,{/* Configuraciones */});
  }
  middlewares(){
    //Desplegar el directorio publico
    this.app.use( express.static (path.resolve(__dirname, '../public') ) );

    //Habilitar CORS
    this.app.use( cors() );
  }
  configurarSockets(){
    new Sockets(this.io)
  }
  execute(){
    //Inicializar Middleware
    this.middlewares();

    //Inicializar sockets
    this.configurarSockets();

    this.server.listen(this.port,() => {
      console.log(`Servidor corriendo en http://localhost:${this.port}/`);
    }); 
  }
}

module.exports = Server