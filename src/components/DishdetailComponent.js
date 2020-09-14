import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';  //CardImgOverlay, 
import { Link } from 'react-router-dom';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            comments: null
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
                        {/* <div className="col-12 col-md-5 m-1"> */}
                            {/* <RenderDish dish={props.dish} /> */}
                            {this.renderDishDetail(this.props.selectedDish)}
                        {/* </div> */}
                        {/* <div className="col-12 col-md-5 m-1"> */}
                            {/* <RenderComments comments={props.comments} /> */}
                            {this.renderComments(this.props.comments)}
                        {/* </div> */}
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;