import React, { Component } from 'react';
//componenets
import Home from './HomeComponent'; 
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
//components end
//shared files
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
    };
  }



  render() {

    const HomePage=()=>{
        return(
            <Home />
        );
    }

    return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        */}
            <Switch>
                <Route path="/home" component= {HomePage}/>
                <Route path="/menu" component= {()=><Menu dishes={this.state.dishes} />}/>
                <Redirect to="/home"/>
            </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;