import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { addNewPackageApi, deletePlanApi, getAllPlanApi, getPlanByIdApi, updatePlanApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const ContainerCSS= styled.div`
  height: 92vh;
  overflow: scroll;
  
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }


  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
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
    margin-left: 43% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
    /* margin-left: 0.4px; */
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
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }

`;

const Packages = () => {
  
  const [DeleteWarning, setDeleteWarning]= useState(true);
  const [EditWarning, setEditWarning]= useState(true);
  const [AddWarning, setAddWarning]= useState(true);
  const [AllPlan, setAllPlan] = useState([]);
  const [bundlePackData, setBundlePackData] = useState([]);


  const [PlanIdPlanNameData, setPlanIdPlanNameData] = useState('');
  const [PlanIdPriceData, setPlanIdPriceData] = useState('');
  const [PlanIdValueData, setPlanIdValueData] = useState('');
  const [PlanIdIntervalData, setPlanIdIntervalData] = useState('');
  const [PlanIdStudentLimitData, setPlanIdStudentLimitData] = useState('');
  const [PlanIdStatusData, setPlanIdStatusData] = useState('');


  const [PlanIdPriceDataError, setPlanIdPriceDataError] = useState('');
  const [PlanIdValueDataError, setPlanIdValueDataError] = useState('');
  const [PlanIdIntervalDataError, setPlanIdIntervalDataError] = useState('');
  const [PlanIdStudentLimitDataError, setPlanIdStudentLimitDataError] = useState('');
  const [PlanIdStatusDataError, setPlanIdStatusDataError] = useState('');


  const [isChecked, setIsChecked] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(false);
  const [updatePlanId, setupdatePlanId] = useState('');

  const [statuss, setStatuss] = useState('')
  const [statussError, setStatussError] = useState('')

  const [PlanName, setPlanName] = useState('')
  const [PlanNameError, setPlanNameError] = useState('')

  const [PlanPrice, setPlanPrice] = useState('')
  const [PlanPriceError, setPlanPriceError] = useState('')

  const [PlanInterval, setPlanInterval] = useState('')
  const [PlanIntervalError, setPlanIntervalError] = useState('')

  const [PlanPeriod, setPlanPeriod] = useState('')
  const [PlanPeriodError, setPlanPeriodError] = useState('')

  const [PlanStudentLimit, setPlanStudentLimit] = useState('')
  const [PlanStudentLimitError, setPlanStudentLimitError] = useState('')

  const textRegex = /^[A-Za-z\s]+$/;
  const textAlphaRegex = /^[A-Za-z0-9\s]+$/;
  const PriceRegex =  /^[0-9\s]{1,9}[.]{1}[0-9\s]{1,9}$/;
  const NumberRegex = /^[0-9\s]+$/;


  const [refreshDelete , setRefreshDelete] = useState(false);
  const [refreshUpdate , setRefreshUpdate] = useState(false);
  const [refreshAdd , setRefreshAdd] = useState(false);
  
  
  useEffect(() => {
    getAllPlans();
  }, [refreshDelete, refreshUpdate , refreshAdd ])
  
  const PageRefreshOnDelete = () => {
    setDeleteWarning(!DeleteWarning);
    setRefreshDelete(!refreshDelete);
  }
  
  const PageRefreshOnUpdate = () => {
    setEditWarning(!EditWarning)
    setRefreshUpdate(!refreshUpdate);
  }
  
  const PageRefreshAdd = () => {
    setAddWarning(!AddWarning);
    setRefreshAdd(!refreshAdd);
  }

  const DeleteBtnClicked = (id) => {
    setDeletePlanId(id)
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

  const getPlanById = async(id) => {
    try{
      setupdatePlanId(id)
      var response = await getPlanByIdApi(id);
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setPlanIdPlanNameData(response?.data?.plans?.planName);
          setPlanIdPriceData(response?.data?.plans?.price);
          setPlanIdValueData(response?.data?.plans?.value);
          setPlanIdStudentLimitData(response?.data?.plans?.studentLimit);
          setPlanIdIntervalData(response?.data?.plans?.type);
          setPlanIdStatusData(response?.data?.plans?.status);
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


  const updatePlanById = async () => {
    if(validateEditFields()){
        try {
        const data = {
          "planName": PlanIdPlanNameData,
          "price": PlanIdPriceData,
          "type": PlanIdIntervalData,
          "value": PlanIdValueData,
          "studentLimit": PlanIdStudentLimitData,
          "status": PlanIdStatusData
        };
        var response = await updatePlanApi(updatePlanId, data);
    
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
  };
  
  const DeletePlanIdData = async(id) => {
    if(isChecked){
      try {
        var response = await deletePlanApi(id);
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




  const handleIntervalChange = (e) => {
    setPlanIdIntervalData(e.target.value);
    setPlanIdIntervalDataError(validateIntervalFields(e.target.value))
  }

  const handleValueChange = (e) => {
    setPlanIdValueData(e.target.value);
    setPlanIdValueDataError(validateNumber(e.target.value))
  }

  const handlePriceChange = (e) => {
    setPlanIdPriceData(e.target.value);
    setPlanIdPriceDataError(validatePrice(e.target.value))
  }

  const handleStatusChange = (e) => {
    setPlanIdStatusData(e.target.value);
    setPlanIdStatusDataError(validateTextFields(e.target.value))
  };

  const handleStudentlimitChange = (e) => {
    setPlanIdStudentLimitData(e.target.value);
    setPlanIdStudentLimitDataError(validateNumber(e.target.value))
  }




// *************************************************************************************************************




const handlePlanNameChange = (e) => {
  const newValue = e.target.value;
  setPlanName(newValue);
  setPlanNameError(validateTextFields(newValue));
};

const handlePlanPriceChange = (e) => {
  const newValue = e.target.value;
  setPlanPrice(newValue);
  setPlanPriceError(validatePrice(newValue));
};

const handlePlanIntervalChange = (e) => {
  const newValue = e.target.value;
  setPlanInterval(newValue);
  setPlanIntervalError(validateIntervalFields(newValue));
};

const handlePlanPeriodChange = (e) => {
  const newValue = e.target.value;
  setPlanPeriod(newValue);
  setPlanPeriodError(validateNumber(newValue));
};

const handlePlanStudentLimitChange = (e) => {
  const newValue = e.target.value;
  setPlanStudentLimit(newValue);
  setPlanStudentLimitError(validateNumber(newValue));
};

const handleStatussChange = (e) => {
  const newValue = e.target.value;
  setStatuss(newValue);
  setStatussError(validateTextFields(newValue));
};

const validatePrice = (value) => {
  if (!value.trim()) {
    return '*This Field is required';
  } else if (!PriceRegex.test(value)) {
    return 'Invalid characters in name !!';
  }
  return '';
};

const validateNumber = (value) => {
  if (!value.trim()) {
    return '*This Field is required';
  } else if (!NumberRegex.test(value)) {
    return 'Invalid characters in name !!';
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

const validateIntervalFields = (value) => {
  if (!value.trim()) {
    return '*This Field is required';
  } else if (!textRegex.test(value)) {
    return 'Invalid characters in name !!';
  }
  return '';
};

const validateFields = () => {
  let isValid = true;

  if (!PlanName) {
    setPlanNameError('* Plan Name is required');
    isValid = false;
  } else {
    setPlanNameError('');
  }

  if (!PlanPrice) {
    setPlanPriceError('* Plan Price is required');
    isValid = false;
  } else {
    setPlanPriceError('');
  }

  if (!PlanInterval) {
    setPlanIntervalError('* Plan Interval is required');
    isValid = false;
  } else {
    setPlanIntervalError('');
  }

  if (!PlanPeriod) {
    setPlanPeriodError('* Plan Period is required');
    isValid = false;
  } else {
    setPlanPeriodError('');
  }

  if (!PlanStudentLimit) {
    setPlanStudentLimitError('* Student Limit is required');
    isValid = false;
  } else {
    setPlanStudentLimitError('');
  }
  
  if (!statuss) {
    setStatussError('* Status is required');
    isValid = false;
  } else {
    setStatussError('');
  }


  return isValid;
};

const validateEditFields = () => {
  let isValid = true;

  if (!PlanIdPriceData) {
    setPlanIdPriceDataError('* Plan Price is required');
    isValid = false;
  } else {
    setPlanIdPriceDataError('');
  }

  if (!PlanIdIntervalData) {
    setPlanIdIntervalDataError('* Plan Interval is required');
    isValid = false;
  } else {
    setPlanIdIntervalDataError('');
  }

  if (!PlanIdValueData) {
    setPlanIdValueDataError('* Plan Value is required');
    isValid = false;
  } else {
    setPlanIdValueDataError('');
  }

  if (!PlanIdStudentLimitData) {
    setPlanIdStudentLimitDataError('* Student Limit is required');
    isValid = false;
  } else {
    setPlanIdStudentLimitDataError('');
  }

  if (!PlanIdStatusData) {
    setPlanIdStatusDataError('* Status is required');
    isValid = false;
  } else {
    setPlanIdStatusDataError('');
  }





  return isValid;
};


const AddNewPackage = async () => {
  if (validateFields()) {
    try {
      const data = {
          "planName": PlanName,
          "price": PlanPrice,
          "type": PlanInterval,
          // "type": valueOf(PlanInterval),
          "value": PlanPeriod,
          "studentLimit": PlanStudentLimit,
          "status": statuss
      }
      var response = await addNewPackageApi(data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.msg)
          setAddWarning(!AddWarning)
        }
      }
      else {
        console.log(response?.data?.msg);
      }
    }
    catch {
      console.log('invalid')
    }
  }
}






  return (
      <>
          <ContainerCSS>
            <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
              <div className="row pt-3">
                <div className="col-lg-7 col-md-8 col-sm-12 flex-frow-1">
                    <nav className='breadcrumnav ' aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                        <li className="breadcrumb-item active greenText" aria-current="page"><h2> Package</h2></li>
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
                      <Link className="btn ps-0 pe-0 addButtons text-white" type="submit"  data-bs-toggle="offcanvas" data-bs-target="#AddPackageCanvas" aria-controls="AddPackageCanvas"><h3 className='textVerticalCenter'>+ ADD Packages</h3></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3 for-margin-top"><h3>Manage Packages</h3></div>
              <div className="row ps-2 pe-2">
                <div className="overflow-scroll cardradius bg-white p-3">
                  <table className="table align-middle table-striped">
                    <thead>              
                      <tr>
                        <th><h2>#</h2></th>
                        <th><h2>Package</h2></th>
                        <th><h2>Price <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Interval <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Period <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Student Limit <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Bundle Details</h2></th>
                        <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Action</h2></th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllPlan.map((item, index) => (
                        <tr key={item.planId} className={`my-bg-color align-middle`}>
                          <th className='greyText'><h3>{index+1}</h3></th>
                          <td className='greyText'><h3>{item.planName}</h3></td>
                          <td className='greyText'><h3>{item.price}</h3></td>
                          <td className='greyText'><h3>{item.type}</h3></td>
                          <td className='greyText'><h3>{item.value}</h3></td>
                          <td className='greyText'><h3>{item.studentLimit}</h3></td>
                          {/* <td className='blueText'><h3>View Bundle Pack</h3></td> */}
                          <td><h3>{(item.usedAddons).length>0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#bundleModal" style={{cursor: 'pointer'}} onClick={(e)=> setBundlePackData(item.usedAddons)}>View Bundle Pack</span>:<span className='blueText text-decoration-none text-center'>---</span>}</h3></td>
                          <td>{item.status? <h3 className='activeText'> Active </h3>: <h3 className='deactiveText'> InActive </h3>}</td>
                          <td>
                            <div className="dropdown dropdownbtn">
                              <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Action</span>
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={()=>getPlanById(item.planId)}>
                                    Edit Package
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={()=>DeleteBtnClicked(item.planId)}>
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


        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="AddPackageCanvas" aria-labelledby="AddPackageCanvas">
          <div className="offcanvas-header modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Add Package</h2>
          </div>
          <div className="offcanvas-body p-1">
          <div>
            {AddWarning
              ? 
                <>
                  <form className='p-3'>
                    <div className="row mb-3">
                      <label htmlFor="BundleName" className="form-label ps-0">Plan Name</label>
                      <input type="text" className={`form-control formcontrolinput ${PlanNameError ? 'border-1 border-danger' : ''} `} placeholder='Enter Plan Name' onChange={handlePlanNameChange} />
                      <span className="text-danger">{PlanNameError}</span>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="BundleName" className="form-label ps-0">Price</label>
                      <input type="text" className={`form-control formcontrolinput ${PlanPriceError ? 'border-1 border-danger' : ''} `} placeholder='Enter Price' onChange={handlePlanPriceChange} />
                      <span className="text-danger">{PlanPriceError}</span>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="BundleName" className="form-label ps-0">Interval</label>
                      {/* <input type="text" className={`form-control formcontrolinput ${PlanIntervalError ? 'border-1 border-danger' : ''} `} placeholder='Enter Interval' onChange={handlePlanIntervalChange} /> */}
                      <select className={`form-select formcontrolinput ${PlanIntervalError ? 'border-1 border-danger' : ''} `} aria-label="Enter Interval" onChange={handlePlanIntervalChange}>
                          <option defaultValue>-- Select --</option>
                          <option value='DAYS'>Days</option>
                          <option value='WEEKS'>Weeks</option>
                          <option value='MONTHS'>Months</option>
                          <option value='YEARS'>Years</option>
                        </select>
                        <span className="text-danger">{PlanIntervalError}</span>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="BundleName" className="form-label ps-0">Period</label>
                      <input type="text" className={`form-control formcontrolinput ${PlanPeriodError ? 'border-1 border-danger' : ''} `} placeholder='Enter Period' onChange={handlePlanPeriodChange} />
                      <span className="text-danger">{PlanPeriodError}</span>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="BundleName" className="form-label ps-0">Student Limit</label>
                      <input type="text" className={`form-control formcontrolinput ${PlanStudentLimitError ? 'border-1 border-danger' : ''} `} placeholder='Enter Student Limit' onChange={handlePlanStudentLimitChange} />
                      <span className="text-danger">{PlanStudentLimitError}</span>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="BundleName" className="form-label ps-0">Status</label>
                        <select className={`form-select formcontrolinput ${statussError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleStatussChange}>
                          <option defaultValue>-- Select --</option>
                          <option value='true'>Active</option>
                          <option value='false'>InActive</option>
                        </select>
                        <span className="text-danger">{statussError}</span>
                    </div>
                    <p className='text-center p-3'>
                      <button className='btn addButtons2 text-white' onClick={AddNewPackage} type='button'>Add Package</button>
                      <button className='btn cancelButtons ms-3'>Cancel</button>
                    </p>
                  </form>

                        {/* onClick= {AddAPackageBtnClicked} */}
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
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshAdd}>Continue</button>
                    </div>
                  </div>
                </>
            
            }
            
          </div>
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
            <h2 className="offcanvas-title" id="staticBackdropLabel">Package</h2>
          </div>
          <div className="offcanvas-body p-0">
            <div>
              {EditWarning
                ? 
                  <>
                    <div>
                      <div className="modalLightBorder d-flex p-2">
                        <div className="p-2"><h2 className=''>Package</h2></div>
                        <div className="ms-auto p-2"><h2 className='orangeText'>{PlanIdPlanNameData}</h2></div>
                      </div>
                      <div className="p-3">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="exampleInputAdd1" className="form-label greyText">Price</label>
                            <input type="number" className="form-control formcontrolinput" id="exampleInputAdd1" aria-describedby="priceHelp"  value={PlanIdPriceData} onChange={handlePriceChange}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputphone1" className="form-label greyText">Interval</label>
                            <select className="form-select formcontrolinput" aria-label="Default select example" onChange={handleIntervalChange}>
                              <option value='1'>{PlanIdIntervalData}</option>
                              <option value='Days'>Days</option>
                              <option value='Weeks'>Weeks</option>
                              <option value='Months'>Months</option>
                              <option value="Year">Year</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label greyText">Period</label>
                            <input type="text" className="form-control formcontrolinput" id="exampleInputAdd1" aria-describedby="priceHelp" value={PlanIdValueData} onChange={handleValueChange}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label greyText">Student Limit</label>
                            <input type="text" className="form-control formcontrolinput" id="exampleInputAdd1" aria-describedby="priceHelp" value={PlanIdStudentLimitData} onChange={handleStudentlimitChange}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label greyText">Status</label>
                            <select className="form-select p-2 formcontrolinput" aria-label="Default select example" value={PlanIdStatusData} onChange={handleStatusChange}>
                              <option defaultValue value={PlanIdStatusData}>{PlanIdStatusData?'Active' : 'InActive'}</option>
                              <option value={!(PlanIdStatusData)}>{!PlanIdStatusData ? 'Active' : 'InActive'}</option>
                            </select>
                          </div>
                        </form>
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' onClick={() => updatePlanById()}>Update</button>
                          <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                      </div>
                    </div>
                  </>
                :
                <>
                  <div>
                    <p className='modalLightBorder p-2 mb-0'>Packages</p>
                    <div className="mt-3  ">
                      <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                      <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                        <p className='warningHeading'>Successful Updated</p>
                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                      </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnUpdate}>Continue</button>
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
              <span className="offcanvas-title" id="staticBackdropLabel">Packages</span>
            </div>
            <div className="offcanvas-body p-0">
              <div>
              {DeleteWarning
                ?
                  <>
                    <div className=''>
                      <p className='modalLightBorder p-2'>Packages</p>
                      <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                      <p className='text-center warningHeading'>Are you Sure?</p>
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br/>the Profile Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)}/>I Agree to delete the Profile Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => DeletePlanIdData(deletePlanId)}>Delete</button>
                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                :
                  <>
                    <div >
                      <p className='border-bottom p-3'>Packages</p>
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




          <div className="modal fade" id="bundleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                      {bundlePackData.map((item, index) => (
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
      </ContainerCSS>
    </>
  )
}

export default Packages