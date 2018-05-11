import React from 'react';

class SideRail extends React.Component {

  filterCos = (f, v) => {
    this.props.filterCompanies(f, v)
  }

  render() {
    const base = 'sr-section flex middle between filter-section'
    const active = 'active sr-section flex middle between filter-section'
    return (
      <div className='side-rail'>

        <div className='sr-section'>
          <p className='small m-b-0'>Filter Companies</p>
        </div>

        <div className='sr-section flex middle between filter-section'>
          <p className='small m-b-0'>Location</p>
          <div className='circle'></div>
        </div>

        <div
          onClick={() => this.filterCos('tap_room', !this.props.filterState.tap_room)}
          className={this.props.filterState.tap_room? active : base}
          >
            <p className='small m-b-0'>Tap Room</p>
            <div className='circle'></div>
        </div>

        <div
          onClick={() => this.filterCos('online', !this.props.filterState.online)}
          className={this.props.filterState.online? active : base}
          >
            <p className='small m-b-0'>Available Online</p>
            <div className='circle'></div>
        </div>
      </div>
    );
  }
}

export default SideRail;
