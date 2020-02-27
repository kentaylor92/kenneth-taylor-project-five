import React, { Component} from 'react';
import DisplayBooks from './components/DisplayBooks';

class Main extends Component {
    render() {
        return (
            {this.state.books.map((book, index) => {
                    return (
                        <DisplayBooks key={index} book={book} />
                    )
            })
            }
        )
    }
}

export default Main;