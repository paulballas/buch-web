import React from 'react'
import axios from 'axios'
import Company from './Company'
import Modal from './Modal'
import Select from 'react-select';
import PropTypes from 'prop-types';

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
      multi: false,
      backspaceRemoves: true,
      value: ''
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

  onSearchChange = (value) => {
		this.setState({ value: value });
	}

  toggleBackspaceRemoves = () => {
		this.setState({ backspaceRemoves: !this.state.backspaceRemoves });
	}

  getCompanies = (input, callback) => {
    const newArray = this.state.companies.map(co => {
      let search = {};
      search['id'] = co.id
      search['title'] = co.title
      return search;
    })
    callback(null, {
      options: newArray
    });
    console.log(newArray);
  }

  openCompany (value, event) {
		window.open(value.html_url);
	}

  gotoUser (value, event) {
		alert(value.logo);
	}

  render() {
    const AsyncComponent = Select.Async
    return (
      <div className='wrapper'>
        {this.renderCompanyModal()}
        <div className='container full'>
          <div className='pad-container'>
            <div className='row middle-xs'>
              <div className='col-md-5 col-xs-12'>
                <AsyncComponent
                  name='form-field-name'
                  placeholder={'Search...'}
                  value={this.state.value}
                  onChange={this.onSearchChange}
                  onValueClick={this.openCompany}
                  valueKey="id"
                  labelKey="title"
                  loadOptions={this.getCompanies}
                  backspaceRemoves={this.state.backspaceRemoves}
                />
              </div>
              <div className='col-md-4 col-xs-12'>
                <input className='w-100' type='text' placeholder='Location...' />
              </div>
              <div className='col-md-3 col-xs-12'>
                <select placeholder='Filter...' className='w-100'>
                  <option>Filter...</option>
                  <option>A</option>
                  <option>B</option>
                </select>
              </div>
            </div>
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
