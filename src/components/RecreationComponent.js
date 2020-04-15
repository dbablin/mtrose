import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';

class Recreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRecreationItem: null
        };
    }
    onRecreationItemSelect(recreationItem) {
        this.setState({selectedRecreationItem: recreationItem});
    }
    renderSelectedRecreationItem(recreationItem) {
        if (recreationItem) {
            return (
                <Card>
                    <CardImg top src={recreationItem.image} alt={recreationItem.name} />
                    <CardBody>
                        <CardTitle>{recreationItem.name}</CardTitle>
                        <CardText>{recreationItem.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }
    render() {
        const recreationDirectory = this.props.recreationItems.map(recreationItem => {
            return (
                <div key={recreationItem.id} className="col-md-5 col-lg m-1">
                    <Card onClick={() => this.onRecreationItemSelect(recreationItem)}>
                        <CardImg width="100%" src={recreationItem.image} alt={recreationItem.name} />
                        <CardImgOverlay>
                            <CardTitle>{recreationItem.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {recreationDirectory}              
                </div>
                <div className="row">
                    <div className="col-md-8">
                    {this.renderSelectedRecreationItem(this.state.selectedRecreationItem)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Recreation;