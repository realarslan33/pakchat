import { UserModel } from "../models/index.js";

// search friends
export const searchForFriends = async (populatedFriends, keyword, page) => {
  const pageSize = 10; // maximum users to display at once
  let friends = [];
  let totalCount = 0;

  // Extract friend IDs for the search criteria
  const friendIds = populatedFriends.friends.map((friend) => friend._id);

  // Build the search criteria
  const searchCriteria = {
    _id: { $in: friendIds }, // Only search within the friends of the current user
  };

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nameRegex = new RegExp(escapedKeyword, "i");
  searchCriteria.$or = [
    { firstName: nameRegex },
    { lastName: nameRegex },
    { email: nameRegex },
    {
      $expr: {
        $regexMatch: {
          input: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          regex: escapedKeyword,
          options: "i",
        },
      },
    },
  ];

  // Perform the search
  friends = await UserModel.find(searchCriteria)
    .select("_id firstName lastName email avatar activityStatus onlineStatus")
    .limit(pageSize)
    .skip(page * pageSize);

  // Get the total count for pagination
  totalCount = await UserModel.countDocuments(searchCriteria);

  return { friends, totalCount };
};
