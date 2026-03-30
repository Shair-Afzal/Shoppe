import { createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../../Axios"
import { showErrorToast } from "../../../utils/Toast";


export const registerAccount = createAsyncThunk(
  'auth/registerAccount',
  async ({ email, password,profilepic,username,role}, { rejectWithValue }) => {
    const  formData = new FormData();
      try {
    let localUri = profilepic.uri || profilepic.path;

let filename =
  profilepic.fileName ||
  profilepic.filename ||
  (localUri ? localUri.split('/').pop() : `photo_${Date.now()}.jpg`);

let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image/jpeg`;
       
    formData.append('role',role)
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
   formData.append('profilepic', {
  uri: Platform.OS === 'android' ? localUri : localUri.replace('file://', ''),
  name: filename,
  type,
});
     const res= await Api.post('/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    return res.data;
    
} catch (err) {
    const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed";

  
  return rejectWithValue(message||'Failed to prepare registration data. Please try again.');
}

  })

  export const LoginUser= createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res=await Api.post('/users/login', { email, password });
            console.log(res.data)
            return res.data;
        } catch (err) {
           
             const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";
        console.log(err?.response)
        console.log(err.message)
            return rejectWithValue(message||'Login failed. Please check your credentials and try again.');
        }

    })

   export const ForgetPasword=createAsyncThunk(
    'auth/forget',
    async ({email},{rejectWithValue})=>{
        try {
            const res=await Api.post('/users/forgetpassword',{email})
            return res.data

        } catch(err){
             const message =
        err.response?.data?.message ||
        err.message 
        
            return rejectWithValue(message||"somethink going wrong")

        }


    }
   )

   export const VerifyOtp=createAsyncThunk(
    'auth/otp',
    async ({otp},{rejectWithValue})=>{
        try{
            const res=await  Api.post('/users/verifyotp',{otp})
            console.log(res)
            return res.data
        } catch(err){
            const message =
        err.response?.data?.message ||
        err.message 
        return rejectWithValue(message||"otp is not correct")
        }

    }
   )

   export const ResetPassword=createAsyncThunk(
    'auth/reset',
    async ({password,confirmpassword,resetToken},{rejectWithValue})=>{
        try{
            const res=await Api.post('/users/resetpassword',{password,confirmpassword,resetToken})
            return res.data
        }catch (err){
          const message=
        err.response?.data?.message ||
        err.message 
        return rejectWithValue(message||"somethink is going wring")
        }
    }
   )

  export const LogoutUser=createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue})=>{
        try{
        const res=await Api.post("users/logout")
        return res.data
        }catch(err){
            return rejectWithValue(err.message)
        }


    })

    export const RegisterSellerAccount=createAsyncThunk(
        'auth/seller',
        async ({shopName,shopDescription,shopLogo},{rejectWithValue})=>{
             let localUri = shopLogo.uri || shopLogo.path;

let filename =
  shopLogo.fileName ||
  shopLogo.filename ||
  (localUri ? localUri.split('/').pop() : `photo_${Date.now()}.jpg`);

let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image/jpeg`;
       
              const  formData = new FormData();
              try{
               formData.append("shopName",shopName)
               formData.append("shopDescription",shopDescription)
               formData.append("shopLogo",{
  uri: Platform.OS === 'android' ? localUri : localUri.replace('file://', ''),
  name: filename,
  type,
})
        const res=await Api.post("Seller/createseller",formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }})
           return res.data
              }catch(err){
                return rejectWithValue(err.message)

              }


    })
 export const GetSeller=createAsyncThunk(
    'auth/getseller',
    async (userId,{rejectWithValue})=>{
        try{
            const res=await Api.get(`Seller/getsellerprofile/${userId}`)
            return res.data.data
        }catch(err){
            return rejectWithValue(err)
        }
    
    }
 )
 export const UserProfile=createAsyncThunk(
    'auth/profile',
    async(_id,{rejectWithValue})=>{

 try{
            const res=await Api.get(`users/profile/${_id}`)
            return res.data.data
        }catch(err){
            return rejectWithValue(err)
        }
 })

 export const UpdateProfile=createAsyncThunk(


    "/auth/update",
    async({username, email,profilepic},{rejectWithValue})=>{
        const formData=new FormData()
         let localUri =
         typeof profilepic ==="string"?
         profilepic:
          profilepic.uri || profilepic.path;

let filename =
  profilepic.fileName ||
  profilepic.filename ||
  (localUri ? localUri.split('/').pop() : `photo_${Date.now()}.jpg`);

let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image/jpeg`;
        try{
            formData.append("username",username)
            formData.append("email",email)
           formData.append('profilepic', {
  uri: Platform.OS === 'android' ? localUri : localUri.replace('file://', ''),
  name: filename,
  type,
})
            const res=await Api.put("/users/updateprofile",formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
            return res.data.data

        }catch(err){
            console.log("err",err)
            return rejectWithValue(err.message)

        }
    })

    export const UpdateSellerProfile=createAsyncThunk(
        "auth/updateseller"
        ,async({shopName,shopDescription,shopLogo},{rejectWithValue})=>{
             let localUri =
      typeof shopLogo === "string"
        ? shopLogo
        : shopLogo?.uri || shopLogo?.pa

let filename =
  shopLogo.fileName ||
  shopLogo.filename ||
  (localUri ? localUri.split('/').pop() : `photo_${Date.now()}.jpg`);

let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image/jpeg`;

    const  formData = new FormData();
            try{
                formData.append('shopName',shopName)
                 formData.append("shopDescription",shopDescription)
               formData.append("shopLogo",{
  uri: Platform.OS === 'android' ? localUri : localUri.replace('file://', ''),
  name: filename,
  type,
})
        const res=await Api.put("Seller/updatesellerprofile",formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }})
          return res.data.data

            }catch(err){
                return rejectWithValue(err?.message)
            }
        })

        export const UpdateProfilepic=createAsyncThunk(
            "auth/pic",
            
            async(profilepic,{rejectWithValue})=>{
                const formData=new FormData()
                  let localUri =
         typeof profilepic ==="string"?
         profilepic:
          profilepic.uri || profilepic.path;

let filename =
  profilepic.fileName ||
  profilepic.filename ||
  (localUri ? localUri.split('/').pop() : `photo_${Date.now()}.jpg`);
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image/jpeg`;
                try{
                      formData.append('profilepic', {
  uri: Platform.OS === 'android' ? localUri : localUri.replace('file://', ''),
  name: filename,
  type,
})
                    const res=await Api.put("/users/updateprofilepic",formData,{
                        headers:{
                            'Content-Type': 'multipart/form-data', 
                        }
                    })
                    return res.data.data



                }catch(err){
                      const message =
        err.response?.data?.message ||
        err.message 
        console.log("error",err)
                    return rejectWithValue(message||"some think is going wrong")

                }

        }


    )

    export const AllUsers=createAsyncThunk(
        'auth/all',
        async({page = 1, limit = 3 },{rejectWithValue})=>{
        try{
            const res=await Api.get(`/users/all?page=${page}&limit=${limit}`)
            return res.data.data
        }catch(err){
            return rejectWithValue(err?.message)

        }
    })
    export const AllSellers=createAsyncThunk(
        'auth/allseller',
        async({page = 1, limit = 3 },{rejectWithValue})=>{
        try{
            const res=await Api.get(`/Seller/getallsellerprofiles?page=${page}&limit=${limit}`)
            return res.data.data
        }catch(err){
            return rejectWithValue(err?.message)

        }
    })
    export const ToggleBlock=createAsyncThunk(
        'auth/block',
        async(userId,{rejectWithValue})=>{
            try{
                const res=await Api.put(`/users/toogleblock/${userId}`)
                return res.data.data

            }catch(err){
                return rejectWithValue(err?.message)

            }

        })

        export const SellerStatus=createAsyncThunk(
            'auth/status',
            async({sellerId,status},{rejectWithValue})=>{
        try{
                const res=await Api.put(`/Seller/sellerstatus/${sellerId}`,{status})
                return res.data.data

            }catch(err){
                return rejectWithValue(err?.message)

            }
        })