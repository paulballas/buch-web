import React from 'react'
import axios from 'axios'
import Header from './Header'
import Company from './Company'
import Modal from './Modal'
import SideRail from './SideRail'

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
      value: '',
      hello: '',
      filters: {
      }
    }
  }

  renderCompaniesTwo = () => {
    let filterCompanies = this.state.companies.filter((company) => {
      let shouldRender = true
      Object.keys(this.state.filters).forEach((key) => {
        shouldRender = shouldRender && company[key] === this.state.filters[key]
      })
      return shouldRender
    })

    return (
      filterCompanies.map((company) => {
          return (
            <div className='col-md-3 col-xs-12' key={company.id}>
              <Company
                logo={company.logo}
                title={company.title}
                city={company.city}
                state={company.state}
                tap_room={company.tap_room}
                online={company.online}
                showCoModal={ () => {this.showCoModal(company)} } />
            </div>
          );
        })
    )

  }

  renderCompanies = () => {
    if(this.state.tap_room) {
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
                tap_room={company.tap_room}
                online={company.online}
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
                  tap_room={company.tap_room}
                  online={company.online}
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

  zipSearch = () => {
    const key = 'AIzaSyCm6Kl-VesfrCP-OTIk3y3wt__jfiqlC5s'
    const origins = '80211'
    const destinations = '20171'
    const mapsUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + origins + '&destinations=' + destinations + '&key=' + key
    console.log(mapsUrl);
    axios.get(mapsUrl, {
      mode: 'no-cors'
    })
    .then(response => {
      console.log(response);
    })
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
          tap_room={this.state.coTapRoom}
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
    if(!this.state.tap_room) {
      this.setState({ tap_room: true })
    } else {
      this.setState({ tap_room: false })
    }
  }

  renderFilters = (f, v) => {
    let newFilters = this.state.filters
    if(v === false || v === '' || v === undefined){
      delete newFilters[f]
    } else {
      newFilters[f] = v
    }

    this.setState({filters: newFilters})
  }

  render() {
    return (
      <div>

        {this.renderCompanyModal()}

        <Header
          onSearchChange={ (value) => {this.onSearchChange(value)} }
          companiesList={this.getCompanies}
          value={this.state.value} />

        <div className='flex relaltive m-height-100'>
          <SideRail
            filterState={this.state.filters}
            filterCompanies={(f, v) => this.renderFilters(f, v)}
            />

          <div className='content'>
            <div className='container full'>
              <div className='pad-container-xs'>
                <div className='row middle-xs'>
                  { this.renderCompaniesTwo() }
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default Body;
