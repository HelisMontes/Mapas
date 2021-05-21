import React, { useContext, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import {SocketContext} from '../context/SocketContext';

const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 14
}

export const MapaPage = () => {
  const {setRef, coords, movimientoMarcador$, nuevoMarcador$, agregarMarcador, actualizarMarcador} = useMapbox(puntoInicial);
  const {socket} = useContext(SocketContext);

  useEffect(() => {
    socket.on('marcadores-activos', (marker)=>{
      // Sacamos los valores del objeto
      for (const key of Object.keys(marker)) {
        agregarMarcador(marker[key], key);
      }
    })
  }, [socket, agregarMarcador]);

  useEffect(() => {
    nuevoMarcador$.subscribe(marker => {
      socket.emit('marcador-nuevo', marker);
    });
  }, [nuevoMarcador$, socket]);
  
  useEffect(() => {
    movimientoMarcador$.subscribe(marker => {
      socket.emit('marcador-actualizado', marker);
    });
  }, [movimientoMarcador$, socket]);

  //Escuchar nuevos marcadores
  useEffect(() => {
    socket.on('marcador-nuevo', (marker) =>{
      agregarMarcador(marker, marker.id);
    })
  }, [socket, agregarMarcador]);

  //Actualizar marcador
  useEffect(() => {
    socket.on('marcador-actualizado', (marker) =>{
      actualizarMarcador(marker);
    })
  }, [socket, actualizarMarcador]);

  return (
    <>
      <div className="info">
        {`Lng: ${coords.lng} | Lat: ${coords.lat} | Zoom: ${coords.zoom}`}
      </div>
      <div
        className="mapContainer"
        ref={setRef}
      />
    </>
  )
}
