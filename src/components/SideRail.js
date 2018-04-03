import React from 'react';

class SideRail extends React.Component {

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
          onClick={this.props.tapRoom}
          className={this.props.tapRoomState? active : base}
          >
            <p className='small m-b-0'>Tap Room</p>
            <div className='circle'></div>
        </div>        
        <div className='sr-section flex middle between filter-section'>
          <p className='small m-b-0'>Available Online</p>
          <div className='circle'></div>
        </div>
      </div>
    );
  }
}

export default SideRail;
