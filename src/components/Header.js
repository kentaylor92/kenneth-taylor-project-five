// import React, { Component } from 'react';
// import axios from 'axios';

// class Header extends Component {
//     constructor() {
//         super();

//         this.state = {
//             books: [],
//             userInput: '',
//         }
//     }

//     handleChange = (e) => {
//         this.setState({
//             userInput: e.target.value,

//         })
//     }

//     handleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log('The following text was submitted!', + this.state.value);

//         const apiKey = 'AIzaSyBN0p9j4hgZ700Jnyt2zz9QwMx9BIdcjW4';

//         axios({
//             url: 'https://www.googleapis.com/books/v1/volumes',
//             method: 'GET',
//             responseType: 'json',
//             params: {
//                 key: apiKey,
//                 q: this.state.userInput,
//                 startIndex: 0,
//                 maxResults: 16,

//             }
//         }).then((response) => {
//             console.log(response.data.items);

//             this.setState({
//                 books: response.data.items,
//             })
//         })

//         this.setState({
//             userInput: '',
//         })
//     }
//     render() {
//         return (
//             <header className="App-header">
//                 <h1>Book Search App</h1>
//                 <div className="wrapper">
//                     <form action="submit" onSubmit={this.handleFormSubmit}>
//                         <label htmlFor='bookSearch'>Search by book name, author, or subject.</label>
//                         <input
//                             type='text'
//                             id='bookSearch'
//                             onChange={this.handleChange}
//                             value={this.state.userInput}
//                             placeholder='Search by book name, author, or subject.'
//                         />
//                         <button type='submit'>Search for books</button>

//                     </form>
//                 </div>
//             </header>
//         )
//     }
// }

// export default Header;