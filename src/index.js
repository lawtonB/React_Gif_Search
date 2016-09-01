import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../components/SearchBar';
import GifList from '../components/GifList';
const API_KEY = 'dc6zaTOxFJmzC';
//import request from superagent npm module for easy api call
import request from 'superagent';
import './styles/app.css';
import GifModal from '../components/GifModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    };
  }

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal(gif) {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }
  //wrap url in backticks `` to es6 concat a variable
  //use regex /\s/g, '+' to replace space with plus for search
  handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=` + API_KEY;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data });
      console.log(res.body.data);
    });
  }

  render() {
    return (
      <div>
      <SearchBar
      onTermChange={term => this.handleTermChange(term)}/>

      <GifList
      gifs={this.state.gifs}
      onGifSelect={selectedGif => this.openModal(selectedGif)}/>

      <GifModal
      modalIsOpen={this.state.modalIsOpen}
      selectedGif={this.state.selectedGif}
      onRequestClose={ () => this.closeModal() }
      />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
