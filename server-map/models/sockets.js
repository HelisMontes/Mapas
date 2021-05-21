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
      
      // Marcadores activos
      socket.emit('marcadores-activos', this.marcadores.activos);

      // Nuevo marcador
      socket.on('marcador-nuevo', (marcador) => {
        this.marcadores.agregarMarcador(marcador);

        /** 
         * Se crea un nuevo marcardor en el mapa a los demas usuarios conectados
         * a excepción del usuario que lo creo
         * */ 
        socket.broadcast.emit('marcador-nuevo', marcador);
      });
      
      // Actualizar coordenadas del marcador 
      socket.on('marcador-actualizado', (marcador) => {
        this.marcadores.actualizarMarcador (marcador);

        /** 
         * Se notifica la actualización del marcador en movimiento a los demás usuarios
         * a excepción del usuario que lo esta moviendo.
         * */ 
        socket.broadcast.emit('marcador-actualizado', marcador);
      });

    });
  }
}

module.exports = Sockets