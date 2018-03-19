import React from 'react';
import axios from 'axios'
import Company from './Company'
import Modal from './Modal'

class Body extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      companyModal: false,
      coId: 0,
      coTitle: '',
      coSteetOne: '',
      coSteetTwo: '',
      coCity: '',
      coState: '',
      coZip: '',
      coCoordinates: [],
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
      coId: co.id,
      coTitle: co.title,
      coSteetOne: co.addressOne,
      coSteetTwo: co.addressTwo,
      coCity: co.city,
      coState: co.state,
      coZip: co.zip,
      coCoordinates: co.coordinates
    })
  }

  closeCompanyModal = () => {
    this.setState({ companyModal: false })
  }

  renderCompanyModal = () => {
    if(this.state.companyModal) {
      return (
        <Modal
          id={this.state.coId}
          title={this.state.coTitle}
          coordinates={this.state.coCoordinates}
          addressOne={this.state.coSteetOne}
          addressTwo={this.state.coSteetTwo}
          city={this.state.coCity}
          state={this.state.coState}
          zip={this.state.coZip}
          closeModal={this.closeCompanyModal}
           />
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
