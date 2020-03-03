import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import './index.css';
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
      bookSelect: '',
      bookId: '',
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
      // this.setState({
      //   books: response.data.items,

      const newState = []
      response.data.items.map(function (book) {
        // const uniqueId = book.id;
        // console.log(book.id);
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
      // console.log(error);
    })

    // Bookshelf firebase log
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {

      const updatedBookshelf = [];
      const data = response.val();
      // console.log(data)
      
      // for (let key in data) {
      //   updatedBookshelf.push({
      //     ...data[key]
      //   })
      //   // console.log(updatedBookshelf);

      //   // updatedBookshelf.push(data[key]);
      // }

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
    // e.preventDefault();
    // console.log('YOU MADE IT!!');
    // console.log(book)
    // console.log(book.key)
    
    const dbRef = firebase.database().ref();
    // this.setState({ bookSelect: e.target.value })
    dbRef.push(book);
  }

  removeBook = (book) => {

    const dbRef = firebase.database().ref();
    dbRef.child(book).remove();
    // console.log(book);
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
      // console.log(response.data.items);

       const newState = []
       response.data.items.map(function(book) {
        // const uniqueId = book.id;
        // console.log(book.id);
        newState.push({
          title: book.volumeInfo.title,
          key: book.id,
          bookImg: book.volumeInfo.imageLinks === undefined ? 'http://i.imgur.com/sJ3CT4V.gif' : book.volumeInfo.imageLinks.thumbnail,
          author: book.volumeInfo.authors,
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
          {this.state.books.map((book) => {
            console.log(book)
            return (
              <DisplayBooks shelf={this.addToBookshelf} key={book.id} book={book}  />
            )
          })}
        </section>

        <section>
            <h2 className="bookshelfHeading">Bookshelf</h2>
          <div className="bookshelf wrapper">
            {this.state.updatedBookshelf.map((book) => {
              console.log(book)
              return (
              <div key={book.key}>
                  <a href={book.name.linkToBuy} target='_blank' rel="noopener noreferrer">
                    <img src={
                      book.name.bookImg === undefined
                        ? 'http://i.imgur.com/sJ3CT4V.gif'
                        : book.name.bookImg} alt={book.name.title} />
                  </a> 
                  <h3>{book.name.title}</h3>
                  <p>{book.name.author}</p>
                  <button onClick={ () => {this.removeBook(book.key) }}>Remove from shelf</button>  
              </div>
              
              )
            })}
          </div>
        </section>

        {/* Footer section */}
        <Footer />
      </div>
    );
  }
}

export default App;
