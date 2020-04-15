import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCard({item, itemType}) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description} See {itemType} for more info.</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.room} itemType={<Link to={`/rooms`}>Rooms</Link>} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.amenity} itemType={<Link to={`/amenities`}>Amenities</Link>} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.recreationItem} itemType={<Link to={`/recreation`}>Recreation</Link>} />
                </div>
            </div>
        </div>
    );
}

export default Home;