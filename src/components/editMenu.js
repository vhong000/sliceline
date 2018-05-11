import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Panel, FormControl, ControlLabel, FormGroup,
  Row, Col,
} from 'react-bootstrap';
import { fetchCombos, comboEdit, comboUpdate, newComboForm,
  comboCreate, comboDelete, comboRemove,
} from '../actions/menuActions.js';

class EditMenu extends Component {

  componentDidMount() {
    this.props.fetchCombos(this.props.chef_id);
  }

  handleUpdate(index) {
    const newCombo = this.props.combos[index];
    this.props.comboUpdate(newCombo, this.props.chef_id)
  }

  handleNewForm() {
    this.props.newComboForm(this.props.chef_id);
  }

  handleCreate(index) {
    const newCombo = this.props.combos[index];
    this.props.comboCreate(newCombo, this.props.chef_id);
  }

  handleDelete(comboPK) {
    const deletePK = {
      menu_id: comboPK,
    }
    this.props.comboDelete(deletePK, this.props.chef_id);
  }

  handleRemove() {
    this.props.comboRemove(this.props.chef_id);
  }

  handleChange(event, index, category) {
    event.persist();
    const value = event.target.value;
    this.props.comboEdit(index, category, value);
  }

  render() {
    return(
      <div className='editmenu'>
        <div className='editmenu-item'>
        {this.props.combos.map((item, index) => {
          return(
          <Panel>
            <Panel.Heading>
              <Panel.Title>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type='text'
                  value={item.name}
                  onChange={(event)=> this.handleChange(event, index, 'name')}/>
              </FormGroup>
              </Panel.Title>
            </Panel.Heading>

            <Panel.Body>
              <FormGroup>
                <Row>
                  <Col xs={6}>
                    <ControlLabel>Crust</ControlLabel>
                    <FormControl type='text'
                      value={item.crust}
                      onChange={(event)=> this.handleChange(event, index, 'crust')}/>
                  </Col>
                  <Col xs={6}>
                    <ControlLabel>Toppings</ControlLabel>
                    <FormControl type='text'
                      value={item.toppings}
                      onChange={(event)=> this.handleChange(event, index, 'toppings')}/>
                  </Col>
                </Row>
              </FormGroup>
              
              <FormGroup>
                <Row>
                  <Col xs={6}>
                    <ControlLabel>Drinks</ControlLabel>
                    <FormControl type='text'
                      value={item.drinks}
                      onChange={(event)=> this.handleChange(event, index, 'drinks')}/>
                  </Col>
                  <Col xs={6}>
                    <ControlLabel>Appetizers</ControlLabel>
                    <FormControl type='text'
                      value={item.appetizers}
                      onChange={(event)=> this.handleChange(event, index, 'appetizers')}/>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl type='text'
                  value={item.description}
                  onChange={(event)=> this.handleChange(event, index, 'description')}/>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col xs={8}>
                    <ControlLabel>Picture</ControlLabel>
                    <FormControl type='text'
                      value={item.picture}
                      onChange={(event)=> this.handleChange(event, index, 'picture')}/>
                  </Col>
                  <Col xs={4}>
                    <ControlLabel>Price</ControlLabel>
                    <FormControl type='text'
                      value={item.price}
                      onChange={(event)=> this.handleChange(event, index, 'price')}/>
                  </Col>
                </Row>
              </FormGroup>

              {!item.pk ? (
                <div>
                  <Button bsStyle='success'
                    onClick={()=> this.handleCreate(index)}>
                    Create
                  </Button>
                  <Button bsStyle='danger'
                    onClick={()=> this.handleRemove()}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <Button bsStyle='primary'
                    onClick={()=> this.handleUpdate(index)}>
                    Update
                  </Button>
                  <Button bsStyle='danger'
                    onClick={()=> this.handleDelete(item.pk)}>
                    Delete
                  </Button>
                </div>
                )
              }
            </Panel.Body>
          </Panel>
          )
        })}
        </div>
        <Button bsStyle='success'
          onClick={()=> this.handleNewForm()}>
          New Combo
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  chef_id: state.Authenticate.user.emp_id,
  combos: state.Menu.combos,
})

export default connect(mapStateToProps, { fetchCombos, comboEdit, comboUpdate, newComboForm, comboCreate, comboDelete, comboRemove })(EditMenu);
