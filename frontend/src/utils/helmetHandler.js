import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HelmetHandler = () => {
  const location = useLocation();

  const capitalize = (str) => {
    // Replace underscores and dashes with spaces
    str = str.replace(/[_-]/g, " ");

    // Split the string by spaces
    const words = str.split(" ");

    // Capitalize the first character of each word
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back together with spaces
    return capitalizedWords.join(" ");
  };

  const getPageMetadata = () => {
    const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
    const pathSegments = normalizedPath.split("/");
    const firstSegment = pathSegments[1];
    const lastSegment = pathSegments[pathSegments.length - 1];
    const capitalizedLastSegment = capitalize(lastSegment);

    switch (firstSegment) {
      // managing all auth routes
      case "auth":
        if (lastSegment === "welcome") {
          return {
            title: "PakChat | Real-Time Chat",
            description:
              "Welcome to PakChat, a real-time chat app. Make friends and connect.",
            keywords:
              "pakchat, chat, chat app, mern, message, welcome",
          };
        } else {
          return {
            title: `${capitalizedLastSegment} | PakChat`,
            description:
              "Log in or create a PakChat account to connect with your friends.",
            keywords:
              "login, register, create account, pakchat, chat, chat app, mern, message, welcome",
          };
        }

      case "app":
        return {
          title: `All Chats | PakChat`,
          description:
            "Chat, share memes, and video call with your friends on PakChat.",
        };

      // metadata for all default routes
      default:
        return {
          title: `${capitalizedLastSegment} | PakChat`,
          description:
            "Welcome to PakChat, a real-time chat app. Make friends and connect.",
          keywords:
            "pakchat, chat, chat app, mern, message, welcome",
        };
    }
  };

  const { title, description, keywords } = getPageMetadata();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default HelmetHandler;
