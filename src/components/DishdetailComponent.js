import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';  //CardImgOverlay, 
import { Link } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            comments: COMMENTS,
            dishComments: []
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

    renderComments(comments) {
        if (comments != null) {
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
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }

    render() {
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
                </div>
            );
        }
    }
}

export default DishDetail;