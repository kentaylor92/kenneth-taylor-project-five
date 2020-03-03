import React from 'react';




function displayBooks ({book, shelf}) {  
    
    
            console.log(book.bookImg);
        return (
            <div className='book'>    
                 <a href={book.linkToBuy} target='_blank' rel="noopener noreferrer"> 
                    <img src={
                        book.bookImg === undefined
                        ? 'http://i.imgur.com/sJ3CT4V.gif'
                        : book.bookImg} alt={book.title} /> 
                </a> 
                <h2>{book.title}</h2>
                <p>{
                book.author === undefined
                ? ''
                : book.author[0]}</p>
                <div className="addToBookshelf">
                    {/* <button onClick={ (e) => console.log('IT WORKED!')}>Add to Bookshelf</button>        */}
                    {/* <button onClick={shelf}>Add to Bookshelf</button> */}
                    <button onClick={() => shelf(book)}>Add To Bookshelf</button>       
                </div>
            </div>
        )
}

export default displayBooks;