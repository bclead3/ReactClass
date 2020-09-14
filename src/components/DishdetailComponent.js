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
                <Card>
                    <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                    <CardBody>
                        <CardTitle>{selectedDish.name}</CardTitle>
                        <CardText>{selectedDish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
    }

    renderComments(comments) {
        if (comments != null) {
            return(
                <div>
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
        if (selectedDish === null) {
            return(<div></div>)
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className='col-12 col-md-5 m1'>
                            {this.renderDishDetail(selectedDish)}
                        </div>
                        <div className='col-12 col-md-5 m1'>
                            {this.renderComments(selectedDish.comments)}
                        </div>
                        
                    </div>
                </div>
            )
        }
    }
}

const Detail = ({selectedDish}) => {
    if (selectedDish != null) {
        return(
            <Card>
                <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                <CardBody>
                    <CardTitle>{selectedDish.name}</CardTitle>
                    <CardText>{selectedDish.description}</CardText>
                </CardBody>
            </Card>
        )
    }
    else {
        return(
            <div></div>
        )
    }
};

const Comment = ({commentDish}) => {
    if (commentDish!=null){
        return(<ul>{commentDish.comments.map((item, index) => {return(<li key={item.id}><div>{item.comment}</div><div>{'--' + item.author }
        &nbsp;&nbsp;&nbsp;{
            new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
            .format(new Date(Date.parse(item.date)))
        }</div></li>)})}</ul>)
    }
    else{
        return(<div></div>)
    }
};

export default DishDetail;