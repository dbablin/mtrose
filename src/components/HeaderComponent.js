import React, { Component }  from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            fullName: '',
            email: '',
            phone: '',
            message: '', 
            touched: {
                fullName: false,
                email: false,
                phone: false,
                message: false
            }
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    validate(fullName, email, phone, message) {
        const errors = {
            fullName: '',
            email: '',
            phone: '',
            message: ''
        };
        if (this.state.touched.fullName) {
            if (fullName.length < 2) {
                errors.fullName = 'Name must be at least 2 characters.';
            } else if (fullName.length > 40) {
                errors.fullName = 'Name must be 40 or less characters.';
            }
        }
        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone)) {
            errors.phone = 'The phone number should contain only numbers.';
        }
        if (this.state.touched.email && !email.includes('@')) {
            errors.email = 'Email should contain an @ symbol';
        }
        if (this.state.touched.message) {
            if (message.length < 1)
            errors.message = 'Please provide a message.';
        }
        return errors;
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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
        this.toggleModal();
        alert('Someone will be in touch with you shortly!');
    }
    render() {
        const errors = this.validate(this.state.fullName, this.state.email, this.state.phone, this.state.message);
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>Mount </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col">
                                <h1>Rose </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col">
                                <h1>Bed &amp; Breakfast</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="lg">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavLink className="nav-link" to="/home">
                                    <i className="fa fa-home fa-sm" /> Home
                                </NavLink>
                                <NavLink className="nav-link" to="/rooms">
                                    <i className="fa fa-usd fa-sm" /> Rooms &amp; Booking
                                </NavLink>
                                <NavLink className="nav-link" to="/amenities">
                                    <i className="fa fa-star fa-sm" /> Amenities
                                </NavLink>
                                <NavLink className="nav-link" to="/recreation">
                                    <i className="fa fa-umbrella fa-sm" /> Recreation
                                </NavLink>
                                <NavLink className="nav-link" to="/directions">
                                    <i className="fa fa-map-signs fa-sm" /> Getting Here
                                </NavLink>
                            </Nav>
                        </Collapse>
                        <Button onClick={this.toggleModal} className="btn-warning"> Contact Us </Button>
                    </div>
                </Navbar>
                <Modal className="modal-dialog-centered" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader className="bg-warning" toggle={this.toggleModal}>Drop Us a Line</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="fullName">Provide your full name:</Label>
                                <Input 
                                    type="text" id="fullName" name="fullName"
                                    placeholder="Full name"
                                    value={this.state.fullName}
                                    invalid={errors.fullName}
                                    onBlur={this.handleBlur("fullName")}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.fullName}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Provide your email address:</Label>
                                <Input type="email" id="email" name="email"
                                    placeholder="Email address"
                                    value={this.state.email}
                                    invalid={errors.email}
                                    onBlur={this.handleBlur("email")}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="phone">Provide your phone number:</Label>
                                <Input type="phone" id="phone" name="phone"
                                    placeholder="Phone number"
                                    value={this.state.phone}
                                    invalid={errors.phone}
                                    onBlur={this.handleBlur("phone")}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phone}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="message">What is your message for us?</Label>
                                <Input type="textarea" id="message"                name="message"
                                    value={this.state.message}
                                    invalid={errors.message}
                                    onBlur={this.handleBlur("message")}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.message}</FormFeedback>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Send</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;