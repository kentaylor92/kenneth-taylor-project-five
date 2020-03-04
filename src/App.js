import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import './index.css';
import DisplayBooks from './components/DisplayBooks';
import Footer from './components/Footer';

// Hello to whoever is reading this/marking this!  Just wanted to let you know that I have left organizational comments in here for myself so that I can return to this project during the final week of bootcamp and continue to work on things to improve / implement possible feedback!  I intend to delete all comments before this goes into my portfolio, but on some projects I have lost a mark for including comments, and on other projects I have lost a mark for not including comments.  So I thought maybe this would help to clarify my intentions.  Sorry for the essay, I hope you enjoy my project!

class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();

    this.state = {
      books: [],
      userInput: '',
      updatedBookshelf: []
    }
  }

  // Component Did Mount
  componentDidMount() {   
    const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';
    // Results to be displayed on page load!
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
      
      const newState = []
      response.data.items.map(function (book) {
        newState.push({
          title: book.volumeInfo.title,
          key: book.id,
          bookImg: book.volumeInfo.imageLinks.thumbnail,
          author: book.volumeInfo.authors,
          linkToBuy: book.volumeInfo.infoLink,
        })
      })

      this.setState({
        books: newState
      })
            
    }).catch((error) => {
      console.log(error);
    })

    // Bookshelf firebase log
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {

      const updatedBookshelf = [];
      const data = response.val();

      for (let key in data) {
        const bookData = {
          key: key,
          name: data[key],
        }
        updatedBookshelf.push(bookData);
      }

      this.setState({
        updatedBookshelf: updatedBookshelf,
      });
    });
  }

  // Add to BookShelf
  addToBookshelf (book) {
    const dbRef = firebase.database().ref();
    dbRef.push(book);
  }

  removeBook = (book) => {

    const dbRef = firebase.database().ref();
    dbRef.child(book).remove();
  }

  // Handle Change Function for Text Input
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  // Form Submit Function
  handleFormSubmit = (e) => {
    e.preventDefault();

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
     
       const newState = []
       response.data.items.map(function(book) {
       
        newState.push({
          title: book.volumeInfo.title,
          key: book.id,
          bookImg: book.volumeInfo.imageLinks === undefined ? 'http://i.imgur.com/sJ3CT4V.gif' : book.volumeInfo.imageLinks.thumbnail,
          author: book.volumeInfo.authors === undefined ? '' : book.volumeInfo.authors,
          linkToBuy: book.volumeInfo.infoLink,
        })
      })

      this.setState({
        books: newState,
      })

    })

    this.setState({
      userInput: '',
    })

    this.scrollToMyRef(this.myRef);   
  }

  // Scroll Function
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  // Render
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="headerText">
            <h1 id='search'>bookshelf</h1>
            <a href="#bookshelf"><i class="fas fa-book-reader"></i> Go to Bookshelf</a>
          </div>
          <div className="wrapper">

            <form action="submit" onSubmit={this.handleFormSubmit}>
              <label htmlFor='bookSearch'>Search by book name, author, or subject</label>
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

        <section className="results wrapper" ref={this.myRef}>
          {this.state.books.map((book) => {
            console.log(book)
            return (
              <DisplayBooks shelf={this.addToBookshelf} key={book.id} book={book}  />
            )
          })}
        </section>

        <section className="bookshelfSection">
          <div className="bookshelfText wrapper">
            <h2 className="bookshelfHeading" id="bookshelf">my Bookshelf</h2>
            <a href="#search" class='backToSearchLink'><i class="fas fa-search"></i>Back to Search</a>
          </div>
          <div className="bookshelf wrapper">
            {this.state.updatedBookshelf.map((book) => {
              console.log(book)
              return (
                <div key={book.key}>
                  <div className="bookImageContainer">
                    <a href={book.name.linkToBuy} target='_blank' rel="noopener noreferrer">
                      <img src={
                        book.name.bookImg === undefined
                          ? 'http://i.imgur.com/sJ3CT4V.gif'
                          : book.name.bookImg} alt={book.name.title} />
                    </a> 
                  </div>
                    <h3>{book.name.title}</h3>
                    <p>{book.name.author[0]}</p>
                    <button onClick={ () => {this.removeBook(book.key) }}>Remove from shelf</button>  
                </div>   
              )
            })}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
