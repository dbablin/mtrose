import React, { Component, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomType: '',
            numGuests: '',
            checkIn: '',
            checkOut: '',
            touched: {
                roomType: false,
                numGuests: false,
                checkIn: false,
                checkOut: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    validate(roomType, checkIn, checkOut) {
        const errors = {
            roomType: '',
            numGuests: '',
            checkIn: '',
            checkOut: ''
        };
        if (this.state.touched.roomType) {
            if (roomType.value === '') {
            errors.roomType = 'Please select a room type.';
            }
        }

        return errors;
    }
    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    handleSubmit(event) {
        console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
    render() {
        const errors = this.validate(this.state.roomType);
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/rooms">Room Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Booking</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Room Booking</h2>                        
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col>
                                    <Label htmlFor="roomType">Room type:</Label>
                                    <Input 
                                        type="select" 
                                        name="roomType"
                                        value={this.state.roomType}
                                        invalid={errors.roomType}
                                        onBlur={this.handleBlur("roomType")}
                                        onChange={this.handleInputChange} >
                                        <option>Select a room type</option>
                                        <option>Hike-in Cabin</option>
                                        <option>Lakeside</option>
                                        <option>Mountain View</option>
                                    </Input>
                                    <FormFeedback>{errors.roomType}</FormFeedback>
                                </Col>
                                <Col>
                                    <Label htmlFor="numGuests">Number of guests:</Label>
                                    <Input 
                                        type="select" 
                                        name="numGuests"
                                        value={this.state.numGuests}
                                        onBlur={this.handleBlur("numGuests")}
                                        onChange={this.handleInputChange} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5+</option>
                                    </Input>
                                </Col>                  
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Label htmlFor="checkIn">Check in date:</Label>
                                    <Input
                                        type="date"
                                        name="checkIn"
                                        value={this.state.checkIn}
                                        onBlur={this.handleBlur("checkIn")}
                                        onChange={this.handleInputChange} 
                                    />
                                </Col>
                                <Col>
                                    <Label htmlFor="checkOut">Check out date:</Label>
                                    <Input
                                        type="date"
                                        name="checkOut"
                                        value={this.state.checkOut}
                                        onBlur={this.handleBlur("checkOut")}
                                        onChange={this.handleInputChange} 
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">
                                        Check Availability
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Booking;