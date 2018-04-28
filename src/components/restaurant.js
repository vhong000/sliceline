import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header.js';
import Menu from './menu.js';
import Reviews from './reviews.js';
import { fetchRestaurant } from '../actions/restaurantActions.js';
import { Carousel, PageHeader, Navbar, Tab,
  TabContainer, TabPane, TabContent, Nav, NavItem, Image,
} from 'react-bootstrap';
import '../css/restaurant.css';

class Restaurant extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRestaurant(id);
  }

  render() {
    return (
      <div className='restaurant'>
        <Header/>

        <Tab.Container defaultActiveKey='home'>
          <div className='restaurant-body'>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  {this.props.restaurant.name}
                </Navbar.Brand>
              </Navbar.Header>

              <Nav bsStyle='tabs'>
                <NavItem eventKey='home'>
                  Home
                </NavItem>
                <NavItem eventKey='menu'>
                  Menu
                </NavItem>
                <NavItem eventKey='reviews'>
                  Reviews
                </NavItem>
                <NavItem eventKey='contact'>
                  Contact
                </NavItem>
              </Nav>
            </Navbar>

            <Tab.Content>
              <Tab.Pane eventKey='home'>
                <Carousel>
                  <Carousel.Item>
                    <Image src="http://lorempizza.com/1500/500/1"/>
                    <Carousel.Caption>
                      <h3>First Recommendation</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                    <Carousel.Item>
                      <Image src="http://lorempizza.com/1500/500/2"/>
                      <Carousel.Caption>
                        <h3>Second Recommendation</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                    <Carousel.Item>
                      <Image src="http://lorempizza.com/1500/500/3"/>
                      <Carousel.Caption>
                        <h3>Third Recommendation</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <div className='restaurant-about'>
									<h3>About: </h3>
                  <p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra suspendisse potenti nullam. Tortor at risus viverra adipiscing at in tellus integer feugiat. Tempus quam pellentesque nec nam aliquam. Vitae ultricies leo integer malesuada nunc vel risus. Ut tortor pretium viverra suspendisse potenti. Purus ut faucibus pulvinar elementum integer enim. Neque laoreet suspendisse interdum consectetur libero id faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Urna nunc id cursus metus aliquam eleifend mi in. Condimentum lacinia quis vel eros donec ac. Purus non enim praesent elementum facilisis leo vel fringilla est. Lectus urna duis convallis convallis. Nibh sed pulvinar proin gravida hendrerit lectus a.
<br/>
Eget arcu dictum varius duis. Leo a diam sollicitudin tempor id eu nisl. Tristique senectus et netus et malesuada fames ac. Dictum non consectetur a erat nam at lectus urna duis. Aenean vel elit scelerisque mauris pellentesque pulvinar. Risus nullam eget felis eget nunc lobortis. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Tristique magna sit amet purus gravida. Id aliquet lectus proin nibh. Praesent elementum facilisis leo vel fringilla. Vitae tortor condimentum lacinia quis vel eros. Duis at consectetur lorem donec massa sapien faucibus. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Tellus in hac habitasse platea dictumst.
<br/>
Et ligula ullamcorper malesuada proin libero. Diam maecenas ultricies mi eget mauris pharetra et. Duis convallis convallis tellus id interdum velit laoreet id. Eu nisl nunc mi ipsum faucibus vitae. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. In est ante in nibh mauris. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. In ante metus dictum at tempor commodo ullamcorper. Blandit libero volutpat sed cras ornare arcu dui vivamus. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Accumsan in nisl nisi scelerisque eu ultrices. Est ante in nibh mauris. Purus sit amet luctus venenatis lectus. Tristique et egestas quis ipsum suspendisse ultrices.
                  </p>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey='menu'>
                <Menu/>
              </Tab.Pane>

              <Tab.Pane eventKey='reviews'>
                <Reviews/>
              </Tab.Pane>

            </Tab.Content>
          </div>
        </Tab.Container>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurant: state.Restaurant.restaurant,
  error: state.Restaurant.error,
  isLoading: state.Restaurant.loading,
})

export default connect(mapStateToProps, { fetchRestaurant })(Restaurant);
