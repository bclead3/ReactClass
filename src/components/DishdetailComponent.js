import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    // onDishSelect(dish) {
    //     this.setState({ selectedDish: dish});
    // }

    render() {
        const selectedDish = this.props.selectedDish;
        
        return (
            <div className="container">
                <div className="row">
                    <div className='col-12 col-md-5 m1'>
                        <Detail selectedDish={selectedDish} />
                    </div>
                    <div className='col-12 col-md-5 m1'>
                        <h4>Comments</h4>
                        <Comment commentDish={selectedDish} />
                    </div>
                </div>
            </div>
        );
    }
}

const Detail = ({selectedDish}) => {

    return(
        <Card>
            <CardImg top src={selectedDish.image} alt={selectedDish.name} />
            <CardBody>
                <CardTitle>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
            </CardBody>
        </Card>
    )
};

const Comment = ({commentDish}) => {
    if (commentDish!=null){
        return(<ul>{commentDish.comments.map((item, index) => {return(<li><div>{item.comment}</div><div>{'--' + item.author }&nbsp;&nbsp;&nbsp;{ Date(item.date.substring(0,10))}</div></li>)})}</ul>)
    }
    else{
        return(<div></div>)
    }
};

export default DishDetail;