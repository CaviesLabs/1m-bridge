import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

export class uiState {
  isWrapModalOpen: boolean;
}

const uiStateSlice = createSlice({
  name: 'ui',
  initialState: {
    isWrapModalOpen: false,
  } as uiState,
  reducers: {
    onWrapModal: (state, payload: PayloadAction<boolean>) => {
      return {
        ...state,
        isWrapModalOpen: payload.payload,
      };
    },
  },
});

export const { onWrapModal } = uiStateSlice.actions;
export default uiStateSlice.reducer;

export const selectIsWrapModalOpen = createSelector(
  (state: RootState) => state.ui,
  ui => ui.isWrapModalOpen
);
