import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './BestBooks.css';
import BookFormModal from './BookFormModal';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModal: false
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
      // axios.post will return the cat that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${SERVER}/book`, aBook);
      console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }


  handleOpenModal = (e) => {
    e.preventDefault();
    this.setState({
      isModal: true
    });
  }

  handleCloseModal = (e) => {
    e.preventDefault();
    this.setState({
      isModal: false
    });
  }


  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    }
    this.postBook(newBook);
    this.handleCloseModal(e);
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
              onClick={this.handleOpenFormModal}
              className='add-book-button'
            >Add Book</Button>

            <BookFormModal
              isModal={this.state.isModal}
              handleBookSubmit={this.handleBookSubmit}
            >

            </BookFormModal>
          </Container>
        ) : (
          <h3>No Books Found </h3>
        )}
      </>
    )
  }
}

export default BestBooks;
