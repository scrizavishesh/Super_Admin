import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const forgetTooken = `Bearer ${localStorage.getItem('forgteToken')}`;
// const token = localStorage.getItem('token');

const LocalServerIP= 'http://192.168.1.2:5000';
const Domain= 'http://auth.edu2all.in:5000';

// ***************************************************************************************
                            // Login  //
// ***************************************************************************************


export const loginApi = async(data) => {
    var res = await axios.post(`${Domain}/login/all`,data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const logoutApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/login/logout`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ***************************************************************************************
                            // Forget Password  //
// ***************************************************************************************


export const getOTPByMailApi = async(mail) => {
    var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const verifyOTPApi = async(OTP) => {
    console.log(OTP);
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const setPassApi = async(newpass) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ***************************************************************************************
                            // Dashboard  //
// ***************************************************************************************




export const getDashDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getDashData`);

    if (res) {
        return res;
    }else{
       return [];
    }
}



// ***************************************************************************************
                            // School  //
// ***************************************************************************************


export const getSchoolDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getAllSchool?searchKey&pageSize=5&pageNo=1`);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getSchoolDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolById?schoolId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewSchoolApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/sch/addSchool`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateSchoolApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/sch/editById/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deleteSchoolApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/sch/deleteById?schoolId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ***************************************************************************************
                            // Plan // Package  //
// ***************************************************************************************


export const getAllPlanApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan?searchKey=&pageSize=20&pageNo=1`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getPlanByIdApi = async(id) => {
    console.log(id, 'iddddd')
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getById?planId=${id}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updatePlanApi = async (id,data) => {
    console.log(data, 'data')
    console.log(id, 'id')
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/plan/editById/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deletePlanApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/plan/deleteById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ***************************************************************************************
                            // Special Features  //
// ***************************************************************************************


export const getPlanInFeatureApi = async(planId, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/addFeaByPlanId/${planId}`, data);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getAllSpeFeatApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getAllFeatures?searchKey&pageSize=5&pageNo=1`, data);

    if (res) {
        return res;
    }else{
       return [];
    }
}



export const getAllActiveInActiveSpeFeatApi = async(planIdd) => {
    console.log('call1')
    axios.defaults.headers.common["Authorization"] = token;
    console.log('call2')
    var res = await axios.get(`${Domain}/fea/getActiveUnActiveByPlan?planId=${planIdd}`);

    if (res) {
        console.log(res)
        return res;
    }else{
        console.log(res)
       return [];
    }
}

export const getPermBySpeFeaIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/per/getAllPerByFeaId?featureId=${id}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateSpeFeaNameApi = async(id , data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/fea/editByFeaId/${id}`, data);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const addNewAddonApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/fea/addFeature`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewFeaPerApi = async (data, id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/per/addPermission/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deletePerByidApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/per/deleteById?permissionId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deleteSpeFeaByidApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/fea/deleteById?feaId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewPackageApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/plan/addPlans`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}












// ***************************************************************************************************************************

        // Saqib Code 

// ***************************************************************************************************************************

// ################### Subscription Apis start ####################### 

// GetAll 

export const GetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/subs/getAllSubs?pageNo=1&pageSize=5`)
   
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}
// delete Api 

export const SubscriptionDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/subs/deleteById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Get By id 

export const SubscriptionGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/subs/getBySubsId/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Put Api 

export const SubscriptionPutApi = async(id,datares) =>{
    console.log('mysubId234567876', id)
    console.log('mysubinputData-put=api', datares)
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/subs/editBySubsId/${id}`, datares)
   
   console.log('my-response-get-by-id-suscription', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Get data Api from Plan modules __________

export const PlanGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/plan/getAllPlan?pageNo=1&pageSize=4`)
   
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// ################### Subcription Apis  end  ####################### 




// ################### Request Apis ####################### 

// Get all api 
export const RequestGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/request/getAll`)
   // console.log(res2)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// resqust delete api 
export const RequestDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/request/delete?reqId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Get by id 
export const RequestGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/request/getRequests?reqId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Put Data Api 
export const RequestPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/request/viewId/${id}`, datares)
   console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// request update
export const RequestUpdatePutApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.put(`${Domain}/request/update`, datares)
  console.log('my-response-get-by-id', res2)

  if(res2) {
   return res2;
  }
  else{
   return []
  }
}


// ################### Request Apis end  ####################### 








// ################### specialfeature and addon Apis start  ####################### 

// GetAll 

export const SpecialFeaGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/fea/getAllFeatures`)
   
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// delete Api 

export const SpecialFeaDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/fea/deleteById?feaId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}



// ################### specialfeature and addon Apis end  ####################### 

