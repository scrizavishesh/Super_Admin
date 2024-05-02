import React, { useState } from 'react'
import styled from 'styled-components'
import Main from '../Main/Main';
import { Link } from 'react-router-dom';
import Logout from '../Modals/Logout';

const Container = styled.div`
    display: flex;
    position: relative;

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }
    
`;

const TextOverlap = styled.div`
    position: absolute;
    z-index: 1;
    width: ${(props) => (props.sidebaropen ? '208px' : '3.85%')};
    height: 100vh;
    transition: width 0.3s ease;
    
    .sidebarLogoimg{
        display: flex;
        align-items: center;
    }

    .sidebaroptiontext{
        display: ${(props) => (props.sidebaropen ? 'block' : 'none')};
    }

    .sidebarlinks{
        position: relative;
    }
    
    .sidebarlinks:hover{
        background-color: var(--greenColorBtn);
        border-right: 4px solid var(--activeOrangeBorder);
    }
    
    .sidebarlinks:hover::before{
        content: "";
        display: block;
        width: 0; 
        height: 0; 
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        border-right: 9px solid var(--activeOrangeBorder);
        position: absolute;
        top: 32%;
        right: -1%;
    }
    
    .actionOptionsCollapsed:hover{
        border-right: none !important;
    }
    
    .actionOptionsCollapsed::before:hover{
        right: -15% !important;
    }
    
    .sidebarlinks:hover .sidebaroptiontext{
        position: absolute;
        display: block;
        z-index: 1;
        width: 140px;
        margin-top: -21%;
        margin-left: 72% !important;
        overflow: visible;
        padding: 12px;
        background-color: var(--greenColorBtn);
        border-right: 4px solid var(--activeOrangeBorder);
        transition: margin-left 0.3s ease;
        color: #fff !important;
        height: 99.9%;
    }
    
    .actionOptionsCollapsed:hover .sidebaroptiontext{
        margin-top: -19.5%;
    }

    .sidebaroptiontext::before{
        content: "";
        display: block;
        width: 0; 
        height: 0; 
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--activeOrangeBorder);
        position: absolute;
        top: 32%;
        right: -1%;
    }

    .sidebar-closed .sidebaroptiontext {
        margin-left: 0 !important;
    }





    @media screen and (max-width: 830px) and (min-width: 1px) {
        width: 0px !important;
        transform: translate(-100%);
        .sidebarContentDiv{
            width: 0px !important;
            transform: translate(-100%);
        }


        .actionOptionsCollapsed {
            border-right: none;
        }
    }



`;

const Sidebar = styled.div`
    width: ${(props) => (props.sidebaropen ? '240px' : '4%')};
    height: 100vh;
    transition: width 0.3s ease;
    overflow: hidden scroll;
    position: relative;

    .sidebarMainDiv{
        background-color: #F0F8F7;
        width: ${(props) => (props.sidebaropen ? '100%' : '100%')};
        height: 100vh;
        transition: width 0.3s ease;
    }



    @media screen and (max-width: 830px) and (min-width: 10px) {
        transform: translate(-100%);
        width: 0px !important;
        /* .sidebarMainDiv{
            transform: translate(-100%);
        } */
    }

`;



const MainContainer = styled.div`
    width: ${(props) => (props.sidebaropen ? '100%' : '100%')};
    height: 100vh;
    background-color: #F2F3F6;
    transition: width 0.3s ease;
    /* overflow: scroll; */

    @media screen and (max-width: 830px) and (min-width: 10px) {
        width: 100vw;
    }

`;


const Header = styled.div`
    border-bottom: 1px solid var(--lightGreenBorderColor);

    .dropdown-toggle::after {
        margin-top: 0.6em;
    }

    .btn, .btn:focus {
        border: none;
    }
`;

const MainContentDiv = styled.div`
    height: 90vh;
    overflow: scroll;
`;

const MainLayout2 = () => {

    const [sidebaropen, setSidebarOpen] = useState(true);
    const [activeLink, setActiveLink] = useState('dashboard');
    const [dropdownopen, setDropDownOpen] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebaropen);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        if(!(activeLink === 'systemSettings'||  activeLink === 'webSetting' ||  activeLink === 'manageFaq' ||  activeLink === 'paymentSettings')){
            setDropDownOpen(false);
        }
    };

  return (
    <>
        <Container>
            <TextOverlap sidebaropen={sidebaropen}>
                <div className="sidebarContentDiv">
                    <ul className='p-0' >
                        <li className='nav-item p-3 sidebarLogoimg'>
                            {sidebaropen? <img src="./images/Scrizalogo.svg" alt="" className='img-fluid scrizalogoImg'/>: <img src="/images/scrizalogooo.png" alt="" className='img-fluid scrizalogoImg'/>}
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder sidebartoplinkborder ${ activeLink === 'dashboard' ? `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}` : '' }`}>
                            <Link to='/' onClick={() => { handleLinkClick('dashboard');}} className={`sidebbaroptions border-top  ${ activeLink === 'dashboard' ? 'text-white' : 'text-black' } text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 20 20"><path fill= {`${ activeLink === 'dashboard' ? 'white' : 'black' }`} d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0m.667 1.359v1.035a.667.667 0 0 1-1.334 0V1.359A8.614 8.614 0 0 0 5.637 2.51l.522.584a.667.667 0 0 1-.995.888l-.63-.707a8.714 8.714 0 0 0-1.776 1.962l.843.506a.667.667 0 0 1-.686 1.143l-.803-.481a8.607 8.607 0 0 0-.709 2.491h.907a.667.667 0 1 1 0 1.334l-.973-.001v.031a8.627 8.627 0 0 0 .742 3.263l.836-.559a.667.667 0 0 1 .741 1.109l-.939.627A8.66 8.66 0 0 0 10 18.667a8.662 8.662 0 0 0 7.447-4.23l-1.132-.757a.667.667 0 0 1 .74-1.109l.989.661a8.633 8.633 0 0 0 .62-3.003H17.58a.667.667 0 0 1 0-1.333h1.017a8.608 8.608 0 0 0-.57-2.168l-.95.492a.667.667 0 1 1-.612-1.184l.965-.5a8.71 8.71 0 0 0-1.839-2.158l-.602.789a.667.667 0 1 1-1.06-.81l.58-.76a8.615 8.615 0 0 0-3.842-1.238m3.248 5.46a.667.667 0 0 1-.104.937l-2.04 1.631l.007.12c0 .692-.529 1.262-1.205 1.326l-.129.006a1.333 1.333 0 1 1 .558-2.544l1.976-1.58a.667.667 0 0 1 .937.104"/></svg>
                                    <h2 className={`ms-1 ${sidebaropen ? '' : 'sidebaroptiontext'} ${!sidebaropen ? 'sidebar-closed' : ''}`}>Dashboard</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'schools' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/allSchoolsPage' onClick={() => { handleLinkClick('schools');}} className={`sidebbaroptions ${ activeLink === 'schools' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 24 24"><path fill= {`${ activeLink === 'schools' ? 'white' : 'black' }`} d="M0 3.75A.75.75 0 0 1 .75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.495 4.495 0 0 1 15.75 3h7.5a.75.75 0 0 1 .75.75v15.063a.752.752 0 0 1-.755.75l-7.682-.052a3 3 0 0 0-2.142.878l-.89.891a.75.75 0 0 1-1.061 0l-.902-.901a2.996 2.996 0 0 0-2.121-.879H.75a.75.75 0 0 1-.75-.75Zm12.75 15.232a4.503 4.503 0 0 1 2.823-.971l6.927.047V4.5h-6.75a3 3 0 0 0-3 3ZM11.247 7.497a3 3 0 0 0-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98Z" /></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Schools</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'addSchools' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/addSchoolsPage' onClick={() => { handleLinkClick('addSchools');}} className={`sidebbaroptions ${ activeLink === 'addSchools' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 24 24"><path fill= {`${ activeLink === 'addSchools' ? 'white' : 'black' }`} d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19c0-.101.009-.191.024-.273c.112-.576.584-.717.988-.727H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3zm3-4h13v12H5V5c0-.806.55-.988 1-1" /><path fill= {`${ activeLink === 'addSchools' ? 'white' : 'black' }`} d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" /></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Add Schools</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'addons' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/addons' onClick={() => { handleLinkClick('addons');}} className={`sidebbaroptions ${ activeLink === 'addons' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 15 15"><path fill={`${ activeLink === 'addons' ? 'white' : 'black' }`} fillRule="evenodd" d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 1.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 2.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041A1.5 1.5 0 0 0 6.96 5.85c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6A1.5 1.5 0 0 0 5.85 1.04C5.676 1 5.48 1 5.25 1H5.2zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 0 1-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37M9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 9.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.11-1.109c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04h-.05zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37M2.75 8h2.5c.229 0 .426 0 .6.041A1.5 1.5 0 0 1 6.96 9.15c.04.174.04.37.04.6v2.5c0 .229 0 .426-.041.6a1.5 1.5 0 0 1-1.109 1.11c-.174.04-.37.04-.6.04h-2.5c-.229 0-.426 0-.6-.041a1.5 1.5 0 0 1-1.11-1.109c-.04-.174-.04-.37-.04-.6v-2.5c0-.229 0-.426.041-.6A1.5 1.5 0 0 1 2.15 8.04c.174-.04.37-.04.6-.04m.05 1c-.308 0-.374.003-.417.014a.5.5 0 0 0-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 0 0 .37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 0 0-.37-.37C5.575 9.004 5.509 9 5.2 9zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 9.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6a1.5 1.5 0 0 0 1.109 1.11c.174.041.371.041.6.041h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04h-.05zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 0 1-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37" clipRule="evenodd" /></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Addons</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'subscription' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/subscriptionPage' onClick={() => { handleLinkClick('subscription');}} className={`sidebbaroptions ${ activeLink === 'subscription' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.4rem" viewBox="0 0 24 24"><path fill={`${ activeLink === 'subscription' ? 'white' : 'black' }`} d="M14 10H3v2h11zm0-4H3v2h11zM3 16h7v-2H3zm18.5-4.5L23 13l-7 7l-4.5-4.5L13 14l3 3z" /></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Subscription</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'packages' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/allPackagesPage' onClick={() => { handleLinkClick('packages');}} className={`sidebbaroptions ${ activeLink === 'packages' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 14 14"><g fill="none" stroke={`${ activeLink === 'packages' ? 'white' : 'black' }`} strokeLinecap="round" strokeLinejoin="round"><path d="M8.351 5.307a1.166 1.166 0 0 0-1.1-.778h-.903a1.041 1.041 0 0 0-.223 2.059l1.375.3a1.167 1.167 0 0 1-.25 2.307h-.777c-.508 0-.94-.324-1.1-.777m1.489-3.889V3.362m0 7V9.196m-4.864 4.302v-2.5h2.5" /><path d="M13.388 5.804a6.5 6.5 0 0 1-11.39 5.35M.612 8.196a6.5 6.5 0 0 1 11.39-5.35" /><path d="M12.002.502v2.5h-2.5" /></g></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Packages</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'request' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/requestPage' onClick={() => { handleLinkClick('request');}} className={`sidebbaroptions ${ activeLink === 'request' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><g fill={`${ activeLink === 'request' ? 'white' : 'black' }`} stroke={`${ activeLink === 'request' ? 'white' : 'black' }`} strokeLinecap="round" strokeLinejoin="round"><path d="m200 88l-72 72H96v-32l72-72Z" opacity="0.2" /><path d="m229.66 58.34l-32-32a8 8 0 0 0-11.32 0l-96 96A8 8 0 0 0 88 128v32a8 8 0 0 0 8 8h32a8 8 0 0 0 5.66-2.34l96-96a8 8 0 0 0 0-11.32M124.69 152H104v-20.69l64-64L188.69 88ZM200 76.69L179.31 56L192 43.31L212.69 64ZM224 120v88a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h88a8 8 0 0 1 0 16H48v160h160v-88a8 8 0 0 1 16 0" /></g></svg>
                                    
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `} style={{lineHeight: '22px'}}>Request</h2>
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item pt-2 pb-2 ${ activeLink === '' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}></li>
                        <li className={`nav-item pt-2 pb-2 ${ activeLink === '' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}></li>
                        <li className={`nav-item pt-2 pb-2 sidebarlinks ${ activeLink === 'systemSettings'||  activeLink === 'webSetting' ||  activeLink === 'manageFaq' ||  activeLink === 'paymentSettings' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link to='/systemSettingPage' dropdownopen={dropdownopen} onClick={() => { handleLinkClick('systemSettings','webSetting'); setDropDownOpen(!dropdownopen);}} className={`sidebbaroptions ${ activeLink === 'systemSettings'||  activeLink === 'webSetting' ||  activeLink === 'manageFaq' ||  activeLink === 'paymentSettings' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                <span className=' d-flex mb-0 p-1 ps-2' dropdownopen={dropdownopen}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.6em" viewBox="0 0 24 24"><g fill={`${ activeLink === 'systemSettings'||  activeLink === 'webSetting' ||  activeLink === 'manageFaq' ||  activeLink === 'paymentSettings' ? 'white' : 'black' }`} fillRule="evenodd" clipRule="evenodd"><path d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" /><path d="M11.975 1.25c-.445 0-.816 0-1.12.02a2.823 2.823 0 0 0-.907.19a2.75 2.75 0 0 0-1.489 1.488c-.145.35-.184.72-.2 1.122a.868.868 0 0 1-.415.731a.868.868 0 0 1-.841-.005c-.356-.188-.696-.339-1.072-.389a2.75 2.75 0 0 0-2.033.545a2.83 2.83 0 0 0-.617.691c-.17.254-.356.575-.578.96l-.025.044c-.223.385-.408.706-.542.98c-.14.286-.25.568-.29.88a2.75 2.75 0 0 0 .544 2.033c.231.301.532.52.872.734a.868.868 0 0 1 .426.726a.868.868 0 0 1-.426.726c-.34.214-.64.433-.872.734a2.75 2.75 0 0 0-.545 2.033c.041.312.15.594.29.88c.135.274.32.595.543.98l.025.044c.222.385.408.706.578.96c.177.263.367.5.617.69a2.75 2.75 0 0 0 2.033.546c.376-.05.716-.2 1.072-.389a.867.867 0 0 1 .84-.005a.863.863 0 0 1 .417.731c.015.402.054.772.2 1.122a2.75 2.75 0 0 0 1.488 1.489c.29.12.59.167.907.188c.304.021.675.021 1.12.021h.05c.445 0 .816 0 1.12-.02c.318-.022.617-.069.907-.19a2.75 2.75 0 0 0 1.489-1.488c.145-.35.184-.72.2-1.122a.868.868 0 0 1 .415-.732a.868.868 0 0 1 .841.006c.356.188.696.339 1.072.388a2.75 2.75 0 0 0 2.033-.544c.25-.192.44-.428.617-.691c.17-.254.356-.575.578-.96l.025-.044c.223-.385.408-.706.542-.98c.14-.286.25-.569.29-.88a2.75 2.75 0 0 0-.544-2.033c-.231-.301-.532-.52-.872-.734a.868.868 0 0 1-.426-.726c0-.278.152-.554.426-.726c.34-.214.64-.433.872-.734a2.75 2.75 0 0 0 .545-2.033a2.826 2.826 0 0 0-.29-.88a17.9 17.9 0 0 0-.543-.98l-.025-.044a18.028 18.028 0 0 0-.578-.96a2.823 2.823 0 0 0-.617-.69a2.75 2.75 0 0 0-2.033-.546c-.376.05-.716.2-1.072.389a.868.868 0 0 1-.84.005a.868.868 0 0 1-.417-.731c-.015-.402-.054-.772-.2-1.122a2.75 2.75 0 0 0-1.488-1.489c-.29-.12-.59-.167-.907-.188c-.304-.021-.675-.021-1.12-.021zm-1.453 1.595c.077-.032.194-.061.435-.078c.247-.017.567-.017 1.043-.017s.796 0 1.043.017c.241.017.358.046.435.078c.307.127.55.37.677.677c.04.096.073.247.086.604c.03.792.439 1.555 1.165 1.974c.726.42 1.591.392 2.292.022c.316-.167.463-.214.567-.227a1.25 1.25 0 0 1 .924.247c.066.051.15.138.285.338c.139.206.299.483.537.895c.238.412.397.69.506.912c.107.217.14.333.15.416a1.25 1.25 0 0 1-.247.924c-.064.083-.178.187-.48.377c-.672.422-1.128 1.158-1.128 1.996c0 .838.456 1.574 1.128 1.996c.302.19.416.294.48.377c.202.263.29.595.247.924c-.01.083-.044.2-.15.416c-.109.223-.268.5-.506.912c-.238.412-.399.689-.537.895c-.135.2-.219.287-.285.338a1.25 1.25 0 0 1-.924.247c-.104-.013-.25-.06-.567-.227c-.7-.37-1.566-.398-2.292.021c-.726.42-1.135 1.183-1.165 1.975c-.013.357-.046.508-.086.604a1.25 1.25 0 0 1-.677.677c-.077.032-.194.061-.435.078c-.247.017-.567.017-1.043.017s-.796 0-1.043-.017c-.241-.017-.358-.046-.435-.078a1.25 1.25 0 0 1-.677-.677c-.04-.096-.073-.247-.086-.604c-.03-.792-.439-1.555-1.165-1.974c-.726-.42-1.591-.392-2.292-.022c-.316.167-.463.214-.567.227a1.25 1.25 0 0 1-.924-.247c-.066-.051-.15-.138-.285-.338a17.055 17.055 0 0 1-.537-.895c-.238-.412-.397-.69-.506-.912c-.107-.217-.14-.333-.15-.416a1.25 1.25 0 0 1 .247-.924c.064-.083.178-.187.48-.377c.672-.422 1.128-1.158 1.128-1.996c0-.838-.456-1.574-1.128-1.996c-.302-.19-.416-.294-.48-.377a1.25 1.25 0 0 1-.247-.924c.01-.083.044-.2.15-.416c.109-.223.268-.5.506-.912c.238-.412.399-.689.537-.895c.135-.2.219-.287.285-.338a1.25 1.25 0 0 1 .924-.247c.104.013.25.06.567.227c.7.37 1.566.398 2.292-.022c.726-.419 1.135-1.182 1.165-1.974c.013-.357.046-.508.086-.604c.127-.307.37-.55.677-.677" /></g></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Settings</h2>
                                </span>
                            </Link>
                        </li>

                        {
                            dropdownopen 
                            ? 
                            <>
                                <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'systemSettings' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                                    <Link to='/systemSettingPage' onClick={() => { handleLinkClick('systemSettings');}} className={`sidebbaroptions ${ activeLink === 'systemSettings' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                        <span className=' d-flex mb-0 p-1 ps-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill={`${ activeLink === 'systemSettings' ? 'white' : 'black' }`} d="M799.344 960.288h-736v-800h449.6l64.704-62.336l-1.664-1.664H63.344c-35.344 0-64 28.656-64 64v800c0 35.344 28.656 64 64 64h736c35.344 0 64-28.656 64-64V491.632l-64 61.088zM974.224 41.44C945.344 13.76 913.473-.273 879.473-.273c-53.216 0-92.032 34.368-102.592 44.897c-14.976 14.784-439.168 438.353-439.168 438.353c-3.328 3.391-5.76 7.535-7.008 12.143c-11.488 42.448-69.072 230.992-69.648 232.864c-2.976 9.664-.32 20.193 6.8 27.217a26.641 26.641 0 0 0 18.913 7.84c2.752 0 5.52-.4 8.239-1.248c1.952-.656 196.496-63.569 228.512-73.12c4.224-1.248 8.048-3.536 11.216-6.624c20.208-19.936 410.112-403.792 441.664-436.384c32.624-33.664 48.847-68.657 48.223-104.097c-.591-35.008-17.616-68.704-50.4-100.128m-43.791 159.679c-17.808 18.368-157.249 156.16-414.449 409.536l-19.68 19.408c-29.488 9.12-100.097 31.808-153.473 49.024c17.184-56.752 37.808-125.312 47.008-157.743C444.8 466.464 808.223 103.6 822.03 89.968c2.689-2.689 27.217-26.257 57.44-26.257c17.153 0 33.681 7.824 50.465 23.92c20.065 19.248 30.4 37.744 30.689 55.024c.32 17.792-9.84 37.456-30.191 58.464" /></svg>
                                            <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>System Setting</h2>
                                        </span>
                                    </Link>
                                </li>
                                <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'webSetting' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                                    <Link to='/websiteSettingPage' onClick={() => { handleLinkClick('webSetting');}} className={`sidebbaroptions ${ activeLink === 'webSetting' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                        <span className=' d-flex mb-0 p-1 ps-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill={`${ activeLink === 'webSetting' ? 'white' : 'black' }`} d="M799.344 960.288h-736v-800h449.6l64.704-62.336l-1.664-1.664H63.344c-35.344 0-64 28.656-64 64v800c0 35.344 28.656 64 64 64h736c35.344 0 64-28.656 64-64V491.632l-64 61.088zM974.224 41.44C945.344 13.76 913.473-.273 879.473-.273c-53.216 0-92.032 34.368-102.592 44.897c-14.976 14.784-439.168 438.353-439.168 438.353c-3.328 3.391-5.76 7.535-7.008 12.143c-11.488 42.448-69.072 230.992-69.648 232.864c-2.976 9.664-.32 20.193 6.8 27.217a26.641 26.641 0 0 0 18.913 7.84c2.752 0 5.52-.4 8.239-1.248c1.952-.656 196.496-63.569 228.512-73.12c4.224-1.248 8.048-3.536 11.216-6.624c20.208-19.936 410.112-403.792 441.664-436.384c32.624-33.664 48.847-68.657 48.223-104.097c-.591-35.008-17.616-68.704-50.4-100.128m-43.791 159.679c-17.808 18.368-157.249 156.16-414.449 409.536l-19.68 19.408c-29.488 9.12-100.097 31.808-153.473 49.024c17.184-56.752 37.808-125.312 47.008-157.743C444.8 466.464 808.223 103.6 822.03 89.968c2.689-2.689 27.217-26.257 57.44-26.257c17.153 0 33.681 7.824 50.465 23.92c20.065 19.248 30.4 37.744 30.689 55.024c.32 17.792-9.84 37.456-30.191 58.464" /></svg>
                                            <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Website Setting</h2>
                                        </span>
                                    </Link>
                                </li>
                                <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'manageFaq' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                                    <Link to='/manageFaqPage' onClick={() => { handleLinkClick('manageFaq');}} className={`sidebbaroptions ${ activeLink === 'manageFaq' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                        <span className=' d-flex mb-0 p-1 ps-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill={`${ activeLink === 'manageFaq' ? 'white' : 'black' }`} d="M799.344 960.288h-736v-800h449.6l64.704-62.336l-1.664-1.664H63.344c-35.344 0-64 28.656-64 64v800c0 35.344 28.656 64 64 64h736c35.344 0 64-28.656 64-64V491.632l-64 61.088zM974.224 41.44C945.344 13.76 913.473-.273 879.473-.273c-53.216 0-92.032 34.368-102.592 44.897c-14.976 14.784-439.168 438.353-439.168 438.353c-3.328 3.391-5.76 7.535-7.008 12.143c-11.488 42.448-69.072 230.992-69.648 232.864c-2.976 9.664-.32 20.193 6.8 27.217a26.641 26.641 0 0 0 18.913 7.84c2.752 0 5.52-.4 8.239-1.248c1.952-.656 196.496-63.569 228.512-73.12c4.224-1.248 8.048-3.536 11.216-6.624c20.208-19.936 410.112-403.792 441.664-436.384c32.624-33.664 48.847-68.657 48.223-104.097c-.591-35.008-17.616-68.704-50.4-100.128m-43.791 159.679c-17.808 18.368-157.249 156.16-414.449 409.536l-19.68 19.408c-29.488 9.12-100.097 31.808-153.473 49.024c17.184-56.752 37.808-125.312 47.008-157.743C444.8 466.464 808.223 103.6 822.03 89.968c2.689-2.689 27.217-26.257 57.44-26.257c17.153 0 33.681 7.824 50.465 23.92c20.065 19.248 30.4 37.744 30.689 55.024c.32 17.792-9.84 37.456-30.191 58.464" /></svg>
                                            <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Manage Faq</h2>
                                        </span>
                                    </Link>
                                </li>
                                <li className={`nav-item pt-2 pb-2 sidebarlinks sidebarlinkborder ${ activeLink === 'paymentSettings' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                                    <Link to='/paymentSettingPage' onClick={() => { handleLinkClick('paymentSettings');}} className={`sidebbaroptions ${ activeLink === 'paymentSettings' ? 'text-white' : 'text-black' } border-top text-decoration-none`} >
                                        <span className=' d-flex mb-0 p-1 ps-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill={`${ activeLink === 'paymentSettings' ? 'white' : 'black' }`} d="M799.344 960.288h-736v-800h449.6l64.704-62.336l-1.664-1.664H63.344c-35.344 0-64 28.656-64 64v800c0 35.344 28.656 64 64 64h736c35.344 0 64-28.656 64-64V491.632l-64 61.088zM974.224 41.44C945.344 13.76 913.473-.273 879.473-.273c-53.216 0-92.032 34.368-102.592 44.897c-14.976 14.784-439.168 438.353-439.168 438.353c-3.328 3.391-5.76 7.535-7.008 12.143c-11.488 42.448-69.072 230.992-69.648 232.864c-2.976 9.664-.32 20.193 6.8 27.217a26.641 26.641 0 0 0 18.913 7.84c2.752 0 5.52-.4 8.239-1.248c1.952-.656 196.496-63.569 228.512-73.12c4.224-1.248 8.048-3.536 11.216-6.624c20.208-19.936 410.112-403.792 441.664-436.384c32.624-33.664 48.847-68.657 48.223-104.097c-.591-35.008-17.616-68.704-50.4-100.128m-43.791 159.679c-17.808 18.368-157.249 156.16-414.449 409.536l-19.68 19.408c-29.488 9.12-100.097 31.808-153.473 49.024c17.184-56.752 37.808-125.312 47.008-157.743C444.8 466.464 808.223 103.6 822.03 89.968c2.689-2.689 27.217-26.257 57.44-26.257c17.153 0 33.681 7.824 50.465 23.92c20.065 19.248 30.4 37.744 30.689 55.024c.32 17.792-9.84 37.456-30.191 58.464" /></svg>
                                            <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Payment Settings</h2>
                                        </span>
                                    </Link>
                                </li>
                            </>
                            :
                            ''
                        }
                        <li className={`nav-item pt-2 pb-2 sidebarlinks ${ activeLink === 'Logout' ?  `${sidebaropen? 'actionOptions': 'actionOptionsCollapsed'}`: ''}`}>
                            <Link onClick={() => { handleLinkClick('Logout');}} className={`sidebbaroptions ${ activeLink === 'Logout' ? 'text-white' : 'text-black' } border-top text-decoration-none`}  data-bs-toggle="offcanvas" data-bs-target="#Logout" aria-controls="Logout">
                                <span className=' d-flex mb-0 p-1 ps-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.6em" viewBox="0 0 24 24"><path fill={`${ activeLink === 'Logout' ? 'white' : 'black' }`} d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                                    <h2 className={`ms-1 ${sidebaropen? '':'sidebaroptiontext'} `}>Logout</h2>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </TextOverlap>
            <Sidebar sidebaropen={sidebaropen} className='sidebarborder sidebardiv'>
                <div className="sidebarMainDiv"></div>
               
            </Sidebar>


            
            <MainContainer sidebaropen={sidebaropen}>
                <Header>
                    <div className="d-flex bgggg bg-white p-2">
                        <div className="p-3 flex-grow-1" aria-current="page">
                            <svg className='' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" onClick={toggleSidebar} style={{cursor: 'pointer'}}>
                            <path fill="#008479" stroke="#008479" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
                            </svg>
                        </div>
                        <div className="p-2">
                            <div className="dropdown dropdown-sm">
                                <Link className="btn d-flex dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="row">
                                    <div className="col-3"><img src="./images/userProfile.png" alt="" width={40} /></div>
                                    <div className="col-9 text-start">
                                        <div className="row"><h3>@admin.school</h3></div>
                                        <div className="row"><h3>admin@skdschool.in</h3></div>
                                    </div>
                                    </div>
                                </Link>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item greyText" to="#">Profile</Link></li>
                                    <li><Link className="dropdown-item greyText" to="#">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Header>
                <MainContentDiv>
                    <Main/>
                </MainContentDiv>
            </MainContainer>



            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="Logout" aria-labelledby="LogoutLabel">
                <div className="offcanvas-header modalHighborder">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                        <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>                    
                    <h2 className="offcanvas-title" id="LogoutLabel">Logout Message</h2>
                </div>
                <div className="offcanvas-body pt-0">
                    <Logout/>
                </div>
            </div>




        </Container>
    </>
  )
}

export default MainLayout2