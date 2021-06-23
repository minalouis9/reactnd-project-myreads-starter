import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './bookGrid';

class BookShelf extends Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    render() {
        const { shelfName, books, onShelfChange } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <BookGrid books={books} onShelfChange={onShelfChange}></BookGrid>
                </div>
            </div>
        )
    }
}

export default BookShelf