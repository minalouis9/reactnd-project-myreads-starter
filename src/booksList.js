import React, {Component} from 'react'
import BookShelf from './bookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class BooksList extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      onShelfChange: PropTypes.func.isRequired
    }
  
    render() {
      const { books, onShelfChange } = this.props
  
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelfName={'Currently Reading'} books={books.filter((b) => { return b.shelf === 'currentlyReading' })} onShelfChange={onShelfChange}></BookShelf>
              <BookShelf shelfName={'Want to Read'} books={books.filter((b) => { return b.shelf === 'wantToRead' })} onShelfChange={onShelfChange}></BookShelf>
              <BookShelf shelfName={'Read'} books={books.filter((b) => { return b.shelf === 'read' })} onShelfChange={onShelfChange}></BookShelf>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' className="open-search">Open Search</Link>
          </div>
        </div>
      )
    }
  }
  
  export default BooksList