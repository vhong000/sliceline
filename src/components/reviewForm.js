import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ToggleButtonGroup, ToggleButton,
  ControlLabel, Well, Button, Glyphicon, PageHeader
} from 'react-bootstrap';
import { deliveryReview, customerReview } from '../actions/restaurantActions.js';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/review-form.css';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restRating: '',
      deliveryRating: '',
      foodRating: '',
      custRating: '',
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeliveryReview = this.handleDeliveryReview.bind(this);
    this.handleCustomerReview = this.handleCustomerReview.bind(this);
  }

  handleSelect(event, name) {
    this.setState({
      [name]: event,
    })
  }

  handleDeliveryReview() {
    const review = {
      rating: this.state.custRating,
      emp_id: this.props.user.emp_id,
      user_id: this.props.activeOrder.user_id,
      store: this.props.activeOrder.rest_id,
    }
    this.props.deliveryReview(review);
    this.props.callback(false);
  }

  handleCustomerReview() {
    const review = {
      pizza: this.state.foodRating,
      store: this.state.restRating,
      delivery: this.state.deliveryRating,
      emp_id: this.props.activeChef.emp_id,
      order: this.props.activeOrder,
      user_id: this.props.user.user_id,
    }
    this.props.customerReview(review);
  }
  
  render() {
    if (this.props.reviewer === 'delivery') {
      return(
        <div className='review-form'>
          <Well>
            <h3>Feedback</h3>
            <p>Please review the customer</p>
            <hr></hr>

            <div className='review-form-ratings'>
              <ToggleButtonGroup name='custRating' justified type='radio' onChange={(e) => this.handleSelect(e, 'custRating')}>
                <ToggleButton value={1}>
                  {this.state.custRating === 1 ? ( <div> 1 <Glyphicon glyph='star'/> </div>
                  ) : ( <div> 1 <Glyphicon glyph='star-empty'/> </div>
                  )}
                </ToggleButton>
                <ToggleButton value={2}>
                  {this.state.custRating === 2 ? ( <div> 2 <Glyphicon glyph='star'/> </div>
                  ) : ( <div> 2 <Glyphicon glyph='star-empty'/> </div>
                  )}
                </ToggleButton>
                <ToggleButton value={3}>
                  {this.state.custRating === 3 ? ( <div> 3 <Glyphicon glyph='star'/> </div>
                  ) : ( <div> 3 <Glyphicon glyph='star-empty'/> </div>
                  )}
                </ToggleButton>
                <ToggleButton value={4}>
                  {this.state.custRating === 4 ? ( <div> 4 <Glyphicon glyph='star'/> </div>
                  ) : ( <div> 4 <Glyphicon glyph='star-empty'/> </div>
                  )}
                </ToggleButton>
                <ToggleButton value={5}>
                  {this.state.custRating === 5 ? ( <div> 5 <Glyphicon glyph='star'/> </div>
                  ) : ( <div> 5 <Glyphicon glyph='star-empty'/> </div>
                  )}
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Well>

          <br></br>
          <Button block bsStyle='success'
            onClick={this.handleDeliveryReview}>
            Submit
          </Button>
        </div>


      )
    } else {
      return(
        <div className='review-form'>
          {/*
            <header className='review-form-header'>
              <Image src={sliceline_header} responsive className='review-form-header-logo' alt='main'/>
              <Image src={this.props.restaurantLogo} responsive className='review-form-rest-logo' alt='logo'/>
              </header>
              */ }

          <Well>
            <h3>Feedback</h3>
            <p>Thanks for choosing {this.props.restaurantName} with Sliceline!! Please take a couple of seconds to give us some feedback!!</p>
            <hr></hr>

            <div className='review-form-ratings'>
              <ControlLabel>What did you think of the restaurant?</ControlLabel>
              <div className='review-form-restaurant'>
                <ToggleButtonGroup name='restRating' justified type='radio' onChange={(e) => this.handleSelect(e, 'restRating')}>
                  <ToggleButton value={1}>
                    {this.state.restRating === 1 ? ( <div> 1 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 1 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={2}>
                    {this.state.restRating === 2 ? ( <div> 2 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 2 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={3}>
                    {this.state.restRating === 3 ? ( <div> 3 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 3 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={4}>
                    {this.state.restRating === 4 ? ( <div> 4 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 4 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={5}>
                    {this.state.restRating === 5 ? ( <div> 5 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 5 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <br></br>

              <div className='review-form-delivery'>
              <ControlLabel>How was the delivery?</ControlLabel>
                <ToggleButtonGroup name='deliveryRating' justified type='radio' onChange={(e) => this.handleSelect(e, 'deliveryRating')}>
                  <ToggleButton value={1}>
                    {this.state.deliveryRating === 1 ? ( <div> 1 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 1 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={2}>
                    {this.state.deliveryRating === 2 ? ( <div> 2 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 2 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={3}>
                    {this.state.deliveryRating === 3 ? ( <div> 3 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 3 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={4}>
                    {this.state.deliveryRating === 4 ? ( <div> 4 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 4 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={5}>
                    {this.state.deliveryRating === 5 ? ( <div> 5 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 5 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <br></br>

              <div className='review-form-food'>
              <ControlLabel>How was the cooking?</ControlLabel>
                <ToggleButtonGroup name='foodRating' justified type='radio' onChange={(e) => this.handleSelect(e, 'foodRating')}>
                  <ToggleButton value={1}>
                    {this.state.foodRating === 1 ? ( <div> 1 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 1 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={2}>
                    {this.state.foodRating === 2 ? ( <div> 2 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 2 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={3}>
                    {this.state.foodRating === 3 ? ( <div> 3 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 3 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={4}>
                    {this.state.foodRating === 4 ? ( <div> 4 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 4 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                  <ToggleButton value={5}>
                    {this.state.foodRating === 5 ? ( <div> 5 <Glyphicon glyph='star'/> </div>
                    ) : ( <div> 5 <Glyphicon glyph='star-empty'/> </div>
                    )}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <br></br>

            <Button block bsStyle='success'
              onClick={this.handleCustomerReview}>
              Submit
            </Button>

          </Well>

        </div>
      )
    }
  }

}

const mapStateToProps = state => ({
  restaurantName: state.Restaurant.restaurant.name,
  restaurantLogo: state.Restaurant.restaurant.logo,
  user: state.Authenticate.user,
  activeChef: state.Restaurant.activeChef,
  activeOrder: state.Authenticate.activeOrder,
})

export default connect(mapStateToProps, { deliveryReview, customerReview })(ReviewForm);
