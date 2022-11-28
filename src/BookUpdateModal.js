import React from "react";
import { Button, Form, Modal } from 'react-bootstrap';

class BookUpdateModal extends React.Component {


    handleBookSubmit = (e) => {
        e.preventDefault();

        // get the data from the form
        let Book2Update = {
            title: e.target.title.value || this.props.books.title,
            description: e.target.description.value || this.props.books.description,
            status: e.target.status.checked || this.props.books.status,
            _id: this.props.books._id,
            __v: this.props.books.__v
        }
        console.log('updated book: ', Book2Update);
        // call a method the add the cat to the database
        // passed down from parent?
        this.props.updatedBook(Book2Update);
    }


    render() {

        return (
            <>
              <Modal
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Update Book
            </Modal.Title>
          </Modal.Header>
            <Form onSubmit={this.handleBookSubmit}>
              <Modal.Body>
              <Form.Group controlId="title">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={this.props.books.title}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" placeholder={this.props.books.description}/>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder={this.props.books.status}/>
          </Form.Group>
          
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit Updated Book
                </Button>
              </Modal.Footer>
            </Form>
        </Modal>  
            </>
        );
    };

};

export default BookUpdateModal;