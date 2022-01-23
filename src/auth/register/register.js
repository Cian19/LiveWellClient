import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Form, FormLabel } from 'react-bootstrap';
import './register.css';

const Register = () => {
// console.log({username});
    const [username, setname] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const history = useHistory();

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
        const {username, password} = form
        const newErrors ={}
    
        if( !username || username === '') newErrors.username = 'Please Enter Your username'
        if( !password || password === '' ) newErrors.password = 'Please Enter A Password'
    
        return newErrors
      }

      const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if(Object.keys(newErrors).length > 0){
          setErrors(newErrors)
        }
        else{
          regUser();
        }
      }

    const regUser = () => {
            axios.post("https://livewellapp.herokuapp.com/auth/register", {
                username: username,
                password: password,
            }).then((res) => {
                if(res.data.message) {
                    setLoginStatus(res.data.message)
                } else {
                  alert(res.data)
                  console.log(res.data)
                    history.push('/login');
                    // console.log(username)
                }
            });
        }
    
    return (
        <div className="registerFormContainer">
            <h1>Register</h1>
                <Form.Group className="formGroupname">
                    <Form.Label style={{float: "left"}}>username:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        isInvalid={!!errors.username}
                        onChange=
                            {(e) => setField('username', e.target.value)+
                            setname(e.target.value)
                        }>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="formGroupPassword">
                    <Form.Label style={{float: "left"}}>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password"
                        isInvalid={!!errors.password}
                        onChange=
                            {(e) => setField('password', e.target.value)+
                            setPassword(e.target.value)
                        }>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
            <button
                className="registerBtn"
                type="submit" 
                onClick={handleSubmit}
                >Register
            </button>
            <div className="login">
              <Link to="/login">
                <p>Already have an account? Login here</p>
              </Link>
            </div>
        </div>
    )
}
export default Register;