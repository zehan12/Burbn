import asyncWrap from "utils/handleAsync";
import { errorMessage, statusCode, successMessage } from "helpers/status";
import {
  empty,
  isValidEmail,
  validatePassword,
  checkUsername,
} from "utils/validation";
import { User } from "../model/index";
import jwt from "jsonwebtoken";

const generateToken = (payload: object, secret: string, expiry: string) => {
  return jwt.sign(payload, secret, { expiresIn: expiry });
};

export const signUp = asyncWrap(async (body: any, profileImage: any) => {
  let { fullname, username, email, password, gender } = body;
  const newUsername = username.replaceAll(" ", "");

  if (!checkUsername(newUsername)) {
    errorMessage.error = "username is not valid";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  if (typeof password === "number") {
    password = String(password);
  }

  if (
    empty(email) ||
    empty(fullname) ||
    empty(password) ||
    empty(newUsername)
  ) {
    errorMessage.error =
      "fullname, username, email and password field cannot be empty";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid Email";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than eight(8) characters";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  try {
    const usernameAlreadyTaken = await User.findOne({ username });
    if (usernameAlreadyTaken) {
      errorMessage.error = `User with this ${username} username already exist`;
      return {
        type: "Error",
        statusCode: statusCode.conflict,
        errorMessage,
      };
    }
    const userExit = await User.findOne({ email });
    if (userExit) {
      errorMessage.error = `User with this ${email} already exist`;
      return {
        type: "Error",
        statusCode: statusCode.conflict,
        errorMessage,
      };
    } else {
      const user = await User.create({
        fullname,
        username: newUsername,
        email,
        password,
        gender,
      });

      console.log(user);
      let data = user;

      let payload = {
        id: user._id,
      };

      // handle when token failed immediately delete the user
      try {
        if (user) {
          var refreshToken = generateToken(payload, "refresh", "3d");
          var accessToken = generateToken(payload, "access", "1d");
          console.log(
            "Tokens generated successfully:",
            refreshToken,
            accessToken
          );
        } else {
          console.error("User object is undefined or missing data.");
        }
      } catch (error) {
        console.error("Token generation failed:", error);
      }

      successMessage.message =
        "user created, registered and signup successfully";
      return {
        type: "Success",
        statusCode: statusCode.created,
        successMessage,
        data,
        token: {
          refreshToken,
          accessToken,
        },
      };
    }
  } catch (error) {
    errorMessage.error = `Operation was not successful due to ${error.message}`;
    return {
      type: "ERROR",
      statusCode: statusCode.error,
      errorMessage,
    };
  }
});

export const login = asyncWrap(async (body: any) => {
  let { username, email, password } = body;
  // as per current scenario required either email or username for login
  if (typeof password === "number") {
    password = String(password);
  }
  if (empty(password)) {
    errorMessage.error = "password is required.";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }
  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than eight(8) characters";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  if (username) {
    if (empty(username)) {
      return {
        type: "Error",
        errorMessage: "Username with spaces is not allowed",
        statusCode: statusCode.bad,
      };
    }

    if (!checkUsername(username)) {
      return {
        type: "Error",
        errorMessage: "Username is not valid",
        statusCode: statusCode.bad,
      };
    }
  }

  if (email) {
    if (!isValidEmail(email)) {
      return {
        type: "Error",
        errorMessage: "Please enter a valid email",
        statusCode: statusCode.bad,
      };
    }
  }

  if (!email && !username) {
    return {
      type: "Error",
      errorMessage: "Username or email is required",
      statusCode: statusCode.bad,
    };
  }

  try {
    const user = email
      ? await User.findOne({ email })
      : await User.findOne({ username });

    if (!user) {
      return {
        type: "Error",
        errorMessage: email
          ? "User with this email does not exist"
          : "User with this username does not exist",
        statusCode: statusCode.notfound,
      };
    }

    let data = user;

    // const isPasswordMatch = await user.verifyPassword(password);
    // if (!isPasswordMatch) {
    //     errorMessage.error = 'The password you provided is incorrect';
    //     return {
    //         type:"Error",
    //         statusCode:statusCode.bad,
    //         errorMessage
    //     }
    // }

    let payload = {
      id: user._id,
    };

    // handle token
    try {
      if (user) {
        var refreshToken = generateToken(payload, "refresh", "3d");
        var accessToken = generateToken(payload, "access", "1d");
        console.log(
          "Tokens generated successfully:",
          refreshToken,
          accessToken
        );
      } else {
        console.error("User object is undefined or missing data.");
      }
    } catch (error) {
      console.error("Token generation failed:", error);
    }

    successMessage.message = "user login successfully";
    return {
      type: "Success",
      statusCode: statusCode.created,
      successMessage,
      data,
      token: {
        refreshToken,
        accessToken,
      },
    };
  } catch (error) {
    console.log(error);
    errorMessage.error = `Operation was not successful due to ${error.message}`;
    return {
      type: "ERROR",
      statusCode: statusCode.error,
      errorMessage,
    };
  }
});

export const generateAccessToken = asyncWrap(
  async (cookies: { refreshToken: string }) => {
    const refresh_token = cookies.refreshToken;
    try {
      if (!refresh_token) {
        errorMessage.error = "refresh token not found, Please Login now.";
        return {
          type: "Error",
          statusCode: statusCode.bad,
        };
      }

      const verifiedUserToken: any = jwt.verify(refresh_token, "refresh");
      console.log(verifiedUserToken, "isVerified");
      console.log(verifiedUserToken, "token");
      const user = await User.findById(verifiedUserToken.id)
        .select("-password")
        .populate("followers following");

      let payload = { user: user.id };
      const accessToken = generateToken(payload, "access", "3d");
      successMessage.message = "access token generated.";
      return {
        type: "Success",
        statusCode: statusCode.success,
        token: accessToken,
        successMessage,
      };
    } catch (error) {
      errorMessage.error = error.message;
      if (error.message.includes("jwt")) {
        errorMessage.error = "Invalid JWT token, please login again.";
      }
      if (error.message.includes("invalid")) {
        errorMessage.error = error.message + ", manipulation in token.";
      }

      if (error.message.includes("ObjectId")) {
        errorMessage.error = "user not found.";
      }
      return {
        type: "Error",
        statusCode: statusCode.error,
        errorMessage,
      };
    }
  }
);
