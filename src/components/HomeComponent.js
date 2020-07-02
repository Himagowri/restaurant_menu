import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle,CardSubtitle, CardImgOverlay} from 'reactstrap';
import { Loading } from './LoadingComponent';
//within the homecomponent we will be recieveing all the three information
//we are passing all the information to the to the rendercard component which has to be implemented
//Rendercard function will recive props from the three div tags
function RenderCard({item,isLoading,errMess}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else
    
        return(
            <Card>
                <CardImg src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>

                </CardBody>
            </Card>
        );
}

function Home(props){
    return (
        <div className="container">
           <div className="row align-items-start">
               <div className="col-12 col-md m-1"> 
               
                   <RenderCard item={props.dish}
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}/> 
               </div>
               <div className="col-12 col-md m-1"> 
                   <RenderCard item={props.promotion}/> 
               </div>
               <div className="col-12 col-md m-1"> 
                   <RenderCard item={props.leader}/> 
               </div>
           </div>
        </div>
    );
}
export default Home;