import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../Axios";

export const Createproduct = createAsyncThunk(
  "product/create",
  async (
    { name, price, description, color, size, image, stock, category },
    { rejectWithValue }
  ) => {
    const formData = new FormData();

    try {
    
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("stock", stock);
      formData.append("category", category);

      
      image.forEach((img, index) => {
        let localUri = img.uri || img.path;

        let filename =
          img.fileName ||
          img.filename ||
          (localUri
            ? localUri.split("/").pop()
            : `product_${Date.now()}_${index}.jpg`);

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append("image", {
          uri:
            Platform.OS === "android"
              ? localUri
              : localUri.replace("file://", ""),
          name: filename,
          type,
        });
      });

      const res = await Api.post("/products/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Product creation failed";

      return rejectWithValue(message);
    }
  }
);


export const GetAllCategories = createAsyncThunk(
  "category/getall",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get("/categories/getallcategories");
      return res.data.data; // 👈 backend structure ke hisaab se
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch categories";

      return rejectWithValue(message);
    }
  }
);

export const GetAllProducts=createAsyncThunk(
  'product/all',
  async({page=1, limit=3}, {rejectWithValue})=>{
  try{
    const res=await Api.get(`/products/getallproducts?page=${page}&limit=${limit}`);

    return res.data.data;

  }catch(err){
    const message=
    err.response?.data?.message ||
    err.message ||
    "Failed to fetch products";
    return rejectWithValue(message);

  }
  }
)
export const UpdateProduct=createAsyncThunk(
  'product/update',
  async({id,name, price, description, color, size, image, stock, category},{rejectWithValue})=>{
    const formData = new FormData();
    try {
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("stock", stock);
      formData.append("category", category);
      image.forEach((img, index) => {
        let localUri = img.uri || img.path;
        let filename =
          img.fileName ||
          img.filename ||
          (localUri
            ? localUri.split("/").pop()
            : `product_${Date.now()}_${index}.jpg`);
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image/jpeg`;
        formData.append("image", {
          uri:
            Platform.OS === "android"
              ? localUri
              : localUri.replace("file://", ""),
          name: filename,
          type,
        });
      }); 
      const res=await Api.put(`/products/updateproduct/${id}`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      return res.data.data;
    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to update product";
      return rejectWithValue(message);
    }
  }
)

export const DeleteProduct=createAsyncThunk(
  'product/delete',
  async(id,{rejectWithValue})=>{
    try{
      const res=await Api.delete(`/products/deleteproduct/${id}`);
      return res.data.data;
    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to delete product";
      return rejectWithValue(message);
    }
  }
)

export const Productdetails=createAsyncThunk(
  'product/details',
  async(id,{rejectWithValue})=>{
    try{
      const res=await Api.get(`/products/getproduct/${id}`);
      return res.data.data;
    } catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch product details";
      return rejectWithValue(message);
    }
  }
)

export const AddtoCart=createAsyncThunk(
  'cart/add',
  async({productId,quantity},{rejectWithValue})=>{
    try{
      const res=await Api.post('/cart/addtocart',{productId,quantity});
      return res.data.data;
    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to add to cart";
      return rejectWithValue(message);
    }
  }
)

export const GetCart=createAsyncThunk(
  'cart/get',
  async(_,{rejectWithValue})=>{
    try{
      const res=await Api.get('/cart/getcart');
      return res.data.data;
    }
    catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch cart";
      return rejectWithValue(message);
    }
  }
)

export const DeleteCartItem=createAsyncThunk(
  'cart/delete',
  async(id,{rejectWithValue})=>{
    try{
      const res=await Api.delete(`/cart/deletecartitem/${id}`);
      return res.data.data;
    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to delete cart item";
      return rejectWithValue(message);
    }

  }
)

export const UpdateCartItem=createAsyncThunk(
  'cart/update',
  async({id,action},{rejectWithValue})=>{
    try{
      const res=await Api.put(`/cart/updatecartitem/${id}`,{action});
      return res.data.data; 

    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to update cart item";
      return rejectWithValue(message);
    }
  }
)

export const CreateOrder=createAsyncThunk(
  'order/create',
  async({cartId, shippingAddress},{rejectWithValue})=>{
    try{
      const res=await Api.post('/orders/createorder',{cartId,shippingAddress});
      return res.data.data;
    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to create order";
      return rejectWithValue(message);
    }
  }
)

export const initializePaymentSheet=createAsyncThunk(
  'payment/initialize',
  async({orderId},{rejectWithValue})=>{
    try{
      const res=await Api.post('/payment/createpaymentintent',{orderId});
      return res.data.data;

    }catch(err){
      const message=
      err.response?.data?.message ||
      err.message ||
      "Failed to initialize payment";
      return rejectWithValue(message);
    }

  }

)
export const toggleFavourite = createAsyncThunk(
  "favourite/toggle",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/products/togglefavourite", { productId });
      return res.data.data; 
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to toggle favourite";
      return rejectWithValue(message);
    }
  }
);
export const getFavourites = createAsyncThunk(
  "favourite/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get("/products/favourites");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
