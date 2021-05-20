const Marcadores = require("./marcadores");

class Sockets {
  constructor(io){
    this.io = io;
    this.marcadores = new Marcadores()
    this.socketEvents();
  }
  socketEvents(){
    // On connection
    this.io.on('connection', (socket) => { 
      // Escuchar Evento
      console.log('Conectado.....')
    });
  }
}

module.exports = Sockets