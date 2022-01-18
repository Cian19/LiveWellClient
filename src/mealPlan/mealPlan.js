import React from 'react';
import './mealPlan.css';
import { Container, Row, Card, Col } from 'react-bootstrap';

function MealPlan({meals}) {
    return (
        <div>
            <Container>
                <Row className="d-flex mealPlanRow">
                    {meals.map((meal) => (
                        <Col sm={12} md={8} lg={4} xl={4} xxl={4} 
                            className="
                                offset-lg-0
                                offset-md-2
                            ">
                            <h2 className="dishType">{meal.dishType}</h2>
                            <Card>
                                <Card.Img variant="top" src={meal.image}/>
                                <Card.Body>
                                    <Card.Text>
                                        <h5>{meal.title}</h5>
                                        <p>Calories: {meal.calories} kcal</p>
                                        <p>Ready In: {meal.readyInMins} mins</p>
                                        <p>Cost Per Meal: €{meal.pricePerServing}</p>
                                        <ul>
                                            <li>Macros:</li>
                                            <li>Protein: {meal.protein}g</li>
                                            <li>Carbs: {meal.carbs}g</li>
                                            <li>Fat: {meal.fat}g</li>
                                        </ul>
                                            <br></br>
                                            <a href={meal.url}>
                                                <p>View Recipe</p>
                                            </a>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default MealPlan;