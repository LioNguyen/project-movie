import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface TOAST {
  title?: string;
  message?: string;
  type?: "success" | "error";
  show?: boolean;
}
interface InitialState {
  showLoader: boolean;
  showToast: TOAST | null;
}

const initialState: InitialState = {
  showLoader: false,
  showToast: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showLoader: (state) => {
      return {
        ...state,
        showLoader: true,
      };
    },
    hideLoader: (state) => {
      return {
        ...state,
        showLoader: false,
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

export const { hideLoader, hideToast, showLoader, showToast } =
  globalSlice.actions;
export default globalSlice.reducer;
