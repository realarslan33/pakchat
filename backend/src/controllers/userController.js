import createHttpError from "http-errors";
import validator from "validator";

import { deleteFile, uploadFiles } from "../services/fileUploadService.js";
import { searchForUsers, validateAvatar } from "../services/userService.js";
import { UserModel } from "../models/index.js";

// -------------------------- Update Profile --------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, activityStatus } = req.body;
    const removeAvatar = req.body.removeAvatar === "true";
    const avatar = req.file;
    const user = req.user;

    // check for empty fields
    if (!firstName || !lastName || !activityStatus) {
      throw createHttpError.BadRequest(
        "Required fields: firstName, lastName, activityStatus"
      );
    }

    // Name validation
    if (
      !validator.isLength(firstName, { min: 3, max: 16 }) ||
      !validator.isLength(lastName, { min: 3, max: 16 })
    ) {
      throw createHttpError.BadRequest(
        "First and Last Name each must be between 3-16 characters long"
      );
    }

    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      throw createHttpError.BadRequest(
        "First Name and Last Name can only contain alphabetic characters"
      );
    }

    // Activity Status validation
    if (!validator.isLength(activityStatus, { min: 3, max: 50 })) {
      throw createHttpError.BadRequest(
        "Activity Status must be between 3-50 characters long"
      );
    }

    const previousAvatar = user.avatar || "";
    let avatarUrl = removeAvatar ? "" : previousAvatar;
    if (avatar) {
      // validate avatar
      await validateAvatar(avatar);

      const mainFolder = "User Avatars";
      const uploadResult = await uploadFiles(
        mainFolder,
        avatar,
        `${firstName} ${user._id}`
      );
      avatarUrl = uploadResult.fileUrls[0];
    }

    // updating user
    user.set({
      firstName: firstName,
      lastName: lastName,
      avatar: avatarUrl,
      activityStatus: activityStatus,
    });

    await user.save();

    // Delete the previous avatar only after the profile has saved successfully.
    // A cleanup failure should not turn a successful profile update into a 500.
    if ((avatar || removeAvatar) && previousAvatar && previousAvatar !== avatarUrl) {
      const fileName = previousAvatar.split("/").pop().split(".")[0];
      deleteFile("User Avatars", `${firstName} ${user._id}`, fileName).catch(
        (error) => console.error("Failed to delete previous avatar:", error)
      );
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Search Users --------------------------
export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    const page = req.query.page || "0";

    const currentUser_id = req.user?._id;
    const friends_ids = req.user?.friends;

    // check for required fields
    if (!keyword) {
      throw createHttpError.BadRequest("Query required");
    }

    // get list of users matching keyword
    const { users, totalCount } = await searchForUsers(
      keyword,
      page,
      friends_ids,
      currentUser_id
    );

    res.status(200).json({
      status: "success",
      usersFound: totalCount,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Get User Data --------------------------
export const getUserData = async (req, res, next) => {
  try {
    const id = req.query.userId;

    // check for required fields
    if (!id) {
      throw createHttpError.BadRequest("Query required");
    }

    const userData = await UserModel.findById(id).select(
      "-password -passwordChangedAt -verified -onlineStatus -friends"
    );

    res.status(200).json({
      status: "success",
      userData: userData,
    });
  } catch (error) {
    next(error);
  }
};
