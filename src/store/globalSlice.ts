import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface TOAST {
  title?: string;
  message?: string;
  type?: "success" | "error";
  show?: boolean;
}
interface InitialState {
  showLoading: boolean;
  showToast: TOAST | null;
}

const initialState: InitialState = {
  showLoading: false,
  showToast: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showLoading: (state) => {
      return {
        ...state,
        showLoading: true,
      };
    },
    hideLoading: (state) => {
      return {
        ...state,
        showLoading: false,
      };
    },
    showToast: (state, action: PayloadAction<TOAST>) => {
      return {
        ...state,
        showToast: {
          title: action.payload.title,
          message: action.payload.message,
          type: action.payload.type,
          show: true,
        },
      };
    },
    hideToast: (state) => {
      return {
        ...state,
        showToast: {
          ...state.showToast,
          show: false,
        },
      };
    },
  },
});

export const { hideLoading, hideToast, showLoading, showToast } =
  globalSlice.actions;
export default globalSlice.reducer;
