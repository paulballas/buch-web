import React from 'react'
import axios from 'axios'
import Header from './Header'
import Company from './Company'
import Modal from './Modal'

class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      companyCount: 0,
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
      multi: false,
      backspaceRemoves: true,
      value: '',
      tapRoom: false
    }
  }

  renderCompanies = () => {
    if(this.state.tapRoom) {
      let filterTap = this.state.companies.filter((company) => {
        return company.tap_room === true
      })
      return (
        filterTap.map((company) => {
            return (
              <div className='col-md-3 col-xs-12' key={company.id}>
                <Company
                  logo={company.logo}
                  title={company.title}
                  city={company.city}
                  state={company.state}
                  tapRoom={company.tap_room}
                  showCoModal={ () => {this.showCoModal(company)} } />
              </div>
            );
          })
      )

    } else {
      return (
        this.state.companies.map((company) => {
            return (
              <div className='col-md-3 col-xs-12' key={company.id}>
                <Company
                  logo={company.logo}
                  title={company.title}
                  city={company.city}
                  state={company.state}
                  tapRoom={company.tap_room}
                  showCoModal={ () => {this.showCoModal(company)} } />
              </div>
            );
          })
      )
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/companies.json')
    .then(response => {
      this.setState({companies: response.data})
    })
    .catch(error => console.log(error))
  }

  showCoModal = (co) => {
    if(co){
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
    else { return null }
  }

  closeCompanyModal = () => {
    this.setState({
      companyModal: false,
      value: null
    })
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
          url={this.state.coUrl} />
      )
    } else { return null }
  }

  onSearchChange = (value) => {
		this.setState({ value: value });
    this.showCoModal(value)
	}

  getCompanies = (input, callback) => {
    const newArray = this.state.companies.map(co => {
      let search = {};
      search['id'] = co.id
      search['title'] = co.title
      search['addressOne'] = co.addressOne
      search['addressTwo'] = co.addressTwo
      search['city'] = co.city
      search['state'] = co.state
      search['zip'] = co.zip
      search['coordinates'] = co.coordinates
      search['tap_room'] = co.tap_room
      search['ur'] = co.url
      return search;
    })
    callback(null, {
      options: newArray
    });
  }

  filterTapRoom = () => {
    if(!this.state.tapRoom) {
      this.setState({ tapRoom: true })
    } else {
      this.setState({ tapRoom: false })
    }
  }

  logMe = (data) => {
    alert(data)
  }

  render() {
    return (
      <div className='wrapper'>
        {this.renderCompanyModal()}
        <Header
          onSearchChange={ (value) => {this.onSearchChange(value)} }
          companiesList={this.getCompanies}
          value={this.state.value}
          />
        <div className='container full'>
          <div className='pad-container'>
            <div className='row middle-xs'>
              <div className='col-md-4 col-xs-12'>
                <input className='w-100' type='text' placeholder='Location...' />
              </div>
              <div className='col-md-4 col-xs-12'>
                <div className='flex middle'>
                  <p className='small m-b-0'>Tap Room</p>
                  <label className='switch'>
                    <input type='checkbox' onClick={this.filterTapRoom} />
                    <span className='slider round'></span>
                  </label>
                </div>
              </div>
            </div>
            <div className='space-3'/>
            <div className='row middle-xs'>
              { this.renderCompanies() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Body;
