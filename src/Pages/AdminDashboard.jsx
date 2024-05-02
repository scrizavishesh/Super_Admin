import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import LineChart from '../Charts/LineChart';
import { RequestGetApi, getAllPlanApi, getDashDataApi, getSchoolDataApi } from '../Utils/Apis';

const Container = styled.div`
  height: 92vh;
  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar{
    display: none !important;
  }

  .heightt{
    height: 100% !important;
  }
  
  .card{
    border-radius: 10px;
    border: 1px solid var(--greyborderColor)
  }

  .latestreqDiv h3{
    line-height: 26px !important;
  }

  .latestreqDiv{
    max-height: 5em !important; 
    overflow-y: auto;
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .bgOrange{
    width: fit-content;
    background-color: var(--activeOrangeBorder);
  }

`;


const AdminDashboard = () => {

  const token = localStorage.getItem('token');
  const [DashData, setDashData] = useState([]);
  const [schoolData, setSchoolData]= useState([]);
  const [AllPlan, setAllPlan] = useState([]);
  const [AllRequest, setAllRequest] = useState([]);

  useEffect(()=>{
    getDashData();
    getAllSchoolData();
    getAllPlans();
    getAllRequest();
  }, [])


  const getDashData = async() => {
    try{
      var response = await getDashDataApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setDashData(response?.data?.totalData);
          console.log(response?.data?.totalData, 'Dash Data')
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }

  const getAllSchoolData = async() => {
    try{
      var response = await getSchoolDataApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setSchoolData(response?.data?.schools);
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }

  const getAllPlans = async() => {
    try{
      var response = await getAllPlanApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setAllPlan(response?.data?.plans);
        }
      }
      else{
        console.log(response?.data?.msg);
      }
    }
    catch{

    }
  }

  const getAllRequest = async() => {
    try{
      var response = await RequestGetApi();
      if(response?.status===200){
        if(response?.data?.status==='success'){
          setAllRequest(response?.data?.requests);
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
      <Container>
          <div className="container-fluid ps-4 pe-4 pt-2 pb-2">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Schools</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div>
                      <div className="flex-shrink-1"><Link to='/allSchoolsPage'><img src="./images/Vector.svg" alt="" height={20}/></Link></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Addons</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>{DashData.totalAddOns}</h1></div>
                      <div className="flex-shrink-1"><Link to='/addons'><img src="./images/Vector.svg" alt="" height={20}/></Link></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Subscriptions</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>{DashData.totalSubscription}</h1></div>
                      <div className="flex-shrink-1"><Link to='/subscriptionPage'><img src="./images/Vector.svg" alt="" height={20}/></Link></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Packages Details</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>{DashData.totalPackage}</h1></div>
                      <div className="flex-shrink-1"><Link to='/allPackagesPage'><img src="./images/Vector.svg" alt="" height={20}/></Link></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>School Details</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/allSchoolsPage'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="overflow-scroll">
                    <table className="table mt-2 mb-0">
                      <tbody>
                        {schoolData.slice(0, 8).map((item) => (
                          <tr key={item.id}>
                            <td className='greyText'><h3>{item.schoolName}</h3></td>
                            <td>{item.status? <h3 className='activeText'> Active </h3>: <h3 className='deactiveText'> InActive </h3>}</td>
                            <td className='text-end'><Link className='text-center text-black text-decoration-none viewDetailsButtons p-1' to={`/viewSchoolDetails/${item.schoolId}`}><span>View Details</span></Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0 pe-0 heightt">
                <div className="card p-2 heightt">
                  <div className="card-header bg-white ps-1 pe-1 heightt">
                    <div className="d-flex pb-2 heightt">
                      <div className="flex-fill"><h2>Earning Details</h2></div>
                    </div>
                  </div>
                  <div className="overflow-scroll heightt pt-3 pb-1">
                    <LineChart/>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>Package</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/allPackagesPage'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="overflow-scroll">
                    <table className="table mt-2 mb-0">
                        <tbody>
                          {AllPlan.slice(0, 4).map((item) => (
                            <tr key={item.id}>
                              <td className='greyText'><h3>{item.planName}</h3></td>
                              <td className='text-end'>{item.status? <h3 className='activeText'> Active </h3>: <h3 className='deactiveText'> InActive </h3>}</td>
                              <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0 pe-0">
                <div className="card p-2 h-100">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>Latest Request</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/requestPage'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="card greyTopborders greyBottomborders border-0 p-1">
                    <div className="d-flex pt-2">
                      <div className="flex-fill"><h2 className='text-decoration-underline'>Heading Text</h2></div>
                      <div className="flex-shrink text-end"><h2 className='p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none'>10 Feb, 2024</h2></div>
                    </div>
                    <div className="row m-2 pe-0 latestreqDiv">
                      {AllRequest.map( item =>(
                        <h3 className='greyText'>{item.reqDesc}</h3>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer bg-white p-0 pt-2">
                  <h5 className='greyText fst-italic'>Abhijat - 2 Days Ago</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  )
}

export default AdminDashboard