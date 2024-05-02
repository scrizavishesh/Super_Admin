

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSidebarContext } from '../Dashboard/DashboardLayout';

const Container = styled.div`
    
`;

const Navbar = () => {

    const {toggleSidebar } = useSidebarContext();     //useContext

    return (
        <>
            <Container>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-6">
                            <div className="d-flex">
                                <div className="flex-grow-1 p-2 align-self-center">
                                    <button className='btn togglebtn' onClick={toggleSidebar}>
                                        <svg className='' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{cursor: 'pointer'}}>
                                        <path fill="#008479" stroke="#008479" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-2 d-none align-self-center">
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search"/>
                                        <button className="btn searchButtons text-white font14" type="submit"><span>Search</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6">
                            <div className="d-flex">
                                <div className="flex-grow-1 p-2 align-self-center">
                                    
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link className="btn d-flex p-0" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="row">
                                        <div className="col-3"><img src="./images/userProfile.png" alt="" width={40} /></div>
                                        <div className="col-9 text-start">
                                            <div className="row"><span className='font14'>@admin.school</span></div>
                                            <div className="row"><span className='font14'>admin@skdschool.in</span></div>
                                        </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Navbar;



                                {/* <div className="dropdown dropdown-sm">
                                    
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item greyText" to="#">Profile</Link></li>
                                        <li><Link className="dropdown-item greyText" to="#">Logout</Link></li>
                                    </ul>
                                </div> */}


// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'

// const Container = styled.div`
    
// `;

// const Navbar = () => {

//     const [sidebaropen, setSidebarOpen]= useState(true);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebaropen);
//     };

//     return (
//         <>
//             <Container>
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="d-flex bgggg bg-white p-2">
//                             <div className="p-3 flex-grow-1" aria-current="page">
//                                 <button className='btn' onClick={toggleSidebar}>
//                                     <svg className='' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{cursor: 'pointer'}}>
//                                     <path fill="#008479" stroke="#008479" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
//                                     </svg>
//                                 </button>
//                             </div>
//                             <div className="p-2">
//                                 <div className="dropdown dropdown-sm">
//                                     <Link className="btn d-flex dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                         <div className="row">
//                                         <div className="col-3"><img src="./images/userProfile.png" alt="" width={40} /></div>
//                                         <div className="col-9 text-start">
//                                             <div className="row"><span>@admin.school</span></div>
//                                             <div className="row"><span>admin@skdschool.in</span></div>
//                                         </div>
//                                         </div>
//                                     </Link>

//                                     <ul className="dropdown-menu dropdown-menu-end">
//                                         <li><Link className="dropdown-item greyText" to="#">Profile</Link></li>
//                                         <li><Link className="dropdown-item greyText" to="#">Logout</Link></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default Navbar