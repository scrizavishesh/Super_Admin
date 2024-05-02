import React, { useState } from 'react';
import styled from 'styled-components';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import { Icon } from '@iconify/react';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logoutApi } from '../Utils/Apis';

const Container = styled.div`
    background-color: var(--sidebarBackground);
    transition: width 0.2s ease;
    height: 100vh;

    @media screen and (max-width: 1000px) and (min-width: 0px) {
        width: 200px;
        transition: width 0.2s ease-in !important;
    }
    
    .crossicon{
        display: none !important;
    }

    @media screen and (max-width: 1000px) {
        .crossicon{
            display: block !important;
            margin-left: 11% !important;
            margin-top: -5% !important;
            cursor: pointer
        }

    }

    .itemVisible, .subitemVisible {
        opacity: 1;
        position: static;
        transition: opacity 0.3s ease;
    }

    .itemHidden,  .addonSubitem {
        display: none;
        z-index: 999;
        position: relative;
        left: 3.4%;
        transition: opacity 0.2s ease;
        padding: 0.63% 2% 0.63% 2%;
        margin-top: -0.72% !important;
    }

    .menus:hover .itemHidden{
        position: absolute;
        display: block !important;
        background-color: var(--buttonBgColor) !important;
        color: #fff;
    }

    .addonmenu:hover .addonSubitem {
        display: block;
        background-color: var(--buttonBgColor) !important;
        color: #fff;
    }

    .menus:hover .icon{
        color: #fff;
        /* background-color: var(--buttonBgColor); */
    }

    .submenus:hover , .menus:hover{
        background-color: var(--buttonBgColor);
        /* position: relative; */
        border-right: 5px solid var(--activeOrangeBorder)
    }

    .submenus:hover::before , .menus:hover::before , .actionOptions:hover::before{
        content: "";
        display: block;
        width: 5px; 
        height: 5px; 
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--activeOrangeBorder);
        position: absolute;
        top: 32%;
        right: -1%;
    }
    
    .show{
        overflow: hidden;
        transition: 0.35s ease;
    }

    .hide{
        height: 0 !important;
        overflow: hidden;
        transition: height 0.35s ease-out;
    }

`;

const Sidebar = () => {

   const navigate = useNavigate();

    const [activeLink , setActiveLink] = useState('dashboard')
    const { sidebaropen } = useSidebarContext();

    const {toggleSidebar } = useSidebarContext();    
   
    //useContext


    // const sidebarItems = [
    //     { name: "Dashboard", icon: <Icon icon="ant-design:dashboard-outlined" width="1.8em" height="1.8em"  style={{color: '#000'}} />, path: "/" },
    //     { name: "Users", icon: <Icon icon="ant-design:dashboard-outlined" width="1.8em" height="1.8em"  style={{color: '#000'}} />, path: "/item2" },
    //     { name: "Dashboard", icon: <Icon icon="ant-design:dashboard-outlined" width="1.8em" height="1.8em"  style={{color: '#000'}} />, path: "/item3" },
    // ];
    

    useEffect(() => {
        // const data = localStorage.setItem('activeOption', JSON.stringify(activeLink)); 
        localStorage.setItem('activeOption', JSON.stringify(activeLink));
    }, [activeLink])

    // console.log(sidebaropen, 'sidebar')

    const toggleicon = window.innerWidth <= 1000 ? !sidebaropen : sidebaropen;
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [collapseSettingOpen, setCollapseSettingOpen] = useState(false);

    const handleCollapseToggle = (link) => {
        setActiveLink(link)
        setCollapseOpen(true);
        setCollapseSettingOpen(false);
    };

    const handleCollapseSettingToggle = (link) => {
        setActiveLink(link)
        setCollapseOpen(false);
        setCollapseSettingOpen(true);
    };

    const handleMenuClick = (link) => {
        setActiveLink(link)
        setCollapseOpen(false);
        setCollapseSettingOpen(false);
    };


    const handleLogout = async() =>{
        setActiveLink('logout')
        console.log(activeLink)
        try{
            var response = await logoutApi();
            console.log('Api called')
            if(response?.status===200){
                console.log('Api called 200')
                if(response?.data?.status==='success'){
                    console.log('first')
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload(); 
                }
            }
            else{
                console.log(response?.data?.msg);
            }
        }
        catch{

        }
    }

    // const ActiveLinkFunction = (activeLinkValue) => {
    //     setActiveLink(`${activeLinkValue}`);
    //     localStorage.setItem('activeLink' , activeLinkValue)
    // }

    return (
        <>
            <Container>
                <div className='container-fluid'>
                    <div className="row">
                        <ul className='list-unstyled p-0 m-0'>
                            <li className={`${toggleicon ? 'ps-4 pe-4 pt-1 pb-1' : 'p-3'} d-flex justify-content-center crossiconli`}>
                                {toggleicon ? <img className='img-fluid' src="./images/Scrizalogo.svg" alt="" /> : <img className='' src="./images/ScrizaSmallLogo.png" alt="" />}<span className="btn-close crossicon" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleSidebar}></span>
                            </li>
                            
                            
                            <li className={`p-2 menus borderTOP ${activeLink === 'dashboard'? 'actionOptions': ''} ${toggleicon ? '' : 'pt-1'}`} onClick={() => handleMenuClick('dashboard')}>
                                <Link to='/' className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'dashboard' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2  font14 fontweight500 ${toggleicon ? 'itemVisible': `${activeLink==='dashboard' ? 'd-none' : ''}`}`}>Dashboard</span>
                                </Link>
                            </li>
                            
                            <li className={`p-2 menus borderTOP ${activeLink === 'schools'? 'actionOptions': ''}`} onClick={() => handleMenuClick('schools')}>
                                <Link to='/allSchoolsPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'schools'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'schools' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Schools</span>
                                </Link>
                            </li>
                            
                            <li className={`p-2 menus borderTOP ${activeLink === 'addSchool'? 'actionOptions': ''}`} onClick={() => handleMenuClick('addSchool')}>
                                <Link to='/addSchoolsPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'addSchool'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'addSchool' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Add School</span>
                                </Link>
                            </li>
                            

                            
                            <li className={`p-2 menus borderTOP ${toggleicon ? '': 'addonmenu'} ${activeLink === 'addons' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? 'actionOptions': ''}`}  onClick={()=> handleCollapseToggle('addons')}>
                                <Link to='#addOnCollapse' className={`d-flex p-1 text-decoration-none ${activeLink === 'addons' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? 'text-white': 'text-black'}`} data-bs-toggle={`${toggleicon? 'collapse': ''}`} role="button" aria-expanded="false" aria-controls={`${toggleicon? 'addOnCollapse': ''}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'addons' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Addons</span>
                                </Link>
                            </li>
                            
                            <div className={`collapse bg-white ${collapseOpen ? 'show' : 'hide'}`} id="addOnCollapse">
                                <ul className='list-unstyled p-0 m-0'>
                                    <li className={`p-2 submenus borderTOP' ${activeLink === 'addons'? 'actionOptions': ''}`} onClick={() => setActiveLink('addons')}>
                                        <Link to='/addons' className={`d-flex p-1 text-decoration-none ${activeLink === 'addons'? 'text-white': 'text-black'}`}>
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'addons' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Addons Details</span>
                                        </Link>
                                    </li>
                                    <li className={`p-2 submenus borderTOP' ${activeLink === 'addAddons'? 'actionOptions': ''}`} onClick={() => setActiveLink('addAddons')}>
                                        <Link to='/addAddons' className={`d-flex p-1 text-decoration-none ${activeLink === 'addAddons'? 'text-white': 'text-black'}`}>
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'addAddons' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Add Addon</span>
                                        </Link>
                                    </li>
                                    <li className={`p-2 submenus borderTOP' ${activeLink === 'addFeatures'? 'actionOptions': ''}`} onClick={() => setActiveLink('addFeatures')}>
                                        <Link to='/addFeatures' className={`d-flex p-1 text-decoration-none ${activeLink === 'addFeatures'? 'text-white': 'text-black'}`}>
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'addFeatures' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Features</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>


                            <li className={`p-2 menus borderTOP ${activeLink === 'subscription'? 'actionOptions': ''}`} onClick={() => handleMenuClick('subscription')}>
                                <Link to='/subscriptionPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'subscription'? 'text-white': 'text-black'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'subscription' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Subscription</span>
                                </Link>
                            </li>
                            <li className={`p-2 menus borderTOP ${activeLink === 'package'? 'actionOptions': ''}`} onClick={() => handleMenuClick('package')}>
                                <Link to='/allPackagesPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'package'? 'text-white': 'text-black'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'package' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Package</span>
                                </Link>
                            </li>
                            <li className={`p-2 menus borderTOP borderBottom ${activeLink === 'request'? 'actionOptions': ''}`} onClick={() => handleMenuClick('request')}>
                                <Link to='/requestPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'request'? 'text-white': 'text-black'}`}>
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'request' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Request</span>
                                </Link>
                            </li>




                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
{/* ********************** */}
                            
                            <li className={`p-2 menus borderTOP ${activeLink === 'settings' ||activeLink === 'webSettings' ||activeLink === 'manageFaqSettings' ||activeLink === 'paymentSettings' ? 'actionOptions': ''}`} onClick={() => handleCollapseSettingToggle('settings)')}>
                                <Link className={`d-flex p-1 text-decoration-none ${activeLink === 'settings' ||activeLink === 'webSettings' ||activeLink === 'manageFaqSettings' ||activeLink === 'paymentSettings' ? 'text-white': 'text-black'}`} data-bs-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'settings' ||activeLink === 'webSettings' ||activeLink === 'manageFaqSettings' ||activeLink === 'paymentSettings' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Settings</span>
                                </Link>
                            </li>
                            
                            <div className={`collapse bg-white ${collapseSettingOpen ? 'show' : 'hide'}`} id="collapseExample">
                                <ul className='list-unstyled p-0 m-0'>
                                    <li className={`p-2 submenus borderTOP ${activeLink === 'settings'? 'actionOptions': ''}`} onClick={() => setActiveLink('settings')}>
                                        <Link tp='/systemSettingPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'settings'? 'text-white': 'text-black'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'settings' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>System Setting</span>
                                        </Link>
                                    </li>
                                    <li className={`p-2 submenus borderTOP ${activeLink === 'webSettings'? 'actionOptions': ''}`} onClick={() => setActiveLink('webSettings')}>
                                        <Link tp='/websiteSettingPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'webSettings'? 'text-white': 'text-black'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'webSettings' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>Website Setting</span>
                                        </Link>
                                    </li>
                                    <li className={`p-2 submenus borderTOP ${activeLink === 'manageFaqSettings'? 'actionOptions': ''}`} onClick={() => setActiveLink('manageFaqSettings')}>
                                        <Link tp='/manageFaqPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'manageFaqSettings'? 'text-white': 'text-black'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'manageFaqSettings' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>Manage Faq</span>
                                        </Link>
                                    </li>
                                    <li className={`p-2 submenus borderTOP ${activeLink === 'paymentSettings'? 'actionOptions': ''}`} onClick={() => setActiveLink('paymentSettings')}>
                                        <Link tp='/paymentSettingPage' className={`d-flex p-1 text-decoration-none ${activeLink === 'paymentSettings'? 'text-white': 'text-black'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'paymentSettings' ? '#fff' : '#000'}`}} /></span>
                                            <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>Payment Settings</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>



                            <li className={`p-2 menus borderTOP borderBottom ${activeLink === 'logout'? 'actionOptions': ''}`} onClick={() => handleLogout()}>
                                <Link className={`d-flex p-1 text-decoration-none ${activeLink === 'logout'? 'text-white': 'text-black'}`} refresh="true">
                                    <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'logout' ? '#fff' : '#000'}`}} /></span>
                                    <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Logout</span>
                                </Link>
                            </li>

                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                            <li className='p-2'>
                                <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Sidebar;