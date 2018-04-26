import React, { Component } from 'react';
import { Button, Well } from 'react-bootstrap';

class Reviews extends Component {
  render() {
    return(
      <div className="reviews">
        <Button bsStyle='success'>
          Create
        </Button>

        <Well>
         example review 
        </Well>

      </div>
    )
  }
}

export default Reviews
