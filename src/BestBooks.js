import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './BestBooks.css';
import BookUpdateModal from './BookUpdateModal';


let SERVER = process.env.REACT_APP_SERVER;
console.log(SERVER);

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModal: false,
      openUpdateModal: false
    }
  }


  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }


  postBook = async (aBook) => {
    try {
      // make the request to add a book to my server
      // axios.post will return the book that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${SERVER}/books`, aBook);
      console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }



  deleteBook = async (id) => {
    try {
      let url = `${SERVER}/books/${id._id}`;
      console.log(url);
      // do not assume that axios will return a value
      await axios.delete(url);

      const filteredBooks = this.state.books.filter(book => book._id !== id._id);
      this.setState({ books: filteredBooks });
    } catch (error) {
      console.log(error)
    }
  }



  updateBook = async (book2Update) => {
    try {
      let url = `${SERVER}/books/${book2Update._id}`
      let updatedBookObj = await axios.put(url, book2Update);
      console.log('Is this thing on?')
      //find the book we updated in state and replace with the data we got back from DB
      let updateBooksArray = this.state.books.map(book => {
        return book._id === book2Update._id ?
          updatedBookObj.data : book;
      });

      this.setState({
        books: updateBooksArray
      });

    } catch (error) {
      console.log('error:', error.response.data);
    }
  }




  handleOpenModal = () => {
    this.setState({
      isModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModal: false
    });
  }


  handleOpenUpdateModal = () => {
    this.setState({
      openUpdateModal: true
    })
  }

  handleCloseUpdateModal = () => {
    this.setState({
      openUpdateModal: false
    })
  }


  handleBookSubmit = (newBook) => {

    console.log('hello from book submit');

    this.postBook(newBook);
    this.handleCloseModal();
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBooks();

  }
  render() {

    console.log(this.state.books);

    let booksDisplay = this.state.books.map((book) => {
      return (



        <Carousel.Item key={book._id}>

          <img
            // className="d-block w-100"
            src="https://media.istockphoto.com/id/1306307586/photo/collection-of-old-books-in-library.jpg?s=612x612&w=is&k=20&c=FG6hFKD--ThDTy0xAZlAiFAUAYO5Cyq5TAi9987xjDw="
            alt="First slide"
            width='30%'
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>{book.status}</p>
            <Button type='delete'
              onClick={() => this.deleteBook(book)}
            >Delete Book</Button>
            <Button onClick={this.handleOpenUpdateModal}>Update Book</Button>
            <BookUpdateModal show={this.state.openUpdateModal} onHide={this.handleCloseUpdateModal} updatedBook={this.updatedBook} book={book} />
          </Carousel.Caption>
        </Carousel.Item>

      );
    });

    /* TODO: render all the books in a Carousel */



    return (
      <>

        {this.state.books.length > 0 ? (
          // <p>Book Carousel coming soon</p>
          <Container>
            <Carousel>
              {booksDisplay}
            </Carousel>

            <Button type="button"
              onClick={this.handleOpenModal}
              className='add-book-button'
            >Add Book</Button>

            <BookUpdateModal show={this.state.openModal} onHide={this.handleCloseModal} handleBookSubmit={this.handleBookSubmit} />


          </Container>
        ) : (
          <h3>No Books Found </h3>
        )}
      </>
    )
  }
}

export default BestBooks;
