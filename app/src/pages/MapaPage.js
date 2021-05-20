import React, { useContext, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import {SocketContext} from '../context/SocketContext';

const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 14
}

export const MapaPage = () => {
  const {setRef, coords, movimientoMarcador$, nuevoMarcador$} = useMapbox(puntoInicial);
  const {socket} = useContext(SocketContext);
  useEffect(() => {
    nuevoMarcador$.subscribe(marker => {
      socket.emit('marcador-nuevo', marker);
    });
  }, [nuevoMarcador$, socket]);
  
  useEffect(() => {
    movimientoMarcador$.subscribe(marker => {
      console.log(marker);
    });
  }, [movimientoMarcador$]);

  //Escuchar nuevos marcadores
  useEffect(() => {
    socket.on('marcador-nuevo', (marker) =>{
      console.log(marker);
    })
  }, [socket]);

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
