import React from 'react';

class Company extends React.Component {
  render() {
    return (
      <a className='co-container' onClick={this.props.showCoModal}>
        <img
          src={'https://s3-us-west-2.amazonaws.com/bucha-co-images/' + this.props.logo + '.png'}
          className='co-logo'
          alt={this.props.title} />
        <p className='small'>{this.props.title}</p>
        <h5 className='m-b-half'>{this.props.city}, {this.props.state}</h5>
        <p className='small m-b-half'><b>{this.props.tap_room? 'Tap Room' : null}</b></p>
        <p className='small m-b-0'><b>{this.props.online? 'Available Online' : null}</b></p>
      </a>
    );
  }
}

export default Company;
