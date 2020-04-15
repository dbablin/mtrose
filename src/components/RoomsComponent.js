import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle  } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDirectoryItem({room}) {
    return (
        <Card>
            <Link to={`/rooms/${room.id}`}>
                <CardImg width="100%" src={room.image} alt={room.name} />
                <CardImgOverlay>
                    <CardTitle>{room.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Rooms(props) {
    const directory = props.rooms.map(room => {
        return (
            <div key={room.id} className="col-md-5 col-lg m-1">
                <RenderDirectoryItem room={room} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <br />
                    <h2>Room Directory</h2>
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
            <br />
        </div>
    );
}

export default Rooms;