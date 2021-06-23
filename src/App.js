import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookSearch from './bookSearch'

import BooksList from './booksList'
class BooksApp extends React.Component {
  state = {
    books: [] // will save all the books on the shelf
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={this.state.books} onShelfChange={this.updateBook}></BooksList>
        )} />
        <Route exact path='/search' render={() => (
          <BookSearch onShelfChange={this.updateBook}></BookSearch>
        )} />
      </div>
    )
  }
}

export default BooksApp
