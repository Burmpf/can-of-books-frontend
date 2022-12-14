import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

class BookFormModal extends React.Component {
  

    handleSubmit =(e) =>{
        e.preventDefault();
        let newBook = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value
          }
          console.log(newBook);
        this.props.handleSubmitBook(newBook);
    }

    render() {
        return (
            <Modal
                show={this.props.isModal}
                onHide={this.props.onHide}
                className='add-book-modal'
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className='newBookTitle' controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='input' placeholder='Enter book title'></Form.Control>
                    </Form.Group>
                    <Form.Group className='newBookDescription' controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='textarea' placeholder='Enter book description'></Form.Control>
                    </Form.Group>
                    <Form.Group className='newBookStatus' controlId="status">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type='input' placeholder='How many stars? (1 to 5)'></Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit New Book
                    </Button>
                </Form>
            </Modal>
        )
    }
}

export default BookFormModal