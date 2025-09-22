import { httpError } from "#types/errors.js";
import { setResponse } from "#types/setResponse.js";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";




function isHttpError(e: unknown): e is httpError {
  if (typeof e !== "object" || e === null) return false;
  const maybe = e as Record<string, unknown>;
  if (!("status" in maybe)) return false;
  const s = maybe.status;
  const isNumber = typeof s === "number" && Number.isFinite(s);
  const isNumericString = typeof s === "string" && /^\d{3}$/.test(s);
  const messageOk = !("message" in maybe) || typeof maybe.message === "string";
  return (isNumber || isNumericString) && messageOk;
}
 
const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  void next;
 
  if (err instanceof ZodError) {
    console.error("Validation error:", err);
    const issues = z.treeifyError(err);
    return setResponse(res, 400, { data: { issues }, message: "Validation failed", status: "error" });
  }
 
  if (axios.isAxiosError(err)) {
    const axiosErr = err;
    const upstreamStatus = axiosErr.response?.status;
    const hasResponse = typeof upstreamStatus === "number";
    const statusCode = hasResponse ? upstreamStatus : axiosErr.request ? 502 : 500;
    const message = axiosErr.response?.statusText ?? axiosErr.message;
    console.error("Axios error:", axiosErr.message);
    return setResponse(res, statusCode, { data: undefined, message, status: "error" });
  }
 
  if (isHttpError(err)) {
    const httpErr = err;
    const statusCode = Number(httpErr.statusCode) || 500;
    const message = httpErr.message || "Error";
    const data = httpErr.upstream;
    console.error("HTTP-like error:", httpErr);
    return setResponse(res, statusCode, { data, message, status: "error" });
  }
 
  console.error("Unexpected error:", err);
  return setResponse(res, 500, { data: undefined, message: "Internal Server Error", status: "error" });
};
 
export default errorHandler;