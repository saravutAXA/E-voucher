import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props.user))
        this.state = {
            user: getLoggedInUser()
        };
    }

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="/">Adminto</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Dashboard</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    Hello this is dashboard content to <b>{this.props.user.firstName} {this.props.user.lastName}</b> 
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

// const mapDispatchToProps = dispatch => {
//     return {
//       onTodoClick: id => {
//         dispatch(toggleTodo(id))
//       },
//     }
//   }

export default connect(mapStateToProps)(DefaultDashboard);