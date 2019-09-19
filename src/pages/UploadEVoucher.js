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
                                        <li className="breadcrumb-item"><a href="/E-Voucher">E-Voucher</a></li>
                                        <li className="breadcrumb-item active">Upload E-Voucher</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Upload E-Voucher</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    
                                    <Row>
                                        <Col lg={12}>
                                        <div class="card-box">
                                            <h4 class="m-t-0 header-title">Upload</h4>
                                            <Row>
                                                <Col lg={12}>
                                                    <div class="p-2">
                                                        <form class={this.props.class === "form-horizontal"} role="form">
                                                        <div class="form-group row">
                                                            <label class="col-sm-2  col-form-label text-md-right" for="simpleinput">Allowed Char</label>
                                                            <div class="col-sm-5">
                                                                <input type="text" id="simpleinput" class="form-control" placeholder="abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" value="abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" maxLength={100}/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-2  col-form-label text-md-right" for="example-email">Prefix</label>
                                                            <div class="col-sm-2">
                                                                <input type="text" id="example-email" name="example-email" class="form-control" placeholder="" maxLength={10}/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-2  col-form-label text-md-right" for="example-number">Length</label>
                                                            <div class="col-md-2">
                                                                <input class="form-control" type="number" name="number" id="example-number"  maxLength="50"/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-2  col-form-label text-md-right" for="example-number">Number of strings</label>
                                                            <div class="col-md-2">
                                                                <input class="form-control" type="number" name="number" id="example-number" min="1" max="5000"/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-2  col-form-label text-md-right" for="example-number">Value</label>
                                                            <div class="col-md-2">
                                                                <input class="form-control" type="number" name="number" id="example-number" maxlength="5"/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mb-0 row">
                                                            <button class="btn btn-primary waves-effect waves-light mr-1" type="submit">
                                                                Submit
                                                            </button>
                                                            <button type="reset" class="btn btn-secondary waves-effect waves-light">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        </Col>
                                    </Row>





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