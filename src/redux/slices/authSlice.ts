import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ConfirmationResult } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { Status } from '@/shared/types/enums';
import type { StateAuth } from '@/shared/types/Types';

import { auth } from '../../integations/firebase';

const setupRecaptcha = (phoneNumber: string) => {
  const recapthca = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible'
  });
  return signInWithPhoneNumber(auth, phoneNumber, recapthca);
};
export const signIn = createAsyncThunk<ConfirmationResult, string, { rejectValue: string }>(
  'auth/signPhoneNumber',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const testObj = await setupRecaptcha(phoneNumber);
      return testObj;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState = {
  status: Status.LOADING,
  captchaFetch: {}
} as StateAuth;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      state.captchaFetch = action.payload;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});

export default authSlice.reducer;
