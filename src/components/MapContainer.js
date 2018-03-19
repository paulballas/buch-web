import React from 'react';
import mapboxgl from 'mapbox-gl';

class MapContainer extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGJhbGxhcyIsImEiOiJjaXlnYnM5cXAwMjhqMndwOGZhYTZla2dpIn0.KaM6fMflgk7vlA1A91nFFw'
    new mapboxgl.Map({
      container: 'mapBox',
      style: 'mapbox://styles/paulballas/cjexj6xso2wze2tpfekbpolvg',
      center: this.props.coordinates,
      zoom: 12
    });
  }

  render() {    
    return (
      <div className='mapBox' id='mapBox' />
    );
  }
}

export default MapContainer;
