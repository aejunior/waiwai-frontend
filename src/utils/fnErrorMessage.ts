import axios from "axios";
import {
  ApiResponseError,
  ApiResponseErrorMessage,
  ValidationErrorDetail,
} from "../types/api";

function isValidationErrorDetail(item: unknown): item is ValidationErrorDetail {
  if (typeof item !== "object" || item === null) return false;
  const obj = item as Record<string, unknown>;
  if (!Array.isArray(obj.loc)) return false;
  if (!obj.loc.every((el) => typeof el === "string" || typeof el === "number"))
    return false;
  return typeof obj.msg === "string" && typeof obj.type === "string";
}

export function isValidationArray(d: unknown): d is ValidationErrorDetail[] {
  return Array.isArray(d) && d.every(isValidationErrorDetail);
}

export function isErrorMessageObj(d: unknown): d is ApiResponseErrorMessage {
  if (typeof d !== "object" || d === null) return false;
  return "msg" in d && typeof (d as Record<string, unknown>).msg === "string";
}

export default function fnErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response) {
    const data = err.response.data as ApiResponseError;
    const { detail } = data;

    if (isValidationArray(detail)) {
      return detail.map((d) => d.msg).join(" • ");
    }

    if (isErrorMessageObj(detail)) {
      return detail.msg;
    }

    return "Um erro ocorreu no servidor.";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}
