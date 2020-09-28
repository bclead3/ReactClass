import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; // CardText, CardBody, 
import { Link } from 'react-router-dom';
import { Comments } from '../redux/comments';
import { COMMENTS } from '../shared/comments';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Loading } from './LoadingComponent'

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            dish: null,
            dishId: null,
            comments: null,
            addComment: null
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
        console.log('onDishSelect dish');
        console.log(dish);
        console.log('Comments object');
        console.log(Comments);
        var comments=this.props.comments.filter((comment) => comment.dishId === parseInt(dish.id,10))
        console.log('onDishSelect comments');
        console.log(comments);
        this.setState({ selectedDish: dish });
        this.setState({ dish: dish });
        this.setState({ dishId: dish.id });
        this.setState({ comments: comments });
    }

    renderDish(dish, comments, addComment) {
        console.log('renderDish props');
        console.log(this.props);
        console.log('renderDish state');
        console.log(this.state);
        if (dish == null || dish === undefined) {
            if (this.props.dish != null && this.props.dish !== undefined) {
                dish = this.props.dish;
                console.log('found dish through this.props.dish');
            }   
            else if (this.props.dishId != null) {
                dish = this.props.dishes.dishes.filter((dish) => dish.id === parseInt(this.props.dishId,10));
                console.log('found dish through filtering by this.props.dishId' + this.props.dishId);
            }
            else if (this.props.comments != null && this.props.comments.length > 20) {
                var comment_arr = this.props.comments;
                var comment = comment_arr[comment_arr.length -1];
                var dishId = comment.dishId
                dish = this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId,10));
                console.log('found dish by selecting the last dishId in props.dishes.dishes array');
            }
            console.log('in render dish with dish being undefined');
            console.log(dish);
        }
        if (dish != null && comments == null || comments === undefined) {
            comments = this.props.comments.filter((comment) => comment.dishId === parseInt(dish.id,10));
            console.log('in renderDish with null for comments... this is what I retrieved');
            console.log(comments);
        }
        console.log('in renderDish... dish');
        console.log(dish);
        console.log('comments');
        console.log(comments);
        console.log('addComment');
        console.log(addComment);
        if (this.props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else if (dish != null)
            return(
                <DishDetail dish={dish} comments={comments} addComment={addComment} />
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const menu = this.props.dishes.dishes.map((dish) => {
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
                     {this.renderDish(this.state.dish, this.state.comments, this.props.addComment)}
                </div>
            </div>
        );
    }
}

export default Menu;