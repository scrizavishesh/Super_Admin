import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getOTPByMailApi, setPassApi, verifyOTPApi } from '../Utils/Apis';


const Container= styled.div`
    height: 100vh;
    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .imagearea{
        background: linear-gradient(135deg, #D8E6FF, white);
    }

    .formarea{
        background:linear-gradient(#F0F8F7, white);
    }

    .formcontrolinput{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        font-size: 16px;
    }

    .formcontrolinput::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }

    .text-grey{
        color: #8F8F8F;
    }


`;

const Span14Font = styled.span`
    font-size: 14px;
    font-family: Noto Sans;
`;



const NewPassSet = () => {

    const navigate = useNavigate();

    const [pass, setPass] = useState('');
    const [passError, setPassError] = useState('');

    const handlePassChange = (e) => {
        const passValue = e.target.value;
        setPass(passValue);
        setPassError(validatePassword(passValue));
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************

    const PasswordRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'OTP is required';
        } else if (!PasswordRegex.test(value)) {
            return 'Invalid characters !!';
        }
        return '';
        };

    const validateFields = () => {
        let isValid = true;

        if (!pass) {
            setPassError('* OTP is required');
            isValid = false;
        } else {
            setPassError('');
        }

        return isValid;
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************
    
    
    const setPassword = async() => {
        if(validateFields()){
            try{
                console.log('pass', pass)
                var response = await setPassApi(pass);
                if(response?.status===200){
                  if(response?.data?.status==='success'){
                    navigate('/forgetsuccess');
                  }
                }
            }
            catch{
        
            }
        }
    }
    
    return (
        <>
            <Container>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-md-6 col-sm-12 p-5 imagearea">
                            <img src="./images/pana.svg" alt="" className='img-fluid m-5'/>
                        </div>
                        <div className="col-md-6 col-sm-12 p-5 formarea">
                            <div className="row text-center pt-5 mt-5">
                                <p><img src="./images/Scrizalogo.svg" alt="" className='img-fluid' /></p>
                            </div>
                            <div className="row p-5 ms-3 me-3">
                                <Span14Font>
                                    <p className='font18 mb-1'>Forgot Password?</p>
                                    <h2 className='text-grey font16 mb-3'>We have sent a verification code to your mobile number</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label font16">Password</label>
                                            <input type="password" className="form-control formcontrolinput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Enter Password' onChange={handlePassChange}/>
                                            <span className="text-danger">{passError}</span>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="btn btnsubmitOwn text-white" onClick={setPassword}>Save Password</Link>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="m-2 text-center text-black text-decoration-none" to='/login'>
                                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                                                    <path fill="#008479" fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                                </svg>
                                                Return to the Login Page
                                            </Link>
                                        </div>
                                    </form>
                                </Span14Font>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
      )
}

export default NewPassSet