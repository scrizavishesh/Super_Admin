import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { getSchoolDataByIdApi } from '../Utils/Apis';
import { Icon } from '@iconify/react';


const Container = styled.div`
  height: 92vh;
  overflow: scroll;
  


  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

`;

const ViewSchoolDetails = () => {

  const { schoolId } = useParams();
  console.log(schoolId)

  const token = localStorage.getItem('token');
  const [getSchoolIdData, setgetSchoolIdData]= useState([])

  useEffect(() => {
    getSchoolDataById();
  }, [token])

  
  const getSchoolDataById = async() => {
    try{
      var response = await getSchoolDataByIdApi(schoolId);
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setgetSchoolIdData(response?.data?.school);
          toast.success(response?.data?.msg);
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }

  return (
    <>
        <Container className='scrollHide'>
            <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
                <div className="row pt-2">
                    <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
                        <nav className='breadcrumnav' aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                            <li className="breadcrumb-item active greenText" aria-current="page"><h2> Schools</h2></li>
                        </ol>
                        </nav>
                    </div>
                    <div className="col-lg-5 col-md-8 col-sm-12">
                    <div className="row">
                        <div className="col-md-9 col-sm-6">
                        <form className="d-flex" role="search">
                            <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn searchButtons text-white" type="submit"><h2>Search</h2></button>
                        </form>
                        </div>
                        <div className="col-md-3 col-sm-6 text-end ps-0">
                        <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addSchoolsPage'><h2 className='textVerticalCenter'>+ ADD Schools</h2></Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="row mb-3 for-margin-top"><h2>School List</h2></div>
                <div className="row ps-2 pe-2">
                    <div className="cardradius bg-white p-5 d-flex justify-content-center">
                        <div className='p-3 border rounded'>
                            {/*  */}
                            <div className="row pt-3 ">
                              <div className="col-md-7">
                                <div className="row schoolNameDetails p-4">
                                  <h4 className='p-0 font26 orangeHighlightText'>{getSchoolIdData?.schoolName}</h4>
                                  <div className='p-0 pt-3 dottedTopBorder'>
                                    <h2 className='text-white'><b>Street :</b> 14, B, Liladhar Mansion, 2nd Lane, Khetwadi</h2>
                                    <h2 className='text-white mt-2'>City : Mumbai, State: Maharashtra</h2>
                                    {/* <h2 className='text-white mt-2'>City : {getSchoolIdData?.schoolAddress}</h2> */}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className='col-md-5'>
                                    <h3 className='greyText'><Icon className='me-2' icon="bxs:phone-call" width="1.5em" height="1.5em"  style={{color: '#00A67E'}} />Phone Number :</h3>
                                    <h3 className='greyText mt-2'><Icon className='me-2' icon="material-symbols:list-alt-outline" width="1.5em" height="1.5em"  style={{color: '#00A67E'}} />Plan : </h3>
                                  </div>
                                  <div className='col-md-5'>
                                    <h3 className=''>{getSchoolIdData?.schoolPhone}</h3>
                                    <h3 className='mt-2'>{getSchoolIdData?.plans?.planName}</h3>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div className="row"><img src="" alt="" /></div>
                              </div>
                            </div>
                            <p className='text-center p-3'>
                              <button className='btn addButtons text-white' type='button'>Print</button>
                              <button className='btn cancelButtons ms-3'>Cancel</button>
                            </p>
                        </div>
                    </div>
                </div>

                    
                <Toaster/>
            </div>
        </Container>
    </>
  )
}

export default ViewSchoolDetails