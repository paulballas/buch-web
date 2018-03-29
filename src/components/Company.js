import React from 'react';

class Company extends React.Component {
  render() {
    return (
      <a className='co-container' onClick={this.props.showCoModal}>
        <img src={this.props.logo} className='co-logo' alt={this.props.title} />
        <p className='small'>{this.props.title}</p>
        <h5 className='m-b-0'>{this.props.city}, {this.props.state}</h5>
        <p className='small m-b-0'><b>{this.props.tapRoom? 'Tap Room' : null}</b></p>
      </a>
    );
  }
}

export default Company;
