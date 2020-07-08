import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle ,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody, ModalHeader, FormGroup, Label,Row} from 'reactstrap';
import {Link } from 'react-router-dom';
import { Control, LocalForm,Errors} from 'react-redux-form';
import {Loading } from './LoadingComponent';
import {baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger } from 'react-animation-components';

const minLength = (len) => val => (val) && (val.length >= len);
class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
        //this.handleSubmit=this.toggleModal.bind(this);
        
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        
        this.props.postComment(
          this.props.dishId,
          values.rating,
          values.author,
          values.comment
        );
        
      }
    
        
    
    render()
    {
        console.log("point1");
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) =>this.handleSubmit(values)}>
                            <Row className="form-group m-1">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    
                            </Row>
                            <Row className="form-group m-1">
                                <Label htmlFor="username">Your name</Label>
                                    <Control.text model=".username" id="username" name="username"
                                        className="form-control"
                                        placeholder="username"
                                        validators={{ minLength: minLength(3)}}/>
                                    <Errors 
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: 'Must be greater than 2 characters',
                                            
                                        }}
                                        />
                            </Row>
                            <Row className="form-group m-1">
                                <Label htmlFor="comments">Comments</Label>
                                    <Control.textarea model=".comment" name="comment" id="comment"
                                    className="form-control"
                                    placeholder="type here"/>
                                
                            </Row>
                            <Row className="form-group m-1">
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>  
        );
    }
}          
    
  
function RenderComments({comments,postComment,dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US',{year: 'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                    
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    <Stagger in>
                        <Fade in>
                        {cmnts}
                        </Fade>
                    
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
                
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const DishDetail=(props)=> {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        if (props.dish == null) {
            return (<div></div>)
        }
        
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
                <div className='row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}/>

                    <div></div>
                    
                        
                                                            
                </div>
            </div>
        )
    }
    

export default DishDetail;