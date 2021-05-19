import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsaXNtb250ZXMiLCJhIjoiY2tvcWNrd3ljMDdkZDJvbWlhcmdtZTRseSJ9.TvCv9ZgSZ8sDa6XadQZvrQ';

export const useMapbox = (puntoInicial) => {
  //Referencia al DIV del mapa que esta en el componenete MapaPage
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);
  
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
  }, [puntoInicial]);
  
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
  }, []); 
  
  return{ setRef, coords }
}
