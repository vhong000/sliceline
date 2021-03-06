import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Well, Button, Panel, DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import { fetchEmployees, removeWarning, approveRegister,
  assignDelivery,
} from '../actions/managerActions.js';
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

  handleSelect(emp_id, order) {
    const assignObj = {
      emp_id: emp_id,
      order: order,
    }
    this.props.assignDelivery(assignObj, this.props.rest_id);
  };

  removeWarning(pk, status) {
    const empInfo = {
      status: status,
      status_id: pk,
    }
    this.props.removeWarning(empInfo, this.props.rest_id);
  }

  render() {
    const freeDelivs = this.props.deliverys.filter((deliv => {
      return deliv.status === 'Available';
    })
    )

    return(
      <div className='manager-edit'>
        <div className='manager-edit-orders'>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Orders</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            {this.props.orders.map((order) => {
              return (
              <div className='manager-order-list'>
                <Well>
                  <p><Label>Address:</Label> {order.address}</p>
                  <p><Label>Total:</Label> {order.total}</p>
                  {order.status ? ( 
                    <p><Label>Being Delivered</Label></p>
                  ) : (
                  <DropdownButton title='Select Delivery'
                    onSelect={(eventKey) => this.handleSelect(eventKey, order.pk)}>
                    {freeDelivs.map((deliv)=> {
                      return (
                      <MenuItem eventKey={deliv.emp_id}>
                        {deliv.full_name}
                      </MenuItem>
                      )
                    })
                    }
                  </DropdownButton>
                  )}
                </Well>
              </div>
              )
            })
            }
            </Panel.Body>
          </Panel>
        </div>
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
                    <p><Label>Status:</Label> {deliv.status}</p>
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
                        onClick={()=> this.submitApproval(1, user.pk)}>
                        Approve
                      </Button>
                      <Button bsStyle='danger'
                        onClick={()=> this.submitApproval(0, user.pk)}>
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
  orders: state.Manager.pendingOrders,
  approvals: state.Manager.approvals,
  deliverys: state.Manager.deliverys,
})

export default connect(mapStateToProps, { fetchEmployees, removeWarning, approveRegister,
  assignDelivery,
})(ManagerEdit);
