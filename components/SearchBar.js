import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {
  static propTypes = {
    onTermChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className='search'>
        <input onChange={e => this.onInputChange(e.target.value)}></input>
      </div>
    );
  }
}
