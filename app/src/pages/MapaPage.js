import React, { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 14
}

export const MapaPage = () => {
  const {setRef, coords, movimientoMarcador$, nuevoMarcador$} = useMapbox(puntoInicial);
  
  useEffect(() => {
    nuevoMarcador$.subscribe(marker => {
      console.log(marker);
    });
  }, [nuevoMarcador$])
  
  useEffect(() => {
    movimientoMarcador$.subscribe(marker => {
      console.log(marker);
    });
  }, [movimientoMarcador$])
  
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
