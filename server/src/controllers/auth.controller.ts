import { Request, Response } from "express";
import { User } from "../model/index";
import asyncWrap from "utils/handleAsync";
import * as authService from "../services/auth.service";

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

export const generateAccessToken = asyncWrap(
  async (req: Request, res: Response) => {
    // 1) Calling generate access token service
    const { type, errorMessage, successMessage, statusCode, data, token } =
      await authService.generateAccessToken(req.body, {});

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
  }
);
