import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return(<div/>);
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        return(
            <ul className="list-unstyled">
                {comments.map((comment) => {
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
        );
    }
    else {
        return(<div></div>);
    }
}

class DishDetail extends Component {

    constructor(props) {
        // console.log('props for DishDetail');
        // console.log(props);
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            dish: false,
            comments: []
        }
    }
   
    render(){
        const dish=this.props.selectedDish;
        const comments=this.props.comments;
        if(dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments={comments} />
                            <CommentForm></CommentForm>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render(){
        return (
            <div>
            <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-edit fa-lg"></span>Submit Comment
                                    </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={4}>Rating</Label>
                        </Row>
                        <Row>   
                            <Col>
                                <Control.select model=".rating" className="form-control"name="rating">
                                    <option>5</option>
                                    <option selected>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="yourname" md={4}>Your Name</Label>
                        </Row>
                        <Row>
                            <Col>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label></Row>
                            <Row>
                            <Col>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

export default DishDetail;