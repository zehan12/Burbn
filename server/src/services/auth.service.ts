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
        fullname: user.fullname,
        username: user.username,
        email: user.email,
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
      statusCode: statusCode.bad,
      errorMessage,
    };
  }
});

export const login = asyncWrap(async (body: any) => {
  let { username, email, password } = body;

  if (username !== username.replaceAll(" ", "")) {
    errorMessage.error = "username with space not allowed";
    return {
      type: "Error",
      errorMessage,
      statusCode: statusCode.bad,
    };
  }

  if (!checkUsername(username)) {
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

  if (empty(email) || empty(password) || empty(username)) {
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
    const user = await User.findOne({ email });
    if (!user) {
      errorMessage.error = "User with this email does not exist";
      return {
        type: "Error",
        statusCode: statusCode.notfound,
        errorMessage,
      };
    }

    let data = user;
    if (username !== user.username) {
      errorMessage.error = "Enter username is wrong!!";
      return {
        type: "Error",
        statusCode: statusCode.notfound,
        errorMessage,
      };
    }

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
      fullname: user.fullname,
      username: user.username,
      email: user.email,
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
      statusCode: statusCode.bad,
      errorMessage,
    };
  }
});

export const logout = asyncWrap(async () => {
    
});

export const generateAccessToken = asyncWrap(async () => {});
