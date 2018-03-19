import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <ul>
                <li>Kombucha DB</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
