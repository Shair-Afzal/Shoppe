import { createSlice } from "@reduxjs/toolkit";
import { Createproduct,GetAllCategories,GetAllProducts,UpdateProduct,DeleteProduct,Productdetails,AddtoCart,GetCart ,DeleteCartItem,UpdateCartItem,CreateOrder,initializePaymentSheet,toggleFavourite,getFavourites,AllordersGet, MyordersGet} from "../Action/Productaction";

const initialState = {
  loading: false,
  product: null,
  error: null,
  allcategories:[],
  allproducts:[],
  currentPage: 1,
  totalPages: 1,
  isfetchMore: false,
  cart:[],
  currentorder:null,
  order:[],
  clientSecret: null,
  favourites: [],
  totalproducts:0,
  MyordersGet
  



};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Createproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(Createproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(Createproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(GetAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allcategories = action.payload;
      })

      .addCase(GetAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetAllProducts.pending, (state,action) => {
        if (action.meta.arg.page === 1) {
         state.loading = true;
          state.error = null;
        } else {
          state.isfetchMore = true;
          state.error = null;
          
        }
      })

      .addCase(GetAllProducts.fulfilled, (state, action) => {
                const { docs, page, totalPages,totalDocs  } = action.payload;

        state.loading = false;
        state.currentPage = page;
        state.totalPages = totalPages;
        state.isfetchMore = false;
        state.totalproducts=totalDocs
        if(page===1){
          state.allproducts=docs
          
        }else{
           const existingIds = new Set(state.allproducts.map(p => p._id));
        const newdata = docs.filter(p => !existingIds.has(p._id));
        state.allproducts = [...state.allproducts, ...newdata];
      }

        

      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.isfetchMore = false;
        state.error = action.payload;
      })
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;

  const index = state.allproducts.findIndex(
    p => p._id === updated._id
  );

  if (index !== -1) {
    state.allproducts[index] = updated;
  }
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(DeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload._id;
        state.allproducts = state.allproducts.filter(p => p._id !== deletedId);
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Productdetails.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(Productdetails.fulfilled,(state,action)=>{
        state.loading=false;
        state.product=action.payload;
      })
      .addCase(Productdetails.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(AddtoCart.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }
      )
      .addCase(AddtoCart.fulfilled,(state,action)=>{
        state.loading=false;
        const newItem = action.payload;

  const existingIndex = state.cart.findIndex(
    item => item.productId === newItem.productId
  );

  if (existingIndex !== -1) {
    // update existing
    state.cart[existingIndex] = newItem;
  } else {
    // add new
    state.cart.push(newItem);
  }
      })
      .addCase(AddtoCart.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      }
    )
    .addCase(GetCart.pending,(state)=>{
      state.loading=true;
      state.error=null;
    }
    )
    .addCase(GetCart.fulfilled,(state,action)=>{
      state.loading=false;
      state.cart=action.payload;
    })
    .addCase(GetCart.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    }
      )
      .addCase(DeleteCartItem.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }
      )
      .addCase(DeleteCartItem.fulfilled,(state,action)=>{
        state.loading=false;
        const deletedId = action.payload._id;
        state.cart = state.cart.filter(item => item._id !== deletedId);
      })
      .addCase(DeleteCartItem.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      }
       )
       .addCase(UpdateCartItem.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }
      )
       .addCase(UpdateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.loading = false;
      
        if (!updatedItem.productId) {
          state.cart = state.cart.filter(
            item => item._id !== updatedItem._id
          );
          return;
        }

        
        const index = state.cart.findIndex(
          item => item._id === updatedItem._id
        );

        if (index !== -1) {
          state.cart[index] = updatedItem;
        }
      })
     .addCase(UpdateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CreateOrder.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }
    )
      .addCase(CreateOrder.fulfilled,(state,action)=>{
        state.loading=false;
        state.currentorder=action.payload;
  state.order = [...(state.order || []), action.payload];
       state.cart=[]; // Clear cart after successful order
      })
      .addCase(CreateOrder.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(MyordersGet.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(MyordersGet.fulfilled,(state,action)=>{
        state.loading=false;
        state.order=action.payload;
      }
    )
    .addCase(MyordersGet.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    }
  )
      .addCase(initializePaymentSheet.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }
    )
    .addCase(initializePaymentSheet.fulfilled,(state,action)=>{
      state.loading=false;
      state.clientSecret=action.payload.clientSecret;
    }
    )
    .addCase(initializePaymentSheet.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    .addCase(toggleFavourite.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(toggleFavourite.fulfilled,(state,action)=>{
      state.loading=false;
      state.favourites=action.payload;
    })
    .addCase(toggleFavourite.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    .addCase(getFavourites.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(getFavourites.fulfilled,(state,action)=>{
      state.loading=false;
  state.favourites = action.payload.map(item => item._id);
    })
    .addCase(getFavourites.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    .addCase(AllordersGet.pending,(state)=>{
      state.loading=true;
      state.error=null
    })
    .addCase(AllordersGet.fulfilled,(state,action)=>{
      state.loading=false;
      state.order=action.payload
    })
    .addCase(AllordersGet.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload
    })


  },
});

export default productSlice.reducer;