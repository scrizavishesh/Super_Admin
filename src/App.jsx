import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './Dashboard/DashboardLayout';
import WithoutAuth from './Main/WithoutAuth';

function App() {
  
    const token = localStorage.getItem('token');
  
  

  return (
    <>
      
      {token 
        ? 
          <BrowserRouter>
            <DashboardLayout />
          </BrowserRouter>
        :
          <BrowserRouter>
            <WithoutAuth />
          </BrowserRouter>
          // <BrowserRouter>
          //   <Routes>
          //     <Route path='/login' element={<Login/>}/>
          //   </Routes>
          // </BrowserRouter>
          
        }
    </>
  );
}

export default App;