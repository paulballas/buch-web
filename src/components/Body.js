import React from 'react';
import axios from 'axios'
import Company from './Company'
import MapContainer from './MapContainer'

class Body extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      companyModal: false,
      coTitle: '',
      coSteetOne: '',
      coSteetTwo: '',
      coCity: '',
      coState: '',
      coZip: '',
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/companies.json')
    .then(response => {
      this.setState({companies: response.data})
    })
    .catch(error => console.log(error))
  }

  coOnClick = (co) => {
    this.setState({
      companyModal: true,
      coTitle: co.title,
      coSteetOne: co.addressOne,
      coSteetTwo: co.addressTwo,
      coCity: co.city,
      coState: co.state,
      coZip: co.zip,
    })
  }

  closeCompanyModal = () => {
    this.setState({ companyModal: false })
  }

  renderCompanyModal = () => {
    if(this.state.companyModal) {
      return (
        <div className='modal'>
          <div className='container lg'>
            <div className='modal-content'>
              <div className='row'>
                <div className='col-xs-12 end-xs'>
                  <a onClick={this.closeCompanyModal}>Close</a>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12'>
                  <h4>{this.state.coTitle}</h4>
                </div>
                <div className='col-md-4 col-xs-12 relative'>
                  <MapContainer/>
                </div>
                <div className='col-md-8 col-xs-12'>
                  <p className='m-b-0'>{this.state.coSteetOne} {this.state.coSteetTwo? this.state.coSteetTwo : null}</p>
                  <p>{this.state.coCity}, {this.state.coState} {this.state.coZip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className='wrapper'>
        {this.renderCompanyModal()}
        <div className='container full'>
          <div className='pad-container'>
            <div className='row middle-xs'>
              {
                this.state.companies.map((company) => {
                  return (
                    <div className='col-md-3 col-xs-12' key={company.id}>
                      <Company
                        logo={company.logo}
                        title={company.title}
                        city={company.city}
                        state={company.state}
                        coOnClick={ () => {this.coOnClick(company)} } />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Body;
