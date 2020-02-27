import React from 'react';

const displayBooks = ({book}) => {
    return (
        <div className='book'>
            <ul>
                <li>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title}></img>
                    <h2>{book.volumeInfo.title}</h2>
                    <p>{book.volumeInfo.subtitle}</p>
                    <p>{book.volumeInfo.authors}</p>
                </li>
            </ul>
        </div>
    )
}

export default displayBooks;