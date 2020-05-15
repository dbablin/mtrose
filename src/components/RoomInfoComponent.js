import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            isModalOpen: false, 
            touched: {
                author: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.roomId, values.rating, values.author, values.text);
    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil" /> Add Your Comment &amp; Rating</Button>
                <br />
                <br />
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Your Comment &amp; Rating</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row>
                                <Col>
                                    <Label htmlFor="rating">Your Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" name=
                                        "author" className="form-control" validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}>
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label htmlFor="text">Your Comment</Label>
                                    <Control.textarea rows="6" model=".text" name="text" className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <br />
                                    <Button type="submit" color="primary"> Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    };
}

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

function RenderComments({comments, addComment, roomId}) {
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
                <br />
                <CommentForm roomId={roomId} addComment={addComment} />
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
                    <RenderComments         
                        comments={props.comments} 
                        addComment={props.addComment}
                        roomId={props.room.id}
                    />
                </div>
            </div>
        );
    } 
    return <div />;        
}

export default RoomInfo;
