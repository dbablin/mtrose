import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderRoom({room}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={room.image} alt={room.name} />
                <CardBody>
                    <CardText>
                        <p>Price: ${room.cost} per night</p>
                        <p>{room.description}</p>
                        <Button color="success"><Link style={{color: '#fff'}} to="/booking">Reserve Today</Link></Button>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
} 

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Reviews &amp; comments</h4>
                { 
                    comments.map(comment => 
                        <p key={comment.id}>
                            <div>
                            "{comment.text}"
                            </div>
                            <small>
                            {comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </small>
                        </p>
                    )
                }
            </div>
        );
    }
    return (
        <div />
    );
}

function RoomInfo(props) {
    if (props.room) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/rooms">Room Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.room.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.room.name}</h2>
                    </div>
                </div>
                <div className="row">
                    <RenderRoom room={props.room} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } 
    return <div />;        
}

export default RoomInfo;
