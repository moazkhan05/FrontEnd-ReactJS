import React , { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem , Button,
    Modal , ModalHeader ,ModalBody ,Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    
    function RenderDish({dish}) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                          <Card>
                              <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                              <CardBody>
                                  <CardTitle>{dish.name}</CardTitle>
                                  <CardText>{dish.description}</CardText>
                              </CardBody>
                          </Card>
                      </FadeTransform>
                </div>
            )
        }

  function RenderComments({comments, postComment, dishId}) {
        // console.log(comments)
        if (comments != null) {

            let list = <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>

            return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {list}
                        </ul>
                        {/* adding comment modal */}
                        <CommentForm 
                              dishId={dishId} 
                              postComment={postComment} 

                          />
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

         if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if (props.dish != null) {
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
                            <RenderComments comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                              />
                            
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
        handleSubmit(values) {
          this.toggleCommentModal();
          this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
          alert( values.rating + " " + values.author + " " +  
                    values.comment + this.props.dishId);
          
        }

        render(){
          return (
             <div>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" 
                                      id="rating"
                                      className="form-control">
                                        <option values='1'>1</option>
										                    <option values='2'>2</option>
										                    <option values='3'>3</option>
										                    <option values='4'>4</option>
										                    <option values='5'>5</option>
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
                                        required: 'Required\n',
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