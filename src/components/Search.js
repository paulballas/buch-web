import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight
} from 'react-instantsearch/dom';
import onClickOutside from "react-onclickoutside";

class Search extends React.Component {

  handleClickOutside = () => {
    console.log('onClickOutside() method called')
  }

  constructor() {
    super()
    this.state = { search: false }
  }

  onClickSearch = (e) => {
    this.setState({ search: true })
  }

  handleClickOutside = evt => {
    this.setState({ search: false })
  };

  render() {
    const Hit = ({hit}) =>
      <a className='search-hit'>
        {hit.title}
        <Highlight attribute='name' hit={hit} />
      </a>

    const SearchResults = () =>
      <div className='search-results-container'>
        <Hits hitComponent={Hit} />
      </div>

    const renderSeach = this.state.search? <SearchResults /> : null
    return (
      <div className='row'>
        <div className='col-md-6 col-xs-12 relative'>
          <InstantSearch
            appId="ONQSYMDJQC"
            apiKey="febef36c32e245661705a503f7206172"
            indexName="buch_db">

            <div className='form-item'>
              <SearchBox translations={{placeholder: 'Find Kombucha...'}} onClick={this.onClickSearch} />
            </div>
            {renderSeach}
          </InstantSearch>
        </div>
        <div className='col-md-3 col-xs-12'>
          <div className='form-item'>
            <input
              type='text'
              placeholder='Location...'
               />
          </div>
        </div>
        <div className='col-md-3 col-xs-12'>
          <div className='form-item'>
            <input
              type='text'
              placeholder='Filters'
               />
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Search);
