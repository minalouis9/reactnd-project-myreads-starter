import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './bookGrid';
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';

class BookSearch extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchBooks: []
    }

    search = (query) => {
        BooksAPI.search(query).then((searchBooks) => {
            if(Array.isArray(searchBooks)){
                for(const book of this.props.books){
                    for(const searchBook of searchBooks){
                        if(searchBook.id === book.id){
                            searchBook.shelf = book.shelf
                        }
                    }
                }
                this.setState(() => ({
                    searchBooks
                }))
            }else{
                this.setState(() => ({
                    searchBooks: []
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
                searchBooks: []
            }))
        }
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query, searchBooks } = this.state
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
                    <BookGrid books={searchBooks} onShelfChange={onShelfChange}></BookGrid>
                </div>
            </div>
        )
    }
}

export default BookSearch