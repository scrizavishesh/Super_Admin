import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Layouts/Navbar';
import Sidebar from '../Layouts/Sidebar';
import Main from '../Main/Main';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

const SidebarContainer = styled.div`
    width: ${(props) => (props.sidebaropen ? '15%' : '4%')};
    transition: width 0.6s ease, transform 0.6s ease;
    background-color: var(--sidebarBackground);

    @media screen and (max-width: 1000px) {
        transform: translateX(-100%);
        /* transform: translateX(${(props) => (props.sidebaropen ? '0%' : '-100%')}); */
        position: absolute;
        z-index: 999;
        top: 0;
        bottom: 0;
        left:  ${(props) => (props.sidebaropen ? '-100%' : '4%')};
        transition: 0.6s ease;
    }
`;

const MainContainer = styled.div`
    width: ${(props) => (props.sidebaropen ? '85%' : '100%')};
    transition: width 0.6s ease;

    @media screen and (max-width: 1000px) {
        width: 100% !important;
    }
`;


const SidebarContext = createContext();     //useContext
export const useSidebarContext = () => useContext(SidebarContext);     //useContext
// const { sidebaropen } = useSidebarContext();

const DashboardLayout = () => {

    const [sidebaropen, setsidebaropen] = useState(true);

    const toggleSidebar = () => {
        setsidebaropen(!sidebaropen);

        // if(window.innerWidth > 1000){
        //     setsidebaropen(!sidebaropen);
        // }
        // if(window.innerWidth <= 1000){
        //     setsidebaropen(false);
        // }

    };

    return (
        <>
            <SidebarContext.Provider value={{ sidebaropen, toggleSidebar }}>
                <Container>
                    <SidebarContainer sidebaropen={sidebaropen} className='scrollbarhide borderRightt h-100 overflow-scroll'>
                        <Sidebar/>
                    </SidebarContainer>
                    <MainContainer sidebaropen={sidebaropen} className='scrollbarhide h-100 overflow-scroll'>
                        <div className="container-fluid">
                            <div className="row sticky-top bg-white">
                                <Navbar/>
                            </div>
                            <div className="row">
                                <Main />
                            </div>
                        </div>
                    </MainContainer>
                </Container>
            </SidebarContext.Provider>
        </>
    );
};

export default DashboardLayout;
