import React from 'react'
import { Carousel, Col, Container, Row, Alert } from 'react-bootstrap'
import items from '../data/menu.json'
import DishComments from './DishComments'
import ReservationForm from './ReservationForm'
import Reservations from './Reservations'

// .map
// we need to work with the state object to keep track of which dish we selected
// but we cannot have the state object into a functional component
// for having a state we need a Class Component

// functional components are a touch faster

class Home extends React.Component {

    // let's declare the INITIAL state for my component
    // the state is an object for keeping track of things during
    // the lifespan of our page/component

    state = {
        selectedDish: items[0], // we always need to provide an initial state for our component
        show: true,
        header: "Header"
    }

    // the state object in a react component is READ-ONLY
    // you cannot change it directly, but only with a method calles setState

    // the parameter you pass to setState will always be an object
    // that object will be MERGED into the current state
    showForm = (e) => {
        this.state.show ? this.setState({ show: false }) : this.setState({ show: true })

    }



    render() { // render is the ONLY REQUIRED method in a class component
        console.log(this.state.selectedDish)
        console.log(this.checkComments)
        return (
            <Container>
                {/* <div class="container" /> */}
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={8}>
                        <Reservations header={this.state.header} />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={8}>
                        {/* <div class="col col-xs-12 col-md-6">
                                COL CONTENT
                            </div>
                        */}
                        <h1>{this.props.newTitle ? this.props.newTitle : "Welcome to Strivestaurant"} </h1>
                        <p>{this.props.newPayoff ? this.props.newPayoff : "The best pasta dishes you can find on the web!"}</p>
                        <Carousel>
                            {
                                // every time you do a .map in react you'll need to
                                // differentiate each one of the JSX elements you're generating
                                items.map((item, index) => (
                                    // we need to let React know that all these carousel slides are different
                                    <Carousel.Item
                                        key={item.name}
                                        // the key prop must be unique for every slide
                                        onClick={() => this.setState({ selectedDish: item })}
                                    >
                                        {/* the key is necessary for React's VIRTUAL DOM */}
                                        <img
                                            className="d-block w-100"
                                            src={item.image}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={8}>
                        {this.state.selectedDish.name !== "Amatriciana" && <DishComments dish={this.state.selectedDish} marginTop={0} />}
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={8}>
                        <h2 onClick={(e) => this.showForm(e)}>Click to Book your table NOW!</h2>
                        {this.state.show && <ReservationForm />}
                        {this.state.selectedDish.comments.some(comment => {
                            return comment.rating < 5 ? true : false }) ? <Alert key="key1" variant="danger">
                                Dish has ratings of less than 5!
                        </Alert> : <ReservationForm />
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home