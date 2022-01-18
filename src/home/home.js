import React from 'react'
import { Link } from 'react-router-dom'
import bgimg from '../images/homeimg.jpg';
import './home.css';
import { Container, Row, Card, Col } from 'react-bootstrap';

const Home = ({authState, setAuthState}) => {
    return (
        <div className="homeContainer" fluid>
            <Row className="align-items-center mainimage">
                <div className="bgimg">
                    <img src={bgimg} className="img-fluid"/>
                </div>
                <Col sm={12} md={6} lg={6} xxl={4}
                className="offset-md-3 offset-lg-3
                        offset-xxl-4 content">
                <h1>Meal Planning, but simple</h1>
                <h3>Find Your Meal Plan</h3>
                {!authState.status ? 
                    <Link to="/login">
                        <button className="btn">
                            Get Meal Plan
                        </button>
                    </Link>
                    : <Link to="/getplan">
                        <button className="btn">
                            Get Meal Plan
                        </button>
                    </Link>
                }
                </Col>
            </Row>
        </div>
    )
}

export default Home
