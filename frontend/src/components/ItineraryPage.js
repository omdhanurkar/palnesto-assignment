import React, { useState } from 'react'
import axios from 'axios';

import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import "./ItineraryPage.css"

export default function ItineraryPage() {
    const [data, setData] = useState({
        destination: "",
        travelDates: "",
        activities: "",
        accommodations: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setData(data => ({
            ...data,//spread operator 
            [name]: value

        }))
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/create", {
            destination: data.destination,
            travelDates: data.travelDates,
            activities: data.activities,
            accommodations: data.accommodations
        })
            .then((responce) => {
                console.log(responce)
                alert("itinerary created successfully")
            })
            .catch((err) => {
                console.log(err)
                console.log(err.responce)
                alert(err.responce.data.error.message)
            })
    }

    return (
        <div className='main' >
            <MDBContainer className="my-5 gradient-form">
                <MDBRow>

                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column ms-5">

                            <div className="text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: '185px' }} alt="logo" />
                                <h4 className="mt-1 mb-5 pb-1">We are The Palnesto Team</h4>
                            </div>
                            <p>Please Create your account</p>
                            <MDBInput wrapperClass='mb-4' label='Destination' id='form1' type="name" name="destination" required value={data.destination} onChange={handleChange} />
                            <MDBInput wrapperClass='mb-4' label='TravelDates' id='form1' type="Date" name="travelDates" required value={data.travelDates} onChange={handleChange}  />
                            <MDBInput wrapperClass='mb-4' label='Activities' id='form2' type="name" name="activities" required value={data.activities} onChange={handleChange} />
                            <MDBInput wrapperClass='mb-4' label='Accommodations' id='form2' type="name" name="accommodations" required value={data.accommodations} onChange={handleChange}  />


                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit" onClick={handlesubmit} >Create Plan</MDBBtn>
                            </div>

                            {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Have an account?</p>
                            <MDBBtn outline className='mx-2' color='danger'>

                            </MDBBtn>
                        </div> */}

                        </div>

                    </MDBCol>



                </MDBRow>

            </MDBContainer>

        </div>
    );
}

