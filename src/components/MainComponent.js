import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
// import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return(
      <div className="MainApp">
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
        {/* <DishDetail selectedDish={ this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] } />  */}
      </div>
    );
  }
}

export default Main;
