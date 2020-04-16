import React, { Component } from 'react';
import Rooms from './RoomsComponent';
import RoomInfo from './RoomInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Recreation from './RecreationComponent';
import Amenity from './AmenityComponent';
import Directions from './DirectionsComponent';
import Booking from './BookingComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROOMS } from '../shared/rooms';
import { COMMENTS } from '../shared/comments';
import { CAROUSELITEMS } from '../shared/carouselItems';
import { RECREATIONITEMS } from '../shared/recreationItems';
import { AMENITIES } from '../shared/amenities';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: ROOMS, 
            comments: COMMENTS, 
            carouselItems: CAROUSELITEMS,
            recreationItems: RECREATIONITEMS,
            selectedRecreationItem: null, 
            amenities: AMENITIES
        }
    }
    onRecreationItemSelect(recreationItemId) {
        this.setState({selectedRecreationItem: recreationItemId});
    }
    render() {
        const HomePage = () => {
            return (
                <Home 
                    room={this.state.rooms.filter(room => room.featured)[0]}
                    amenity={this.state.amenities.filter(amenity => amenity.featured)[0]}
                    recreationItem={this.state.recreationItems.filter(recreationItem => recreationItem.featured)[0]}
                /> 
            );
        }
        const RoomWithId = ({match}) => {
            return (
                <RoomInfo
                    room={this.state.rooms.filter(room => room.id === +match.params.roomId)[0]}
                    comments={this.state.comments.filter(comment => comment.roomId === +match.params.roomId)}
                />
            );
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/rooms' render={() => <Rooms rooms={this.state.rooms} />} />
                    <Route path='/rooms/:roomId' component={RoomWithId} />
                    <Route exact path='/booking' component={Booking} />
                    <Route exact path='/recreation' render={() => <Recreation recreationItems={this.state.recreationItems} onClick={recreationItemId => this.onRecreationItemSelect(recreationItemId)} recreationItem={this.state.recreationItems.filter(recreationItem => recreationItem.id === this.state.selectedRecreationItem)[0]} />} />
                    <Route exact path='/amenities' render={() => <Amenity items={this.state.amenities} />} />
                    <Route exact path='/directions' component={Directions} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

// <RecreationItemInfo  />

export default Main;