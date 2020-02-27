import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import DisplayBooks from './components/DisplayBooks';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';

    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      method: 'GET',
      responseType: 'json',
      params: {
        key: apiKey,
        q: 'react',
        startIndex: 0,
        maxResults: 16,
      }
    }).then((response) => {
      console.log(response);

      this.setState({
        books: response.data.items,
      })
    })
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Book Search App</h1>
          <div className="wrapper">
          </div>
        </header>
        <section className="results wrapper">
          {this.state.books.map((book, index) => {
            return (
              <DisplayBooks key={index} book={book} />
            )
          })}
        </section>
      </div>
    );
  }
}

export default App;
