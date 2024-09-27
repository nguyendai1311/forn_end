import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload; // Cập nhật giá trị tìm kiếm
    },
    setSearchProduct: (state, action) => {
      state.search = action.payload; // Cập nhật giá trị tìm kiếm từ nguồn khác (ví dụ: giọng nói)
    },
  },
});

// Export các action để sử dụng trong các component
export const { searchProduct, setSearchProduct } = productSlice.actions;

// Export reducer để thêm vào store
export default productSlice.reducer;
