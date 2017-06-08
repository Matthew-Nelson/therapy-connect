import React, {Component} from 'react'
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap'

class Home extends Component {

  render() {
    return (
      <div className='container'>
        <Jumbotron>
          <h1>Welcome to Therapy Connect!</h1>
          <h3>An application for physical therapists to connect with their clients. Through this application, therapists can quickly and easily assign their clients personalized routines and exercises for them to complete.</h3>
          <Grid>
            <Row className='show-grid'>
            <br></br>
              <Col xs={12} md={12} lg={12} className="directions-content">Start by logging in or signing up!</Col>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    )
  }
}

export default Home
