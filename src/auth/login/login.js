import React, { useState, useContext} from 'react';
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom';
import { Container, Form, FormLabel } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../../helpers/AuthContext';

const Login = () => {
  console.log();

    const [username, setname] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [error, setError] = useState("");
    const {setAuthState} = useContext(AuthContext);

    axios.defaults.withCredentials = true;

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
        if( !password || password === '' ) newErrors.password = 'Please Enter Your Password'
    
        return newErrors
      }

      const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if(Object.keys(newErrors).length > 0){
          setErrors(newErrors)
        }
        else{
          loginUser();
        }
      }

  const loginUser = () => {
    const data = { username: username, password: password };
    axios.post("https://livewellapp.herokuapp.com/auth/login", data).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
        // alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        console.log(authState.username);
        history.push("/");
      }
    });
  };

    return (
        <div className="loginFormContainer">
            <h1>Login</h1>
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
                  className="loginBtn"
                  type="submit" 
                  onClick={handleSubmit}
                  >Login
                </button>
                <div className="register">
                  <Link to="/register">
                    <p>Don't have an account? Register for one here</p>
                  </Link>
                </div>
                {error && 
                <div className="error">
                  <p>{error}</p>
                </div>}
                {/* <div className="error">
                  <p>{error}</p>
                </div> */}
         </div>
    );
}
export default Login;