import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsaXNtb250ZXMiLCJhIjoiY2tvcWNrd3ljMDdkZDJvbWlhcmdtZTRseSJ9.TvCv9ZgSZ8sDa6XadQZvrQ';
const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 14
}

export const MapaPage = () => {
  const mapDiv = useRef();
  // const [ mapa, setMapa] = useState();
  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom
    });
    mapa.current = map;
  }, [])
  //Obtener las coordenadas
  useEffect(() => {
    mapa.current?.on('move', ()=>{
      const {lng, lat} = mapa.current?.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current?.getZoom().toFixed(2)
      })
    });
  }, [mapa])
  return (
    <>
      <div className="info">
        {`Lng: ${coords.lng} | Lat: ${coords.lat} | Zoom: ${coords.zoom}`}
      </div>
      <div
        className="mapContainer"
        ref={mapDiv} 
      >
        asd
      </div>
    </>
  )
}
