import React from 'react';

class Company extends React.Component {
  render() {
    return (
      <a className='co-container' onClick={this.props.coOnClick}>
        <img src={this.props.logo} className='co-logo' alt={this.props.title} />
        <p className='small'>{this.props.title}</p>
        <h5 className='m-b-0'>{this.props.city}, {this.props.state}</h5>
      </a>
    );
  }
}

export default Company;
