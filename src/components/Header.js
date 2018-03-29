import React from 'react';
import Select from 'react-select';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      multi: false,
      backspaceRemoves: true
    }
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

  handleSearchChange = (value) => {
    this.setState({value: value})
    this.props.onSearchChange(value)
  }

  toggleBackspaceRemoves = () => {
		this.setState({ backspaceRemoves: !this.state.backspaceRemoves });
	}

  render() {
    const AsyncComponent = Select.Async
    return (
      <header>
        <div className='container'>
          <div className='row middle-xs'>
            <div className='col-md-2 col-xs-12'>
              <p className='small m-b-0'>Kombucha DB</p>
            </div>
            <div className='col-md-8 col-xs-12'>
              <div className='form-item m-b-0'>
                <AsyncComponent
                  name='form-field-name'
                  placeholder={'Search...'}
                  value={this.props.value}
                  onChange={this.handleSearchChange}
                  onValueClick={this.openCompany}
                  valueKey='id'
                  labelKey='title'
                  loadOptions={this.props.companiesList}
                  backspaceRemoves={this.state.backspaceRemoves}
                />
              </div>
            </div>
            <div className='col-md-2 col-xs-12'>
              <nav className='flex middle between'>
                <a className='m-b-0'>About</a>
                <a className='m-b-0'>Contact</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
