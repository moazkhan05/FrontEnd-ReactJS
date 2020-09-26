import React , { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem , Button,
    Modal , ModalHeader ,ModalBody ,Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from "react-redux-form";


    
    function RenderDish({dish}) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }

    function RenderComments({comments }){
        // console.log(comments)
        if (comments != null) {

            let list = comments.map((comments)=>{

                return(
                    <li key={comments.id} >
                        <div>
                            <p>{comments.comment}</p>
                            <p>--{comments.author},
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                        </div>
                    </li>

                )
            })

            return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {list}
                        </ul>
                        {/* adding comment modal */}
                        <CommentForm />
                    </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    const DishDetail = (props) => {

        if (props.dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} />
                            
                    </div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }

    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length < len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component{
        constructor(props){
          super(props);
          this.state={
            isCommentModalOpen:false
          }
            
          this.toggleCommentModal =this.toggleCommentModal.bind(this);
          this.handleSubmit =this.handleSubmit.bind(this); 
        }
        //constructor ends

        //toggleCommentModal Function
        toggleCommentModal(){
          this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
          });
        }

        //handleSubmit Function
        // handleSubmit(values){
        //   this.toggleCommentModal();
        //   this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // }
        handleSubmit(values) {
          console.log('Current State is: ' + JSON.stringify(values));
          alert('Current State is: ' + JSON.stringify(values));
          this.toggleCommentModal();
        }

        render(){
          return (
             <div>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should have more than 3 Characters',
                                        maxLength: 'Should have 15 or less Characters'
                                    }}
                                />
                                </Col>
                            </Row>
                           
                           <Row className="form-group">
                            <Label htmlFor="message"
                                md={12}>
                                Comment
                            </Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment"  name="comment" 
                                  rows="6"
                                  className="form-control" 
                                />
                            </Col>
                            </Row>
                            
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

          )
        }
    }



export default DishDetail;