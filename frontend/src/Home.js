import React, {Component} from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

class Home extends Component {

  render() {
    return (
      <div className='container'>
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} md={6} lg={3}>Directions</Col>
            <Col xs={12} md={6} lg={9}>Therapy Connect is an application for physical therapists to connect with their clients. Through this application, therapists can quickly and easily assign their clients personalized routines and exercises for them to complete. Start by logging in or signing up!</Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home
