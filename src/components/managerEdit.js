import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Well, Button, Panel } from 'react-bootstrap';
import { fetchEmployees, removeWarning, approveRegister } from '../actions/managerActions.js';
import Header from './header.js';
import '../css/managerEdit.css';

class ManagerEdit extends Component {

  constructor(props) {
    super(props);
    this.removeWarning = this.removeWarning.bind(this);
  }

  componentDidMount() {
    this.props.fetchEmployees(this.props.rest_id);
  }

  submitApproval(isApproved, pk) {
    const userInfo = {
      approval: isApproved,
      user_id: pk,
      store: this.props.rest_id,
    }
    this.props.approveRegister(userInfo);
  }

  removeWarning(pk, status) {
    const empInfo = {
      status: status,
      status_id: pk,
    }
    this.props.removeWarning(empInfo, this.props.rest_id);
  }

  render() {
    return(
      <div className='manager-edit'>
        <div className='manager-edit-chef'>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Chefs</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            {this.props.chefs.map((chef) => {
              return (
                <div className='manager-chef-list'>
                  <Well>
                    <p><Label>Full Name:</Label> {chef.full_name}</p>
                    <p><Label>Employee ID:</Label> {chef.emp_id}</p>
                    <p><Label>Warnings:</Label> {chef.warning}</p>
                {chef.warning > 0 ? (
                  <Button onClick={()=> this.removeWarning(chef.pk, chef.role)}>
                  Remove Warning
                  </Button>
                ) : ( null )}
              </Well>
                </div>
              )
            })
            }
            </Panel.Body>
          </Panel>
        </div>
        <div className='manager-edit-delivery'>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Delivery</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            {this.props.deliverys.map((deliv) => {
              return (
                <div className='manager-deliv-list'>
                  <Well>
                    <p><Label>Full Name:</Label> {deliv.full_name}</p>
                    <p><Label>Employee ID:</Label> {deliv.emp_id}</p>
                    <p><Label>Warnings:</Label> {deliv.warning}</p>
                {deliv.warning > 0 ? (
                  <Button onClick={()=> this.removeWarning(deliv.pk, deliv.role)}>
                  Remove Warning
                  </Button>
                ) : ( null )}
              </Well>
                </div>
              )
            })
            }
            </Panel.Body>
          </Panel>
        </div>
        <div className='manager-edit-approval'>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Approval</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div className='manager-approve-list'>
              {this.props.approvals.map((user) => {
                return (
                  <div className='manager-approve-item'>
                    <Well>
                      <p><Label>Full Name:</Label> {user.name}</p>
                      <p><Label>Email:</Label> {user.email}</p>
                      <Button bsStyle='success'
                        onClick={()=> this.submitApproval(true, user.pk)}>
                        Approve
                      </Button>
                      <Button bsStyle='danger'
                        onClick={()=> this.submitApproval(false, user.pk)}>
                        Deny
                      </Button>
                    </Well>
                  </div>
                )
              })
              }
              </div>
            </Panel.Body>
          </Panel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rest_id: state.Restaurant.restaurant.rest_id,
  chefs: state.Manager.chefs,
  approvals: state.Manager.approvals,
  deliverys: state.Manager.deliverys,
})

export default connect(mapStateToProps, { fetchEmployees, removeWarning, approveRegister })(ManagerEdit);
