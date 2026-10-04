import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar, logout, updateUser } from "../userSlice";

import axios from "../../../utils/axios";
import { updateOtpEmail } from "../authSlice";
import { clearChat } from "../chatSlice";
import { socket } from "../../../utils/socket";

const executeRecaptchaWithTimeout = (recaptchaRef) => {
  if (!recaptchaRef.current) {
    return Promise.reject(new Error("reCAPTCHA is not ready. Please retry."));
  }

  let timeoutId;
  return Promise.race([
    recaptchaRef.current.executeAsync(),
    new Promise((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error("reCAPTCHA timed out. Please retry.")),
        15000
      );
    }),
  ]).finally(() => clearTimeout(timeoutId));
};

// ------------- Login Thunk -------------
export const LoginUser = createAsyncThunk(
  "auth/login",
  async ({ recaptchaRef, ...formValues }, { rejectWithValue, dispatch }) => {
    try {
      // generate recaptcha token
      const recaptchaToken = await executeRecaptchaWithTimeout(recaptchaRef);

      const { data } = await axios.post("/auth/login", {
        ...formValues,
        recaptchaToken,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      // if user is not verified
      if (!data.user) {
        dispatch(updateOtpEmail({ otpEmail: formValues.email }));
        setTimeout(() => {
          window.location.href = "/auth/verify";
        }, 1000);
      } else {
        // update user data
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.response?.data?.error?.status || "error",
          message:
            error.response?.data?.error?.message ||
            error.message ||
            "Unable to log in. Please try again.",
        })
      );
      return rejectWithValue(error.response?.data?.error || error);
    }
  }
);

// ------------- Logout Thunk -------------
export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async (arg, { rejectWithValue, dispatch }) => {
    dispatch(clearChat());
    dispatch(logout());
    socket.disconnect();

    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.post("/auth/logout");

        // show snackbar
        dispatch(
          ShowSnackbar({
            severity: data.status,
            message: data.message,
          })
        );

        // Resolve the promise to indicate that the operation is complete
        resolve();
      } catch (error) {
        dispatch(
          ShowSnackbar({
            severity: error?.error?.status || "error",
            message: error?.error?.message || "logout failed",
          })
        );

        return rejectWithValue(error);
      }
    });
  }
);

// ------------- Register Thunk -------------
export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (
    { recaptchaRef, ...formValues },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      // generate recaptcha token
      const recaptchaToken = await executeRecaptchaWithTimeout(recaptchaRef);

      const { data } = await axios.post(
        "/auth/register",
        {
          ...formValues,
          recaptchaToken,
        },
        { timeout: 30000 }
      );

      // update otp email
      dispatch(updateOtpEmail({ otpEmail: formValues.email }));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      if (!getState().auth.error) {
        setTimeout(() => {
          window.location.href = "/auth/verify";
        }, 1000);
      }

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.response?.data?.error?.status || "error",
          message:
            error.response?.data?.error?.message ||
            error.message ||
            "Unable to register. Please try again.",
        })
      );
      return rejectWithValue(error.response?.data?.error || error);
    }
  }
);

// ------------- Verify OTP Thunk -------------
export const VerifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async (
    { recaptchaRef, ...formValues },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      // generate recaptcha token
      const recaptchaToken = await executeRecaptchaWithTimeout(recaptchaRef);

      const { data } = await axios.post("/auth/verify-otp", {
        ...formValues,
        recaptchaToken,
      });

      // update user data
      dispatch(updateUser(data.user));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Send OTP Thunk -------------
export const SendOTP = createAsyncThunk(
  "auth/send-otp",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    // update otp email
    dispatch(updateOtpEmail({ otpEmail: formValues.email }));

    try {
      const { data } = await axios.post("/auth/send-otp", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Add Email Thunk -------------
export const AddOtpEmail = createAsyncThunk(
  "auth/addOtpEmail",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      // update otp email
      dispatch(updateOtpEmail({ otpEmail: formValues.email }));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: "success",
          message: "Email Added Successfully",
        })
      );
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error,
          message: "Could not add email",
        })
      );
      return rejectWithValue(error);
    }
  }
);

// ------------- Forgot Password Thunk -------------
export const ForgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (
    { recaptchaRef, ...formValues },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      // Generate the reCAPTCHA token inside the try block so a reCAPTCHA
      // failure also rejects cleanly and lets Redux clear the loading state.
      const recaptchaToken = await executeRecaptchaWithTimeout(recaptchaRef);

      const { data } = await axios.post(
        "/auth/forgot-password",
        {
          ...formValues,
          recaptchaToken,
        },
        { timeout: 30000 }
      );

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        "Unable to send a password reset link. Please try again.";

      dispatch(
        ShowSnackbar({
          severity: error.response?.data?.error?.status || "error",
          message,
        })
      );
      return rejectWithValue({ message });
    }
  }
);

// ------------- Reset Password Thunk -------------
export const ResetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/reset-password", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Refresh Token Thunk -------------
export const RefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/refresh-token/");

      // if user is not verified
      if (!data.user) {
        alert("Token expired, Logging you out...");
        dispatch(LogoutUser());
      } else {
        // update user data
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Start Server Thunk -------------
export const StartServer = createAsyncThunk(
  "start/server",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      await axios.get("/start-server");
    } catch (error) {
      console.log(error);
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error);
    }
  }
);

// ------------- Google Login Thunk -------------
export const GoogleLogin = createAsyncThunk(
  "auth/google",
  async (token, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/google", {
        code: token.access_token,
      });

      console.clear();

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      // update user data
      dispatch(updateUser(data.user));

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);
