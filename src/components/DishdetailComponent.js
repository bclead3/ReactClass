import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';  //CardImgOverlay, 


class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
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
    }

    renderComments(comments) {
        if (comments != null) {
            return(
                <div className='col-12 col-md-5 m1'>
                    <h4>Comments</h4>
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
                </div>
            );
        }
    }

    render() {
        const selectedDish = this.props.selectedDish;
        if (selectedDish == null) {
            return(<div></div>);
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDishDetail(selectedDish)}
                        {this.renderComments(selectedDish.comments)}
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;