import React from 'react';

function displayBooks ({book}) {  
        return (
            <div className='book'>
                <ul>
                    <li>
                        <img src={
                            book.volumeInfo.imageLinks === undefined
                            ? 'http://i.imgur.com/sJ3CT4V.gif'
                            : book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        <h2>{book.volumeInfo.title}</h2>
                        {/* <p>{book.volumeInfo.subtitle}</p> */}
                        <p>{book.volumeInfo.authors}</p>
                    </li>
                </ul>
            </div>
        )
}

export default displayBooks;