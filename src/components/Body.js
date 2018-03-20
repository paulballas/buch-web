import React from 'react';
import axios from 'axios'
import Company from './Company'
import Modal from './Modal'
import SearchBox from './SearchBox'

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
      coTapRoom: '',
      coUrl: '',
      selectedOption: ''
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
      coCoordinates: co.coordinates,
      coTapRoom: co.tap_room,
      coUrl: co.url
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
          tapRoom={this.state.coTapRoom}
          url={this.state.coUrl}
           />
      )
    } else {
      return null
    }
  }

  handleSearchChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const searchOptions =(
      this.state.companies.map((company) => {
        const searchItems = {}
        searchItems['value'] = company.title
        searchItems['label'] = company.title
        return searchItems
      })
    )
    console.log(searchOptions);
    return (
      <div className='wrapper'>
        {this.renderCompanyModal()}
        <div className='container full'>
          <div className='pad-container'>
            <SearchBox />
            <div className='space-3'/>
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
