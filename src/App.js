import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import './index.css';
// import Header from './components/Header';
import DisplayBooks from './components/DisplayBooks';
import Footer from './components/Footer';


class App extends Component {
  constructor() {
    super();

    this.myRef = React.createRef();

    this.state = {
      books: [],
      userInput: '',
      bookshelf: [],
    }
  }

  // Component Did Mount
  componentDidMount() {   
    // Initial API Call for PageLoad
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
      // console.log(response.data.items);
      this.setState({
        books: response.data.items,
      })
    }).catch((error) => {
      // console.log(error);
    })
  }


  // Handle Change Function
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,  
    })
  }

  
  // Form Submit Function
  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('The following text was submitted!', + this.state.value);

    const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';

    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      method: 'GET',
      responseType: 'json',
      params: {
        key: apiKey,
        q: this.state.userInput,
        startIndex: 0,
        maxResults: 32,
        
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

    this.scrollToMyRef(this.myRef);

    
  }

  // Scroll Function
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
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
              <button type='submit' ref={this.myRef}>Search for books</button>
              
            </form>
          </div>
        </header>
        {/* Results Section */}
        <section className="results wrapper" ref={this.myRef}>
          {this.state.books.map((book, index) => {
            return (
              <DisplayBooks key={index} book={book}  />
            )
          })}
        </section>
        {/* Footer section */}
        <Footer />
      </div>
    );
  }
}

export default App;
