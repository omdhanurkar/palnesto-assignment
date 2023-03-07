import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
} from "mdb-react-ui-kit";
import "./LoginPage.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({
            ...user, //spread operator
            [name]: value,
        }));
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/login", {
                email: user.email,
                password: user.password,
            })
            .then((responce) => {
                console.log(responce);
                alert("successfully loggedIn");
            })
            .catch((err) => {
                console.log(err);
                console.log(err.responce);
                alert(err.responce.data.error.message);
            });
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Palnesto</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <MDBContainer className="my-5 gradient-form">
                <MDBRow>
                    <MDBCol col="6" className="mb-5">
                        <div className="d-flex flex-column ms-5">
                            <div className="text-center">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: "185px" }}
                                    alt="logo"
                                />
                                <h4 className="mt-1 mb-5 pb-1">We are The Palnesto Team</h4>
                            </div>

                            <p>Please login to your account</p>

                            <MDBInput
                                wrapperClass="mb-4"
                                label="Email address"
                                id="form1"
                                type="email"
                                name="email"
                                required
                                value={user.email}
                                onChange={handleChange}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                id="form2"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />

                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn
                                    className="mb-4 w-100 gradient-custom-2"
                                    type="submit"
                                    onClick={handlesubmit}
                                >
                                    Log In
                                </MDBBtn>
                                {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <p className="mb-0">Don't have an account?</p>
                                <MDBBtn outline className="mx-2" color="danger">
                                    <Link to="/signup">Create Account</Link>
                                </MDBBtn>
                            </div>
                        </div>
                    </MDBCol>

                    <MDBCol col="6" className="mb-5">
                        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">We are more than just a company</h4>
                                <p class="small mb-0">
                                    We make an effort to spread enthusiasm across palnesto. For
                                    us, maintaining a positive and helpful attitude at all times
                                    is essential and, might we say, evident. We understand the
                                    difficulties of working for a rapidly expanding IT company. A
                                    optimistic outlook, though, may go you very far.
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default LoginPage;
