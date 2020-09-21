import React, {Component} from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);

    }
      renderDish(dish) {
        
        if (dish!= null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
        
    }
    componentDidMount(){
        
    }
    renderComments(dish) {
    if (dish != null) {
      const CommentList = dish.comments.map((element) => {
        return (
          <div key={element.id}>
            <ul className="list-unstyled">
              <li>{element.comment}</li>
              <li>
                --{element.author},{" "}
                {
                  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                                              .format(new Date(Date.parse(element.date)))
                                                              }
                
              </li>
            </ul>
          </div>
        );
      });
      return (
        <div>
          <h4>Comments</h4>
          {CommentList}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
    render(){
        
        return(
            <div className="row">    
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>    
              
        );
    }


}
export default DishDetail;