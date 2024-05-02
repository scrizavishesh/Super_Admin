import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../Utils/Apis';
import toast, {Toaster} from 'react-hot-toast';

const Container= styled.div`

    height: 100vh;

    .loginmain{
        height: 100vh;
    }

    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .loginrow{
        height: 100%;
        align-items: center;
        justify-content: center;
        background:linear-gradient(#F0F8F7, white);
    }

    .formcontrolinput{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        box-shadow: none !important;
        font-size: 16px;
    }

    .formcontrolinput::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }
`;

const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    const [isRemeberChecked, setIsRemeberChecked] = useState(false);

    const emailRegex =  /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    const PasswordRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;
    // const PasswordRegex = /^(?=.*[a-z]).{4,}$/;

    const validateEmail = (value) => {
        if (!value.trim()) {
          return 'Email is required';
        } else if (!emailRegex.test(value)) {
          return 'Invalid email format';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'Password is required';
        } else if (!PasswordRegex.test(value)) {
            return 'Invalid password format';
        }
        return '';
    };
    
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePassword = (e) => {
        const newInputValue = e.target.value;
        setPass(newInputValue);
        setPassError(validatePassword(newInputValue));
    };

    const validateFields = () => {
        let isValid = true;
    
        if (!email) {
            setEmailError('* This field is required');
        } else {
            setEmailError('');
        }

        if (!pass) {
            setPassError('* This field is required');
        } else {
            setPassError('');
        }

        return isValid;
    };

    const SubmitLogin= async() => {
        if (validateFields()){
            try {
                const data = {
                    'email': email,
                    'password': pass
                }
                var response = await loginApi(data);
                console.log(response)
                if (response?.status === 200) {
                    if(response.data.status==='success')
                    {
                        localStorage.setItem('token', response?.data?.token)
                        console.log('login success');
                        console.log('login token', response?.data?.token);
                        window.location.reload();
                    }
                    else
                    {
                        toast.error(response?.data?.msg)
                        console.log('login fail')
                    }
                } 
                else 
                {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
            }
        }
        // if(isRemeberChecked){
           
        // }
    }


    return (
        
      <>
          <Container>
              <div className="conatiner-fluid loginmain">
                  <div className="row loginrow">
                      <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
                          <img src="./images/loginimg.svg" alt="" className='img-fluid m-4'/>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="row me-xl-5 ms-xl-5 ps-xl-5 pe-xl-5">
                                <p className='text-center'><img src="./images/Scrizalogo.svg" alt="" className='img-fluid' /></p>
                                <form className='pt-xl-3 pe-xl-5 ps-xl-5 pt-lg-2 pe-lg-2 ps-lg-2'>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" className={`form-control formcontrolinput ${emailError ? 'border-1 border-danger' : ''} `} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Your Email Address' onChange={handleEmailChange}/>
                                        <div>
                                            <span className='text-danger'>{emailError}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className={`form-control formcontrolinput ${passError ? 'border-1 border-danger' : ''} `} id="exampleInputPassword1" placeholder='&#xf084; 6+ Strong Character' onChange={handlePassword}/>
                                        <div>
                                            <span className='text-danger'>{passError}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-4 form-check d-flex">
                                        <div className="col-6">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label ps-2" for="exampleCheck1" onChange={()=> setIsRemeberChecked(e.target.checked)}>Remember Me</label>
                                        </div>
                                        <div className="col-6 text-end">
                                            <Link className='text-primary text-decoration-none' to='/forgotPassword'>Forget Password?</Link>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <Link type="submit" className="btn btnsubmitOwn text-white" onClick={SubmitLogin}>Submit</Link> 
                                        {/* onClick={loginApi} */}
                                    </div>
                                </form>
                          </div>
                      </div>
                  </div>
                  <Toaster/>
              </div>
          </Container>
      </>
    )
  }

export default Login