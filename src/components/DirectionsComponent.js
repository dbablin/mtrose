import React, { Component } from 'react';
import { Container } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import { Button } from 'reactstrap';

class Map extends Component {
    static defaultProps = {
        center: {
          lat: 39.316089,
          lng: -119.904114
        },
        zoom: 11
    };
    render() {
        const Marker = ({ text }) => <div>{text}</div>;
        return (
            // Important! Always set the container height explicitly
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBewL1YbnY2S1AMDB2ztPb7FddM_Bd-YCU' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <Marker
                    lat={39.316089}
                    lng={-119.904114}
                    text="Mount Rose B&amp;B!"
                />
            </GoogleMapReact>
        );
    }
}

function Directions(props) {
    return (
        <Container>
            <br />
            <h2>Directions to the Main Lodge</h2>
            <div className="row">
                <div className="col-6">
                    <Button style={{marginBottom: 20, marginTop: 10}} color="info"><a style={{textDecoration: 'none', color: 'white'}} target='_blank' href='https://www.google.com/maps/dir//39.316089,-119.904114/@39.3160931,-119.906308,17z'>Open Google Maps</a></Button>
                    <p><b>Coming from Reno: </b>Take Mount Rose Highway past the ski resort, then take the first right after mile marker 34.</p>
                    <p><b>Coming from South Lake Tahoe: </b>Stay on highway 50 to Carson City, then take a left on highway 28 toward Incline Village. In Incline, turn right to get onto Mount Rose Highway, and stay on it for 12 miles until you reach mile marker 34, where you will take a left.</p>
                </div>
                <div 
                    className="col-6" 
                    style={{ height: 400, width: 400, paddingBottom: 25  }}
                >
                    <Map />
                </div>
            </div>
        </Container>
    );
};

export default Directions;  