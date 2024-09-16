import jws from "jsonwebtoken";
import { SECRET } from "../config/secret.js";
import prisma from "../config/prisma.js";
import { CompanyRole } from "@prisma/client";

export const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "not token provide",
    });
  }
  try {
    const payLoad = jws.verify(token, SECRET);

    const user = await prisma.users.findFirst({
      where: {
        id: +payLoad.userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "invalid token ",
    });
  }
};

export const isAdmin = (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== CompanyRole.ADMIN) {
    return res.status(401).json({ success: false, message: "User not admin" });
  }
  next();
};
export const isDH = (req, res, next) => {
  const dh = req.user;
  if (dh && dh.role !== CompanyRole.DEPARTMENT_HEAD) {
    return res
      .status(401)
      .json({ success: false, message: "User not department head" });
  }
  next();
};

export const isLS = (req, res, next) => {
  const ls = req.user;
  if (ls && ls.role !== CompanyRole.LOGESTIC_SUPERVISER) {
    return res
      .status(401)
      .json({ success: false, message: "User not logestistic superviser" });
  }
  next();
};
export const isFinance = (req, res, next) => {
  const finance = req.user;
  if (finance && finance.role !== CompanyRole.FINANCE) {
    return res
      .status(401)
      .json({ success: false, message: "User not finance" });
  }
  next();
};
export const isGM = (req, res, next) => {
  const gm = req.user;
  if (gm && gm.role !== CompanyRole.GENERAL_MANAGER) {
    return res
      .status(401)
      .json({ success: false, message: "User not general manager" });
  }
  next();
};
export const isAnyRole = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      return next();
    }
    return res.status(401).json({ success: false, message: "Access denied" });
  };
};

export const isStoreKeeper = (req, res, next) => {
  const sk = req.user;
  if (sk && sk.role !== CompanyRole.STORE_KEEPER) {
    return res
      .status(401)
      .json({ success: false, message: "User not store keeper" });
  }
  next();
};
