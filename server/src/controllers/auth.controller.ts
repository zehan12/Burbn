import { Request, Response } from "express";
import { User } from "../model/index";
import asyncWrap from "utils/handleAsync";
import * as authService from "../services/auth.service";
import { errorMessage, statusCode, successMessage } from "helpers/status";

export const signUp = asyncWrap(async (req: Request, res: Response) => {
  // 1) Calling sign up service
  const { type, errorMessage, successMessage, statusCode, data, token } =
    await authService.signUp(req.body, {});

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      errorMessage,
    });
  }

  //   3) If everything is OK, send data
  return res
    .cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .header("Authorization", token.accessToken)
    .status(statusCode)
    .json({
      type,
      successMessage,
      data,
      access_token: token.accessToken,
    });
});

export const login = asyncWrap(async (req: Request, res: Response) => {
  // 1) Calling login in service
  const { type, errorMessage, successMessage, statusCode, data, token } =
    await authService.login(req.body);

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      errorMessage,
    });
  }

  //   3) If everything is OK, send data
  return res
    .cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .header("Authorization", token.accessToken)
    .status(statusCode)
    .json({
      type,
      successMessage,
      data,
      access_token: token.accessToken,
    });
});

export const logout = asyncWrap(async (req: Request, res: Response) => {
  try {
    // 1) clear refresh token from cookie when logout
    // 2) If everything is OK, send data
    return res
      .clearCookie("refreshToken", { path: "/api/auth/refresh-token" })
      .status(statusCode.success)
      .json({
        type: "Success",
        token: req.cookies,
        successMessage: "logout",
      });
  } catch (error) {
    // 3) Check if something went wrong
    errorMessage.error = error.message;
    return res.status(statusCode.error).json({
      type: "Error",
      errorMessage,
    });
  }
});

export const generateAccessToken = asyncWrap(
  async (req: Request, res: Response) => {
    // 1) Calling generate access token service
    const { type, errorMessage, successMessage, statusCode, data, token } =
      await authService.generateAccessToken(req.cookies);

    // 2) Check if something went wrong
    if (type === "Error") {
      return res.status(statusCode).json({
        type,
        errorMessage,
      });
    }

    console.log(token,"token")
    //   3) If everything is OK, send data
    return res.status(statusCode).json({
      type,
      successMessage,
      data,
      access_token: token,
    });
    // .cookie("refreshToken", token.refreshToken, {
    //   httpOnly: true,
    //   path: "/api/auth/refresh-token",
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // })
    // .header("Authorization", token.accessToken)
  }
);
