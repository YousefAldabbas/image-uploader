import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageServices from "./imageService";

const initialState = {
  image: null,
  isLoading: null,
  isSuccess: null,
  isError: null,
  message: "",
};

export const uploadImage = createAsyncThunk(
  "image/upload",
  async (data, { rejectWithValue }) => {
    try {
      return await imageServices.upload(data);
    } catch (error) {
      console.log(error);
      const message = error?.data?.detail || "error?";
      return rejectWithValue(message);
    }
  }
);

export const getRandomImage = createAsyncThunk(
  "image/getRandomImage",
  async (_, { rejectWithValue }) => {
    try {
      return await imageServices.getRandomImage();
    } catch (error) {
      const message =
        error?.data?.detail || error?.response?.statusText === "Not Found"
          ? "storage is empty upload image first"
          : "Error";
      return rejectWithValue(message);
    }
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomImage.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(getRandomImage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.image = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(getRandomImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = imageSlice.actions;

export default imageSlice.reducer;
