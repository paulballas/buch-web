import React from 'react';
import axios from 'axios'
import MapContainer from './MapContainer'

class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      brews: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/brews.json')
    .then(response => {
      this.setState({brews: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    const {
      id,
      title,
      coordinates,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      closeModal,
      tap_room,
      url
    } = this.props
    return (
      <div className='modal'>
        <div className='container lg'>
          <div className='modal-content'>
            <div className='row'>
              <div className='col-xs-12 end-xs'>
                <a onClick={closeModal}>Close</a>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 col-xs-12 relative'>
                <MapContainer coordinates={coordinates}/>
              </div>
              <div className='col-md-6 col-xs-12'>
                <h4 className='m-b-0'>{title}</h4>
                <p className='m-b-0'>{addressOne} {addressTwo? addressTwo : null}</p>
                <p>{city},
                  {state} {zip}</p>
                <a href={url}>{url}</a>
                { tap_room? <p>Tap Room!</p> : null }
              </div>
            </div>
            <div className='space-3' />
            <div className='row'>
              {this.state.brews.map((brew) => {
                if(brew.companies_id === id){
                  return (
                    <div className="col-md-3 col-xs-6" key={brew.id} >
                      <div className='buch-container'>
                        <p>{brew.name}</p>
                        <img
                          src={brew.image}
                          alt={brew.name}
                          className='brew-img'
                          />
                      </div>
                    </div>
                  );
                } else {
                  return null
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
