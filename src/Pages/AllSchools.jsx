//validation 

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { deleteSchoolApi, getAllActiveInActiveSpeFeatApi, getAllPlanApi, getAllSpeFeatApi, getPlanInFeatureApi, getSchoolDataApi, getSchoolDataByIdApi, updateSchoolApi } from '../Utils/Apis';
import { Icon } from '@iconify/react';


const Container = styled.div`
  height: 92vh;
  overflow: scroll;
  
  .scrollHide::-webkit-scrollbar{
    display: none !important;
  }

  .table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
  }

  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .oddModaltablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
    border-bottom: 1.5px solid var(--darkGreenBorderColor);
  }

  .form-check-input{
    box-shadow: none ;
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .formEditSpecFeatcheck:checked{
    background-color: #00A67E;
    border-color: #00A67E;
  }

  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .correvtSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .deleteSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }
  
  .warningHeading{
    font-size: var(--font-size-20);
  }

  .warningText{
    font-size: var(--font-size-15);
    line-height: 22px;
    color: var(--greyInputTextColor) !important;
  }

  .textVerticalCenter{
    line-height: 22px;
  }
  
  .form-check-input{
    width: 18px;
    height: 18px;
  }

  .formcontrolinput{
    border-radius: 0px !important;
  }

  .contbtn{
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
  }

  .form-control, .form-control::placeholder, .form-select{
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
    
  }

  .form-control, .form-select{
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus{
    box-shadow: none !important;
    color: var(--greyInputTextColor) !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }
`;

const AllSchools = () => {

  const token = localStorage.getItem('token');
  const [schoolData, setSchoolData]= useState([]);

  const [getSchoolIdDataName, setgetSchoolIdDataName]= useState([]);
  const [getSchoolIdDataAddress, setgetSchoolIdDataAddress]= useState([]);
  const [getSchoolIdDataPhone, setgetSchoolIdDataPhone]= useState([]);
  const [getSchoolIdDataPackage, setgetSchoolIdDataPackage]= useState([]);
  const [getSchoolIdDataPackageId, setgetSchoolIdDataPackageId]= useState([]);
  const [getSchoolIdDataStatuus, setgetSchoolIdDataStatuus]= useState([]);

  const [updateFeatureId, setUpdateFeatureId]= useState([]);




  const [isChecked, setIsChecked] = useState(false);
  const [deleteSchoolId, setDeleteSchoolId] = useState(false);
  const [allActiveInActiveSpeFeature, SetAllActiveInActiveSpeFeature] = useState([]);
  const [allPlans, setAllPlan] = useState([])
  const [viewFeaturesData, setViewFeaturesData] = useState([])

  const [isCheckedFeature, setIsCheckedFeature] = useState(false);
  
  const [DeleteWarning, setDeleteWarning]= useState(true);
  const [EditWarning, setEditWarning]= useState(true);
  const [SpecialFeatureWarning, setSpecialFeatureWarning]= useState(true);

  const [UpdateSpecialFeatureWarning, setUpdateSpecialFeatureWarning]= useState(true);

  const [statussError, setStatusError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [PhoneError, setPhoneError] = useState('')
  const [packaageError, setPackageError] = useState('')

  const [updateSchoolId, setupdateSchoolId] = useState('')

  const [upadteSpeFeature, setUpadteSpeFeature] = useState('')

  const [refreshPage , setRefreshPage] = useState(false);
  const [refreshDelete , setRefreshDelete] = useState(false);
  const [refreshUpdate , setRefreshUpdate] = useState(false);
  const [refreshSpeFeaUpdate , setRefreshSpeFeaUpdate] = useState(false);





  const DeleteBtnClicked = (id) => {
    setDeleteSchoolId(id)
  }

  const SpeFeatBtnClicked = () => {
    setSpecialFeatureWarning(!SpecialFeatureWarning)
  }

  const handleCheckboxChange = (id) => {
    setIsCheckedFeature(!isCheckedFeature);
    setUpdateFeatureId(id)
    UpdateFeatureInPlan()
  };

  const UpdateFeatureInPlan = async() => {
    console.log(id)
    try{
      const data = updateFeatureId;
      var response = await getPlanInFeatureApi( id, data);
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setUpadteSpeFeature(response?.data?.addons);
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }

  } 

  useEffect(() => {
    getAllSchoolData();
    getAllSpeFeatApi();
    getAllPlans();
  }, [token, refreshDelete, refreshUpdate, refreshPage])//, schoolData, allPlans

  const PageRefresh = () => {
    setUpdateSpecialFeatureWarning(!UpdateSpecialFeatureWarning);
    setRefreshPage(!refreshPage);
  }

  const PageRefreshOnDelete = () => {
    setDeleteWarning(!DeleteWarning);
    setRefreshDelete(!refreshDelete);
  }

  const PageRefreshOnUpdate = () => {
    setEditWarning(!EditWarning);
    setRefreshUpdate(!refreshUpdate);
  }

  const PageRefreshSpeFeaUpdate = () => {
    setSpecialFeatureWarning(!SpecialFeatureWarning);
    setRefreshSpeFeaUpdate(!refreshSpeFeaUpdate);
  }

  const getAllSchoolData = async() => {
    try{
      var response = await getSchoolDataApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setSchoolData(response?.data?.schools);
          toast.success(response.data.msg)
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }
  
  const getSchoolDataById = async(id) => {
    try{
      setupdateSchoolId(id)
      var response = await getSchoolDataByIdApi(id);
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setgetSchoolIdDataName(response?.data?.school?.schoolName);
          setgetSchoolIdDataAddress(response?.data?.school?.schoolAddress);
          setgetSchoolIdDataPhone(response?.data?.school?.schoolPhone);
          setgetSchoolIdDataPackage(response?.data?.school?.plans?.planName);
          setgetSchoolIdDataPackageId(response?.data?.school?.plans?.planId);
          setgetSchoolIdDataStatuus(response?.data?.school?.status);
          setSpeFeaDataBySchoolId(response?.data?.school?.plans?.usedAddons)
          toast.success(response?.data?.msg)
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }

  const UpdateSchoolByID = async () => {
    if(validateFields){
      try {
        const formData = new FormData();
        formData.append("schoolAddress", getSchoolIdDataAddress ),
        formData.append("schoolPhone", parseInt(getSchoolIdDataPhone)),
        formData.append("planId", parseInt(getSchoolIdDataPackageId)),
        formData.append("status", getSchoolIdDataStatuus)
        var response = await updateSchoolApi(updateSchoolId, formData);
    
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            setEditWarning(!EditWarning);
            toast.success(response?.data?.msg)
          }
        } else {
          toast.error(response?.error);
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    }
  }

  const DeleteSchoolIdData = async(schoolId) => {
    if(isChecked){
      try {
        var response = await deleteSchoolApi(schoolId);
        if (response?.status === 200) {
          if(response.data.status==='success'){
            setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.msg)
          }
        } 
        else {
          toast.error(response?.error);
        }
      }
      catch (error) {
          console.error('Error during login:', error);
      }
    }
  }


  const getAllSpecialFeature = async(planIdd) => {
    try{
      var response = await getAllActiveInActiveSpeFeatApi(planIdd);
      if(response?.status===200){
        if(response?.data?.status==='success'){
          toast.success(response?.data?.msg)
          SetAllActiveInActiveSpeFeature(response?.data?.features);
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{
      console.log(error)
    }
  }

  const getAllPlans = async() => {
    try{
      var response = await getAllPlanApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setAllPlan(response?.data?.plans);
          toast.success(response?.data?.msg)
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }


  const handleAddressChange = (e) => {
    const newValue = e.target.value;
    setgetSchoolIdDataAddress(newValue);
    setAddressError(validateTextFields(newValue))
  };

  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setgetSchoolIdDataPhone(newValue);
    setPhoneError(validatePhone(newValue))
  };

  const handlePackageChange = (e) => {
    const newValue = e;
    setgetSchoolIdDataPackageId(newValue);
    setPackageError(validateNum(newValue))
  };

  const handleStatusChange = (e) => {
    const newValue = e;
    setgetSchoolIdDataStatuus(newValue);
    setStatusError(validateTextFields(newValue))
  };

  const PhoneRegex = /^[6-9]\d{9}$/;
  const NumRegex = /^[0-9]/;
  const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

  const validatePhone = (value) => {
    if (!value.trim()) {
      return '*Phone is required';
    } else if (!PhoneRegex.test(value)) {
      return 'Invalid phone format !!';
    }
    return '';
  };

  const validateNum = (value) => {
    if (!value.trim()) {
      return '*PlanId is required';
    } else if (!NumRegex.test(value)) {
      return 'Invalid phone format !!';
    }
    return '';
  };

  const validateTextFields = (value) => {
      if (!value.trim()) {
        return '*This Field is required';
      } else if (!textAlphaRegex.test(value)) {
        return 'Invalid characters in name !!';
      }
      return '';
  };

  const validateFields = () => {
    let isValid = true;

    if (getSchoolIdDataStatuus==='') {
      setStatusError('* Status is required');
      isValid = false;
    } else {
      setStatusError('');
    }
    if (getSchoolIdDataAddress ==='') {
      setAddressError('* Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }
    if (getSchoolIdDataPhone==='') {
      setPhoneError('* Phone is required');
      isValid = false;
    } else {
      setPhoneError('');
    }
    if (getSchoolIdDataPackageId==='') {
      setPackageError('* Package is required');
      isValid = false;
    } else {
      setPackageError('');
    }

    return isValid;
  };



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
            <div className=" cardradius bg-white p-3">
              <table className="table align-middle overflow-scroll table-striped">
                <thead>
                  <tr>
                    <th><h2>#</h2></th>
                    <th><h2>School name</h2></th>
                    <th><h2>Address</h2></th>
                    <th><h2>Phone</h2></th>
                    <th><h2>Package <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th className='bolddText'><h2>Spe. Features</h2></th>
                    <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Action</h2></th>
                  </tr>
                </thead>
                <tbody>
                  {schoolData.map((item, index) => (
                    <tr key={item.id} className='my-bg-color align-middle'>
                    <th className='greyText'><h3>{index+1}</h3></th>
                    <td className='greyText'><h3>{item.schoolName}</h3></td>
                    <td className='greyText'><h3>{item.schoolAddress}</h3></td>
                    <td className='greyText'><h3>{item.schoolPhone}</h3></td>
                    <td className='greyText'><h3>{item.plans.planName}</h3></td>
                    <td><h3>{(item.plans.usedAddons).length>0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#specialFeaturesModal" style={{cursor: 'pointer'}} onClick={(e)=> setViewFeaturesData(item.plans.usedAddons)}>View Features</span>:<span className='blueText text-decoration-none text-center' style={{cursor: 'pointer'}}>---</span>}</h3></td>
                    <td className='blueText text-center'>
                      <h3>
                        {item.plans.usedAddons.map((item2, index2)=>(
                          <span key={index2}>
                            {item2.planFeatureId}
                            {index2 < item.plans.usedAddons.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </h3>
                    </td>
                    <td>{item.status? <h3 className='activeText'> Active </h3>: <h3 className='deactiveText'> InActive </h3>}</td>
                    <td>
                      <div className="dropdown dropdownbtn">
                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span>Action</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={()=>getSchoolDataById(item.schoolId)}>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.plans.planId)}>
                              Spe. Features
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={()=>DeleteBtnClicked(item.schoolId)}>
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
          
            </div>
          </div>



  {/* ***********************************************************************************************************************************************************************************/}
  {/* ***********************************************************************************************************************************************************************************/}



          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
            </div>
            <div className="offcanvas-body p-0">
              <div>
                {EditWarning
                  ? 
                    <>
                      <div>
                        <p className='modalLightBorder orangeText p-2'>{getSchoolIdDataName}</p>
                        <div className="p-3">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="exampleInputAdd1" className='form-label greyText'>Address</label>
                              <textarea type="address" className={`form-control p-2 formcontrolinput ${addressError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" rows={2} value={getSchoolIdDataAddress} onChange={handleAddressChange}></textarea>
                              <span className='text-danger'>{addressError}</span>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleInputphone1" className='form-label greyText'>Phone Number</label>
                              <input type="tel" className={`form-control p-2 formcontrolinput ${PhoneError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="phoneHelp" value={getSchoolIdDataPhone} onChange={handlePhoneChange}/>
                              <span className='text-danger'>{PhoneError}</span>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className='form-label greyText'>Package</label>
                              <select className={`form-select ${packaageError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) =>handlePackageChange(e. target.value)}>
                              
                                <option defaultValue value={getSchoolIdDataPackageId}>{getSchoolIdDataPackage}</option>

                                {allPlans.map((option,ind) => (
                                  <option key={ind} value={option.planId}>
                                    {option.planName}
                                  </option>
                                ))}

                              </select>
                              <span className='text-danger'>{packaageError}</span>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className='form-label greyText'>Status</label>
                              <select className={`form-select p-2 formcontrolinput ${statussError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) =>handleStatusChange(e. target.value)}>
                                <option defaultValue value={getSchoolIdDataStatuus}>{getSchoolIdDataStatuus?'Active' : 'InActive'}</option>
                                <option value={!(getSchoolIdDataStatuus)}>{!getSchoolIdDataStatuus ? 'Active' : 'InActive'}</option>
                              </select>
                              <span className='text-danger'>{statussError}</span>
                            </div>
                          </form>
                          <p className='text-center p-3'>
                            <button className='btn updateButtons text-white' onClick={() => UpdateSchoolByID()}>Update</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefresh}>Cancel</button>
                          </p>
                        </div>
                      </div>
                    </>
                  :
                    <>
                      <div>
                        <p className='modalLightBorder p-2 mb-0'>School List</p>
                        <div className="mt-3  ">
                          <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                          <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                            <p className='warningHeading'>Successful Updated</p>
                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                          </div>
                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas"  aria-label="Close" onClick={PageRefreshOnUpdate}>Continue</button>
                        </div>
                      </div>
                    </>
                }
              </div>
          </div>
          </div>



  {/* ***********************************************************************************************************************************************************************************/}
  {/* ***********************************************************************************************************************************************************************************/}



          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="SpeFeature_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Special Features Details</h2>
            </div>
            <div className="offcanvas-body p-0">
            <div>
              {SpecialFeatureWarning
                ? 
                
                  <>
                    {UpdateSpecialFeatureWarning
                      ?
                        <>
                          <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                          <div className="ps-3 pe-3">
                            <table className="table table-striped mt-2">
                              <thead>
                                <tr height='40px'>
                                  <th><h2>Details</h2></th>
                                  <td className='text-end'><Link className='greenText text-decoration-none' onClick={() => getAllActiveInActiveSpeFeatApi()}><h2>Add Features</h2></Link></td>
                                </tr>
                              </thead>
                              <tbody>
                                

                                {allActiveInActiveSpeFeature.map((item, index) => (
                                  <tr height='40px' key={index}>
                                    <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                    <td className='text-end'>{(item?.planStatus) ? <h3 className='p-1 pe-2'><Icon icon="simple-icons:ticktick" width="1.5em" height="1.5em"  style={{color: '#00A67E', cursor: 'pointer'}} /></h3> : <h3 className='ps-3'>---</h3>}</td>
                                  </tr>
                                ))}


                              </tbody>
                            </table>
                            <p className='text-center p-3'>
                              <button className='btn cancelButtons ms-3' onClick={PageRefresh}>Back</button>
                            </p>
                          </div>
                        </>
                      :
                        <>
                          <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                          <div className="ps-3 pe-3">
                            <table className="table table-striped mt-2">
                              <thead>
                                <tr height='40px'>
                                  <th><h2>Details</h2></th>
                                  <td className='greenText'></td>
                                </tr>
                              </thead>
                              <tbody>


                                {allActiveInActiveSpeFeature.map((item, index) => (
                                  <tr height='40px' key={index}>
                                    <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                    <td className='text-end'>
                                      {(item?.planStatus) 
                                        ? 
                                          <h3 className='p-1 pe-1'>
                                            <Icon icon="ion:checkbox" width="1.5em" height="1.5em"  style={{color: '#00A67E', cursor: 'pointer'}} />
                                          </h3>
                                        : 
                                          <h3 onClick={()=>handleCheckboxChange(item.planFeatureId)}>
                                            {isCheckedFeature 
                                              ? 
                                                <h3 className='p-1 pe-1'>
                                                  <Icon icon="ion:checkbox" width="1.5em" height="1.5em"  style={{color: '#00A67E', cursor: 'pointer'}} /> 
                                                </h3>
                                              : 
                                                <Icon icon="bxs:checkbox" width="2.1em" height="2.1em"  style={{color: '#fff', cursor: 'pointer'}} />
                                            }
                                          </h3>
                                        }
                                    </td>
                                  </tr>
                                ))}


                              </tbody>
                            </table>
                            <p className='text-center p-3'>
                              <button className='btn updateButtons text-white' onClick={(e) => SpeFeatBtnClicked(false)}>Update</button>
                              <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefresh}>Cancel</button>
                            </p>
                          </div>
                        </>
                    }
                  </>

                :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>School List</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                          <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshSpeFeaUpdate}>Continue</button>
                      </div>
                    </div>
                  </>
              
              }
              
            </div>
          </div>
          </div>



  {/* ***********************************************************************************************************************************************************************************/}
  {/* ***********************************************************************************************************************************************************************************/}



          
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header ps-0 modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <span className="offcanvas-title" id="staticBackdropLabel">School List</span>
            </div>
            <div className="offcanvas-body p-0">
              <div>
              {DeleteWarning
                ?
                  <>
                    <div className=''>
                      <p className='modalLightBorder p-2'>School List</p>
                      <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                      <p className='text-center warningHeading'>Are you Sure?</p>
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br/>the Profile Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)}/>I Agree to delete the Profile Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => DeleteSchoolIdData(deleteSchoolId)}>Delete</button>
                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                :
                  <>
                    <div >
                      <p className='border-bottom p-3'>School List</p>
                      <div className="">
                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                            <p className='warningHeading'>Successful Deleted</p>
                            <p className='greyText warningText pt-2'>Your data has been<br/>Successfully Delete</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnDelete}>Continue</button>
                      </div>
                    </div>
                  </>
              }
              </div>
            </div>
          </div>



  {/* ***********************************************************************************************************************************************************************************/}
  {/* ***********************************************************************************************************************************************************************************/}


  <div className="modal fade" id="specialFeaturesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Special Features</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Feature Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {viewFeaturesData.map((item, index) => (
                <tr key={item.id} className=' align-middle'>
                  <td>{index+1}.</td>
                  <td>{item.featureName}</td>
                  <td>{item.status ? <span className='activeText'>Active</span> : <span className='deactiveText'>InActive</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

              
        <Toaster/>
        </div>
      </Container>
    </>
  )
}

export default AllSchools