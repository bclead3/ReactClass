import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            comments: COMMENTS,
            dishComments: [],
            isModalOpen: false,
            rating: 5,
            username: '',
            comment: '',
            touched: {
                rating: false,
                username: false,
                comment: false
            }
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    handleInputChange() {
        // const target = event.target;
        const value = this.username.value;

        this.setState({
          username: value
        });
    }

    handleSubmit(event) {
        const log_string = "{rating: '" +
        this.rating.value +
        "', username: '" +
        this.username.value +
        "', comment: '" +
        this.comment.value +
        "'}"

        this.toggleModal();
        alert( log_string );
        console.log(log_string);
        event.preventDefault();
    }

    render() {
        const errors = this.validate(this.state.username);

        if (this.props.selectedDish == null) {
            return(<div></div>);
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.selectedDish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.selectedDish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {this.renderDishDetail(this.props.selectedDish)}
                        {this.renderComments(this.state.comments)}
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit a Comment</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input type="select" id="rating" name="rating"
                                        innerRef={(input) => this.rating = input } >
                                            <option>5</option>
                                            <option>4</option>
                                            <option>3</option>
                                            <option>2</option>
                                            <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text"
                                        id="username"
                                        name="username"
                                        placeholder="User Name"
                                        value={this.state.username}
                                        valid={errors.username === ''}
                                        invalid={errors.username !== ''}
                                        onBlur={this.handleBlur('username')}
                                        onChange={this.handleInputChange}
                                        innerRef={(input) => this.username = input}
                                        />
                                    <FormFeedback>{errors.username}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Input type="textarea" id="comment" name="comment"
                                    innerRef={(input) => this.comment = input}  />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

    renderComments(comments) {
        if (comments != null) {
            // this.setState({dishComments: []});
            this.state.dishComments = [];
            comments.map(comment => {
                if (comment.dishId === this.props.selectedDish.id) {
                    this.state.dishComments.push(comment)
                }
            });
            return(
                <div className='col-12 col-md-5 m1'>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {this.state.dishComments.map((comment) => {
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} ,
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <Button onClick={this.toggleModal} className='bg-white text-muted'><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }

    renderDishDetail(selectedDish) {
        if (selectedDish != null) {
            return(
                <div className='col-12 col-md-5 m1'>
                    <Card>
                        <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                        <CardBody>
                            <CardTitle>{selectedDish.name}</CardTitle>
                            <CardText>{selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return(<div/>);
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    validate(username) {
        const errors = {
            username: ''
        };

        if (this.state.touched.username && username.length < 3)
            errors.username = 'User Name should be greater than 2 characters';
        else if (this.state.touched.username && username.length > 15)
            errors.username = 'User Name should 15 characters or less';

        return errors;
    }
}

export default DishDetail;