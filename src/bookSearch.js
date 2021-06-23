import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './bookGrid';
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';

class BookSearch extends Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    search = (query) => {
        BooksAPI.search(query).then((books) => {
            console.log(books)
            if(Array.isArray(books)){
                this.setState(() => ({
                    books
                }))
            }
        })
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        if (query !== '') {
            this.search(query)
        }
        else {
            this.setState(() => ({
                books: []
            }))
        }
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query, books } = this.state
        const { onShelfChange } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => { this.updateQuery(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookGrid books={books} onShelfChange={onShelfChange}></BookGrid>
                </div>
            </div>
        )
    }
}

export default BookSearch