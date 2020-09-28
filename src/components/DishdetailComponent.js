import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({comments, postComment, dishId}) {
    console.log('comments');
    console.log(comments);
    console.log('postComment function');
    console.log(postComment);
    console.log('dishId');
    console.log(dishId);
    if (comments != null) {
        return(
        <div>
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
            <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
        </div>
        );
    }
    else {
        return(<div></div>);
    }
}

const DishDetail = (props) => {
console.log('DishDetail props');
console.log(props);
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
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
    
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false //,
            // dishId: this.props.dishId,
            // dish: this.props.dish,
            // comments: this.props.comments
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
        //this.toggleModal();
        // alert("Current values are: " + JSON.stringify(values));
        console.log("Current values are: " + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // this.setState({
        //     dishId: this.props.dishId,
        //     dish: this.props.dish,
        //     comments: this.props.comments
        // });
        // console.log('this.state');
        // console.log(this.state);
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
                            <Col>
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Control.select model=".rating" className="form-control"name="rating">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Control.textarea model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows="6"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="bg-primary" onClick={this.toggleModal}>
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        )
    }
}

export default DishDetail;