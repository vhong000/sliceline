import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Well, Modal} from 'react-bootstrap';
import ReviewForm from './reviewForm.js';

class Reviews extends Component {
  render() {
    const valid = ['Customer', 'Visitor', 'VIP']
    if (valid.includes(this.props.status) && this.props.activeOrder) {
      return(
        <div className="reviews">

          <ReviewForm/>
          
        </div>
      )
    } else {
      return(
        <div className="reviews">
          <h3>No Pending Reviews</h3>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  status: state.Authenticate.status,
  activeOrder: state.Authenticate.activeOrder,
})

export default connect(mapStateToProps, null)(Reviews);
