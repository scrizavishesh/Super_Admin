import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { deletePerByidApi, deleteSpeFeaByidApi, getAllSpeFeatApi, getPermBySpeFeaIdApi, updateSpeFeaNameApi } from '../Utils/Apis';
import toast, {Toaster} from 'react-hot-toast';

const ContainerCSS= styled.div`

  height: 92vh;
  overflow: scroll;
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}


  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .greyText{
    color: var(--greyInputTextColor);
  }

  .successText{
    color: var(--darkGreenBorderColor);
  }

  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
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
    margin-left: 43% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
  }


`;

const Addon = () => {
  
const token = localStorage.getItem('token');
const [DeleteWarning, setDeleteWarning]= useState(true);
// const [EditAddonWarn, setEditAddonWarn]= useState(true);
const [EditBundleWarn, setEditBundleWarn]= useState(true);
const [EditFeatureWarn, setEditFeatureWarn]= useState(true);
const [EditBundleName, setEditBundleName]= useState('');
const [EditBundleId, setEditBundleId]= useState('');
const [deletFeatureId, setdeletFeatureId]= useState('');
const [newBundleName, setNewBundleName]= useState('');
const [newBundleNameError, setNewBundleNameError]= useState('');
const [EditPerNameBySpeFeaId, setEditNamePerBySpeFeaId]= useState('');
const [PerDataBySpeFeaId, setPerDataBySpeFeaId]= useState([]);
const [isChecked, setIsChecked] = useState(false);

const [allSpeFeature, setAllSpeFeature] = useState([]);

const [refreshDelete , setRefreshDelete] = useState(false);
const [refreshUpdate , setRefreshUpdate] = useState(false);
const [refreshFeature , setRefreshFeature] = useState(false);

const [searchInputText, setSearchInputText] = useState('')

useEffect(() => {
  getAllSpecialFeature();
}, [token, refreshDelete, refreshUpdate , refreshFeature , PerDataBySpeFeaId])

const PageRefreshOnDelete = () => {
  setDeleteWarning(!DeleteWarning);
  setRefreshDelete(!refreshDelete);
}

const PageRefreshOnUpdate = () => {
  setEditBundleWarn(!EditBundleWarn)
  setRefreshUpdate(!refreshUpdate);
}

const PageRefreshFeature = () => {
  setEditFeatureWarn(!EditFeatureWarn);
  setRefreshFeature(!refreshFeature);
}

const getAllSpecialFeature = async() => {
  try{
    console.log(searchInputText, 'searched Text')
    const formData = new FormData();
    if(searchInputText !== '')
    {
      formData.append("key" , searchInputText);
    }

    var response = await getAllSpeFeatApi(formData);
    if(response?.status===200){
      if(response?.data?.status==='success'){
        setAllSpeFeature(response?.data?.addons);
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

const getPermBySpeFeaId = async(FeatureId, FeatureName) => {
  try{
    console.log(FeatureId)
    setEditNamePerBySpeFeaId(FeatureName);
    var response = await getPermBySpeFeaIdApi(FeatureId);
    if(response?.status===200){
      if(response?.data?.status==='success'){
         setPerDataBySpeFeaId(response?.data?.permissions);
      }
    }
    else{
      console.log(response?.data?.msg);
    }
  }
  catch{

  }
}

const UpdateSpeFeaName = async() => {
  if(validateFields){
    try{
      console.log(EditBundleId, 'feature Id')
      const data = {
        "featureName": newBundleName !== '' ? newBundleName : EditBundleName
      }
      console.log(data)
      var response = await updateSpeFeaNameApi(EditBundleId, data);
      if(response?.status===200){
        console.log('200')
        if(response?.data?.status==='success'){
          console.log(response?.data?.msg)
          setEditBundleWarn(!EditBundleWarn)
          console.log('success')
          // setPerDataBySpeFeaId(response?.data?.permissions)
        }
        else{
          console.log(response?.data?.msg)
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{
  
    }
  }
}

const removePerBySpeFeaId = async(permId) => {
  try {
    var response = await deletePerByidApi(permId);
    if (response?.status === 200) {
      if(response.data.status==='success'){
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

const deleteSpeFeaById = async(speFeaID) => {
  if(isChecked){
    try {
      var response = await deleteSpeFeaByidApi(speFeaID);
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

// const DeleteBtnClicked = (value) => {
//   setDeleteWarning(value)
// }

// const EditAddonBtnClicked = (value) => {
//   setEditAddonWarn(!EditAddonWarn)
// }

// const EditBundleBtnClicked = (value) => {
//   setEditBundleWarn(value)
// }

const EditFeatureBtnClicked = () => {
  setEditFeatureWarn(!EditFeatureWarn)
}

const updatingBundleName = (e) => {
  setNewBundleName(e)
  setNewBundleNameError(validateTextFields(e))
}


const validateFields = () => {
  let isValid = true;

  if (!statuss) {
    setStatusError('* Status is required');
    isValid = false;
  } else {
    setStatusError('');
  }

  return isValid;
};

const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

const validateTextFields = (value) => {
  if (!value.trim()) {
    return '*This Field is required';
  } else if (!textAlphaRegex.test(value)) {
    return 'Invalid characters in name !!';
  }
  return '';
};

  return (
      <>
        <ContainerCSS>
          <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
            <div className="row pt-3">
              <div className="col-lg-7 col-md-8 col-sm-12 flex-frow-1">
                  <nav className='breadcrumnav' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                      <li className="breadcrumb-item active greenText" aria-current="page"><h2> Addon</h2></li>
                    </ol>
                  </nav>
              </div>
              <div className="col-lg-5 col-md-8 col-sm-12">
                <div className="row">
                  <div className="col-md-9 col-sm-6">
                    <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" onChange={(e)=> setSearchInputText(e.target.value)}/>
                      <button className="btn searchButtons text-white" type="button" onClick={getAllSpecialFeature}><h2>Search</h2></button>
                    </form>
                  </div>
                  <div className="col-md-3 col-sm-6 text-end ps-0">
                    <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addAddons'><h2 className='textVerticalCenter'>+ ADD Addon</h2></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 for-margin-top"><h2>Manage Addons</h2></div>
            <div className="row ps-2 pe-2">
              <div className="overflow-scroll cardradius bg-white p-3">
                <table className="table align-middle table-striped">
                  <thead>
                  
                    <tr>
                      <th><h2>#</h2></th>
                      <th><h2>Bundle Name</h2></th>
                      <th><h2>Feature</h2></th>
                      <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                      <th><h2>Action</h2></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSpeFeature.map((item, index)=>(
                      <tr key={item.planFeatureId}>
                        <th className='greyText'><h3>{index+1}</h3></th>
                        <td className='greyText'><h3>{item.featureName}</h3></td>
                        <td className='greyText'><h3>{item.feaPermission.map(permission => permission.perName).join(', ')}</h3></td>
                        <td>{item.status? <h3 className='activeText'> Active </h3>: <h3 className='deactiveText'> InActive </h3>}</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <span>Action</span>
                            </button>
                            <ul className="dropdown-menu">
                              {/* <li className='p-1'>
                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_addon" aria-controls="Edit_addon">
                                  Edit Addon
                                </button>
                              </li> */}
                              <li className='p-1'>
                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_bundle" aria-controls="Edit_bundle" onClick={(e) => {setEditBundleName(item.featureName),setEditBundleId(item.planFeatureId)}}>
                                  Edit Bundle
                                </button>
                              </li>
                              <li className='p-1'>
                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_feature" aria-controls="Edit_feature" onClick={(e)=> getPermBySpeFeaId(item.planFeatureId, item.featureName)}>
                                  Edit Feature
                                </button>
                              </li>
                              <li className='p-1'>
                                {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setdeletFeatureId(item.planFeatureId)}>
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
{/* 
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_addon" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
            </div>
            <div className="offcanvas-body p-0">
              <div>
                {EditAddonWarn
                  ? 
                    <>
                      <div>
                        <div className="modalLightBorder d-flex p-2">
                          <div className="p-2"><h3 className=''>Addon</h3></div>
                          <div className="ms-auto p-2"><h3 className='orangeText'>HR Management</h3></div>
                        </div>
                        <div className="ps-3 pe-3">
                          <table className="table mt-2">
                            <thead>
                              <tr height='40px'>
                                <th><small>Details</small></th>
                                <th className='text-primary'></th>
                              </tr>
                            </thead>
                            <tbody>
                            {allSpeFeature.map((item)=>(
                              <tr height='40px'>
                                <td className='eventalerow'><small className='greyText ps-2'>{item.featureName}</small></td>
                                <td className='text-end '><small className='p-1 pe-2'><input className="form-check-input formEditSpecFeatcheck" type="checkbox" value="" id="flexCheckChecked"/></small></td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                          <p className='text-center p-3'>
                            <button className='btn updateButtons text-white' onClick={(e) => EditAddonBtnClicked(item.planFeatureId)}>Update</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                          </p>
                        </div>
                      </div>
                    </>
                  :
                    <>
                      <div>
                        <p className='modalLightBorder p-2 mb-0'>Addon</p>
                        <div className="mt-3  ">
                          <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                          <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                            <p className='warningHeading'>Successful Updated</p>
                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                          </div>
                            <button className='btn contbtn continueButtons text-white' onClick={PageRefreshOnUpdate}>Continue</button>
                        </div>
                      </div>
                    </>
                }
              </div>
          </div>
          </div> */}


  {/* ***********************************************************************************************************************************************************************************/}
  {/* ***********************************************************************************************************************************************************************************/}

          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_bundle" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Bundle Name</h2>
            </div>
            <div className="offcanvas-body p-0">
              <div>
                {EditBundleWarn
                  ? 
                    <>
                      <div className="p-3">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="BundleName" className="form-label greyText">Bundle Name</label>
                            <input type="text" className={`form-control p-2 formcontrolinput ${newBundleNameError ? 'border border-danger' : ''}`} id="BundleName" defaultValue={EditBundleName} onChange={(e)=> updatingBundleName(e.target.value)}/>
                            <span className='text-danger'>{newBundleNameError}</span>
                          </div>
                        </form>
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' onClick={(e) => UpdateSpeFeaName(e)}>Update</button> 
                          <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                      </div>
                    </>
                  :
                    <>
                      <div>
                        <p className='modalLightBorder p-2 mb-0'>Bundle Name</p>
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

          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_feature" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
            </div>
            <div className="offcanvas-body p-0">
              <div>
                {EditFeatureWarn
                  ? 
                    <>
                      <div>
                        <div className="modalLightBorder d-flex p-2">
                          <div className="p-2"><h3 className='greyText'>Bundle Name</h3></div>
                          <div className="ms-auto p-2"><h3 className='successText'>HR Management</h3></div>
                        </div>
                        <div className="p-3">
                          <h3 className='greyText'>Features</h3>
                          {PerDataBySpeFeaId.map((item) => (
                            <>
                            <div className="d-flex mt-3 border p-2">
                              <div className=" flex-grow-1"><h3>{item.perName}</h3></div>
                              <div className=""><h3 onClick={()=> removePerBySpeFeaId(item.feaPerId)} style={{cursor: 'pointer'}}><Icon icon="bitcoin-icons:cross-outline" width="1.5em" height="1.5em"  style={{color: 'black'}} /></h3></div>
                            </div>
                            </>
                          ))}
                          <p className='text-center p-3'>
                            <button className='btn updateButtons text-white' onClick={() => EditFeatureBtnClicked()}>Update</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                          </p>
                        </div>
                      </div>
                    </>
                  :
                    <>
                      <div>
                        <p className='modalLightBorder p-2 mb-0'>Bundle Name</p>
                        <div className="mt-3  ">
                          <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                          <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                            <p className='warningHeading'>Successful Updated</p>
                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                          </div>
                            <button className='btn contbtn continueButtons text-white' onClick={PageRefreshFeature}>Continue</button>
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
                        <button className='btn deleteButtons text-white' onClick={() => deleteSpeFeaById(deletFeatureId)}>Delete</button>
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

<Toaster/>
          </div>
        </ContainerCSS>
      </>
  )
}

export default Addon