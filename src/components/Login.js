import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Input, Label, Row,Button } from 'reactstrap';
import ParticlesAuth from "./ParticlesAuth";

//import images
import maficoLogo from "./../assets/images/MaficoPro_Vector_black.png";
import { WbIncandescentTwoTone, WindowSharp } from '@mui/icons-material';

const BasicSignIn = () => {

    document.title="Sign In Mafico";
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(event) => {
        // Prevent page reload
        // const navigate = useNavigate();
        console.log({username, password})
        const token = await loginUser({
            username,
            password
          });
        console.log(token)
        localStorage.setItem("token", token['token']);
        if (token != null){
            window.location.href = 'http://192.168.1.63:3000/internal';
        }
        else {
            window.location.href = 'http://192.168.1.63:3000/login';
        }
        // window.location.href = 'http://192.168.1.63:3000/internal';
        event.preventDefault();
    };

    async function loginUser(credentials) {
        return fetch('http://192.168.1.63:8000/auth/signin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">                
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/">
                                            <img src={maficoLogo} alt="" height="100" />
                                        </Link>
                                    </div>
                                    {/* <p className="mt-3 fs-15 fw-medium">Some random text "mafico is so nice" etc</p> */}
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Mafico internal system.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            {/* <form action="#" onSubmit={handleSubmit}> */}

                                                <div className="mb-3">
                                                    <Label htmlFor="username" className="form-label">Username</Label>
                                                    <Input type="text" className="form-control" id="username" placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input type="password" className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" onChange={e => setPassword(e.target.value)}/>
                                                        {/* <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button> */}
                                                    </div>
                                                    <div className="float-end">
                                                        <Link to="/auth-pass-reset-basic" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success" className="btn btn-success w-100" onClick={handleSubmit}>Sign In</Button>
                                                </div>

                                                {/* <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                    </div>
                                                    <div>
                                                        <Button color="primary" className="btn-icon"><i className="ri-facebook-fill fs-16"></i></Button>{" "}
                                                        <Button color="danger" className="btn-icon"><i className="ri-google-fill fs-16"></i></Button>{" "}
                                                        <Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                                        <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                    </div>
                                                </div> */}
                                            {/* </form> */}
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default BasicSignIn;