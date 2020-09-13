import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';  //CardImgOverlay, 


class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    render() {
        const selectedDish = this.props.selectedDish;
        console.log('selectedDish = ' + selectedDish);
        if (selectedDish === null) {
            console.log('the selectedDish is null');
            return(<div></div>)
        }
        else {
            console.log('The selected dish is not null:' + selectedDish);
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
            )
        }
    }
}

const Detail = ({selectedDish}) => {
    if (selectedDish != null) {
        console.log('selectedDish:'+selectedDish);
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
        return(<ul>{commentDish.comments.map((item, index) => {return(<li key={item.id}><div>{item.comment}</div><div>{'--' + item.author }&nbsp;&nbsp;&nbsp;{ Date(item.date.substring(0,10))}</div></li>)})}</ul>)
    }
    else{
        return(<div></div>)
    }
};

export default DishDetail;