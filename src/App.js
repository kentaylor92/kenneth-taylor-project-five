import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import DisplayBooks from './components/DisplayBooks';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      userInput: '',
    }
  }

  componentDidMount() {
    // const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';

    // axios({
    //   url: 'https://www.googleapis.com/books/v1/volumes',
    //   method: 'GET',
    //   responseType: 'json',
    //   params: {
    //     key: apiKey,
    //     q: this.state.userInput,
    //     startIndex: 0,
    //     maxResults: 16,
    //   }
    // }).then((response) => {
    //   console.log(response.data.items);

    //   this.setState({
    //     books: response.data.items,
    //   })
    // })
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value, 
      
    })
    // console.log(e.target.value);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('The following text was submitted!', + this.state.value);

    const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';

    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      method: 'GET',
      responseType: 'json',
      params: {
        key: apiKey,
        q: this.state.userInput,
        startIndex: 0,
        maxResults: 16,
        
      }
    }).then((response) => {
      console.log(response.data.items);

      this.setState({
        books: response.data.items,
      })
    })

    this.setState({
      userInput: '',
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Book Search App</h1>
          <div className="wrapper">
            <form action="submit" onSubmit={this.handleFormSubmit}>
              <label htmlFor='bookSearch'>Search by book name, author, or subject.</label>
              <input
                type='text'
                id='bookSearch'
                onChange={this.handleChange}
                value={this.state.userInput}
                placeholder='Search by book name, author, or subject.'
              />
              <button type='submit'>Search for books</button>
              
            </form>
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
