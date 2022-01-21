import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import MealPlan from '../mealPlan/mealPlan';
import { Container, Form, Row, Col, FormLabel, FormControl } from 'react-bootstrap';
import './mealPlanInfo.css';

function MealPlanInfo() {
  const [meals, setMeals] = useState([]);
  const [maxCalories, setMaxCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [healthPref, setHealthPref] = useState("None");
  const [dietaryPref, setDietaryPref] = useState("Balanced");
  const [readyInMins, setReadyInMins] = useState("15");
  const [costPerMeal, setCostPerMeal] = useState("1");
  const [goal, setGoal] = useState("Lose Weight");

  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    if(!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const {weight, maxCalories} = form
    const newErrors ={}

    if( !weight || weight === '') newErrors.weight = 'Please Enter Your Weight'
    if( !maxCalories || maxCalories === '' ) newErrors.maxCalories = 'Please Enter Your Total Calories'

    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors)
    }
    else{
      getRecipes();
    }
  }

  const getRecipes = () => {
    axios.post("https://livewellapp.herokuapp.com/info", {
      maxCalories: maxCalories,
      weight: weight,
      dietaryPref: dietaryPref,
      healthPref: healthPref,
      readyInMins: readyInMins,
      costPerMeal: costPerMeal,
      goal: goal
    }).then((res) => {
      if(res.data.message){
        alert(res.data.message)
      }
      else{
        const mealData = res.data[0].meals;
        if(mealData.length > 0){
          setMeals(mealData);
        }
      }
    });
  };

    return (
      <Container className="mealPlanInfoContainer">
        <Row className="align-items-center d-flex">
          <Col xs={12} xl={8} xxl={8}
            className="
              offset-xxl-2
              offset-xl-2
            ">
            <h2>Get Your Meal Plan!</h2>
            <p>Answer some quick questions so we can suit your needs</p>
          </Col>
        {/* <div className="mealPlanFormContainer" > */}
        <Container className="mealPlanFormContainer">
            <Row className="d-flex">
              <Col sm={12} md={12}>
                <Form.Group className="formGroupGoal">
                    <Form.Label>Goal:</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setGoal(e.target.value);
                      }}>
                      <option value="Lose Weight">Lose Weight</option>
                      <option value="Gain Muscle">Gain Muscle</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupWeight">
                    <Form.Label>Weight (lbs)</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter Weight"
                        isInvalid={!!errors.weight}
                        onChange=
                          {(e) => setField('weight', e.target.value)+
                            setWeight(e.target.value)
                        }>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.weight}
                    </Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupTotalCalories">
                    <Form.Label>Total Calories:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Total Calories"
                        isInvalid={!!errors.weight}
                        onChange=
                          {(e) => setField('maxCalories', e.target.value) +
                            setMaxCalories(e.target.value)
                        }>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.maxCalories}
                    </Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupHealthPref">
                    <Form.Label>Health Preference:</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setHealthPref(e.target.value);
                      }}>
                      <option value="None">None</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Gluten Free">Gluten Free</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupDietaryPref">
                    <Form.Label>Dietary Preferences:</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setDietaryPref(e.target.value);
                      }}>
                      <option value="Balanced">Balanced</option>
                      <option value="Low-Carb">Low-Carb</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupCostPerMeal">
                    <Form.Label>Cost Per Meal:</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setCostPerMeal(e.target.value);
                      }}>
                      <option value="1">€1</option>
                      <option value="2">€2</option>
                      <option value="3">€3</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                <Form.Group className="formGroupReadyInMins">
                    <Form.Label>Ready In (Mins):</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setReadyInMins(e.target.value);
                      }}>
                      <option value="15">15 mins</option>
                      <option value="30">30 mins</option>
                      <option value="60">1 hour</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <button
                  className="getRecipesBtn"
                  type="submit" 
                  onClick={handleSubmit}
                  >Get Recipes
                </button>
            </Row>
            </Container>
         {/* </div> */}
        <MealPlan meals={meals}/>
        
        </Row>
        </Container>
    );
}

export default MealPlanInfo;
