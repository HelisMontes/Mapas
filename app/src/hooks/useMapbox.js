import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsaXNtb250ZXMiLCJhIjoiY2tvcWNrd3ljMDdkZDJvbWlhcmdtZTRseSJ9.TvCv9ZgSZ8sDa6XadQZvrQ';

export const useMapbox = (puntoInicial) => {
  //Referencia al DIV del mapa que esta en el componenete MapaPage
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);
  
  //Referencia de los marcadores
  const marcadores = useRef({});

  //Observables de RXjs
  const movimientoMarcador = useRef(new Subject())
  const nuevoMarcador = useRef(new Subject())

  //Mapas y coordenadas
  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

  //Funcion para agregar marcadores
  const agregarMarcador = useCallback((event, id) => {
    const {lng, lat} = event.lngLat || event;

      const marker =  new mapboxgl.Marker();
      marker.id = id ?? v4();
      marker
        .setLngLat([lng, lat])  //Asignamos las cordenadas
        .addTo(mapa.current)    //Asignamos el marker a un mapa
        .setDraggable(true)     //Para que el marke se pueda mover por el mapa
      // Almacenar los marcadores
      marcadores.current[marker.id] = marker;
     
      // Si el id no existe es porque estoy creando un marcador desde el frontend
      if(!id) {
        // Si hay un nuevo marcador se emite mediante el next
        nuevoMarcador.current.next({
          id: marker.id,
          lng, 
          lat
        });
      }

      //Escuchar movimiento del marcador
      marker.on('drag', ({target}) => {
        const {id} = target;
        const {lng, lat} = target.getLngLat();
        
        //Si el marcador sufre un cambio de se emite mediante el next
        movimientoMarcador.current.next({ id, lng, lat });
      });
  }, []);
  
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
    mapa.current?.on('move', () => {
      const {lng, lat} = mapa.current?.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current?.getZoom().toFixed(2)
      })
    });
  }, []);
  useEffect(() => {
    mapa.current?.on('click', agregarMarcador);
  }, [agregarMarcador]);
  
  return{ 
    agregarMarcador, 
    coords, 
    movimientoMarcador$: movimientoMarcador.current,
    nuevoMarcador$: nuevoMarcador.current,
    setRef 
  }
}
