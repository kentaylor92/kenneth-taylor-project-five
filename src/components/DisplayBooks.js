import React from 'react';

function displayBooks ({book, shelf}) {  
        return (
            <div className='book'>    
                <div className='bookImageContainer'>
                    <a href={book.linkToBuy} target='_blank' rel="noopener noreferrer"> 
                        <img src={
                            book.bookImg === undefined
                            ? 'http://i.imgur.com/sJ3CT4V.gif'
                            : book.bookImg} alt={book.title} /> 
                    </a> 
                </div>
                <h2>{book.title}</h2>
                <p>{
                book.author === undefined
                ? ''
                : book.author[0]}</p>
                <div className="addToBookshelf">
                    <button onClick={() => shelf(book)}>Add To Bookshelf</button>       
                </div>
            </div>
        )
}

export default displayBooks;