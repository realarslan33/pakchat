import createHttpError from "http-errors";
import axios from "axios";

import { handleSocialUser } from "../services/socialAuthService.js";

// -------------------------- Google Auth --------------------------
export const googleAuth = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      throw createHttpError.BadRequest("Unable to sign in using Google");
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      }
    );

    const { email_verified, email, name, picture } = data;

    if (!email_verified) {
      throw createHttpError.Unauthorized("Google Email is Not Verified");
    }

    const userData = await handleSocialUser(
      email,
      name,
      picture,
      "google",
      res
    );

    return res.status(200).json({
      status: "success",
      message: "Logged In",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};
