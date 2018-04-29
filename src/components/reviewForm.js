import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ToggleButtonGroup, ToggleButton,
  ControlLabel, Well, Button, Glyphicon, PageHeader
} from 'react-bootstrap';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/review-form.css';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restRating: '',
      deliveryRating: '',
      foodRating: '',
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, name) {
    this.setState({
      [name]: event,
    })
  }
  
  render() {
    return(
      <div className='review-form'>
        <header className='review-form-header'>
          <Image src={sliceline_header} responsive className='login-header-logo' alt='main'/>
          <Image src={this.props.restaurantLogo} responsive className='rest-logo' alt='logo'/>
        </header>

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

          <Button block bsStyle='success'>
            Submit
          </Button>

        </Well>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  restaurantName: state.Restaurant.restaurant.name,
  restaurantLogo: state.Restaurant.restaurant.logo,
})

export default connect(mapStateToProps, null)(ReviewForm);
