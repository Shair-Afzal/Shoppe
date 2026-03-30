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