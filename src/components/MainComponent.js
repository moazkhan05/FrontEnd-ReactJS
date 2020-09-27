import React, { Component } from 'react';
//componenets
import Home from './HomeComponent'; 
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';


//components end
//shared files moves into redux//
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreator';


const mapDispatchToProps = dispatch => ({
 
   addComment: (dishId, rating, author, comment) => 
   dispatch(addComment(dishId, rating, author, comment))
});
 
const mapStateToProps =state =>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  } 
}



class Main extends Component {

 constructor(props) {
    super(props);
 
  }

  render() {

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                addComment={this.props.addComment}
            />
      );
    };

    return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        */}
            <Switch>
               <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/aboutus' component={() => <About leader= {this.props.leaders}></About>} />
          <Route exact path='/contactus' component={Contact} />
          <Redirect to="/home" />
            </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));