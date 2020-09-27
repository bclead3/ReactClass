import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; // CardText, CardBody, 
import { Link } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            comments: null
        }
    }

    renderMenuItem({dish, onClick}) {
        return (
            <Card>
                <Link to={`/menu/${dish.id}`} >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    onDishSelect(dish) {
        // console.log('onDishSelect dish');
        // console.log(dish);
        var comments=COMMENTS.filter((comment) => comment.dishId === parseInt(dish.id,10))
        // console.log('onDishSelect comments');
        // console.log(comments);
        this.setState({ selectedDish: dish });
        this.setState({ comments: comments });
    }

    renderDish(dish, comments) {
        if (dish != null)
            return(
                <DishDetail selectedDish={dish} comments={comments} />
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id}  className="col-12 col-md-5 m-1">
                {/* <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}> */}
                <Card key={dish.id} onClick={() => this.onDishSelect(dish)} >
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                     {this.renderDish(this.state.selectedDish, this.state.comments)}
                </div>
            </div>
        );
    }
}

export default Menu;