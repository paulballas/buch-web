import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import 'react-select/dist/react-select.css';

class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      backspaceRemoves: true,
      value: ''
    }
  }

  onChange (value) {
		alert('hello')
	}

	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.items };
		});
	}

	gotoUser (value, event) {
		window.open(value.html_url);
	}

  toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}

  render() {
    const AsyncComponent = Select.Async
		return (
			<div className="section">
				<AsyncComponent
          value={this.state.value}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
          valueKey="id"
          labelKey="login"
          loadOptions={this.getUsers}
          backspaceRemoves={this.state.backspaceRemoves} />
			</div>
		);
  }
}

export default SearchBox;
