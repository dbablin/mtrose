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
import { addComment } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        comments: state.comments,
        amenities: state.amenities,
        recreationItems: state.recreationItems
    };
};

const mapDispatchToProps = {
    addComment: (roomId, rating, author, text) => (addComment(roomId, rating, author, text))
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRecreationItem: null
        }
    }
    onRecreationItemSelect(recreationItemId) {
        this.setState({selectedRecreationItem: recreationItemId});
    }
    render() {
        const HomePage = () => {
            return (
                <Home 
                    room={this.props.rooms.filter(room => room.featured)[0]}
                    amenity={this.props.amenities.filter(amenity => amenity.featured)[0]}
                    recreationItem={this.props.recreationItems.filter(recreationItem => recreationItem.featured)[0]}
                /> 
            );
        }
        const RoomWithId = ({match}) => {
            return (
                <RoomInfo
                    room={this.props.rooms.filter(room => room.id === +match.params.roomId)[0]}
                    comments={this.props.comments.filter(comment => comment.roomId === +match.params.roomId)}
                    addComment={this.props.addComment}
                />
            );
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/rooms' render={() => <Rooms rooms={this.props.rooms} />} />
                    <Route path='/rooms/:roomId' component={RoomWithId} />
                    <Route exact path='/booking' component={Booking} />
                    <Route exact path='/recreation' render={() => <Recreation recreationItems={this.props.recreationItems} onClick={recreationItemId => this.onRecreationItemSelect(recreationItemId)} recreationItem={this.props.recreationItems.filter(recreationItem => recreationItem.id === this.props.selectedRecreationItem)[0]} />} />
                    <Route exact path='/amenities' render={() => <Amenity items={this.props.amenities} />} />
                    <Route exact path='/directions' component={Directions} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));