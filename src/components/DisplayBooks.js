import React from 'react';

function displayBooks ({book}) {  
        return (
            <div className='book'>    
                <a href={book.volumeInfo.infoLink} target='_blank' rel="noopener noreferrer">
                    <img src={
                        book.volumeInfo.imageLinks === undefined
                        ? 'http://i.imgur.com/sJ3CT4V.gif'
                        : book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                </a>
                <h2>{book.volumeInfo.title}</h2>
                <p>{
                book.volumeInfo.authors === undefined
                ? ''
                : book.volumeInfo.authors[0]}</p>
                <div className="addToBookshelf">
                    <button>Add to Bookshelf</button>       
                </div>
            </div>
        )
}

export default displayBooks;