import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './BestBooks.css';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
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
          </Carousel.Caption>
        </Carousel.Item>

      );
    });

    /* TODO: render all the books in a Carousel */



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          // <p>Book Carousel coming soon</p>

          <Carousel>
            {booksDisplay}
          </Carousel>
        ) : (
          <h3>No Books Found </h3>
        )}
      </>
    )
  }
}

export default BestBooks;
