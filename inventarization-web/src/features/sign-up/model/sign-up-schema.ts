import { z } from "zod";

import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/shared/constants/input-fields";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .refine((field) => field.trim().length > 0, {
        message: "email is required",
      })
      .refine((field) => field.trim().length >= EMAIL_MIN_LENGTH, {
        message: `email min length is ${EMAIL_MIN_LENGTH}`,
      })
      .refine((field) => field.trim().length <= EMAIL_MAX_LENGTH, {
        message: `email max length is ${EMAIL_MAX_LENGTH}`,
      })
      .refine((field) => EMAIL_REGEX.test(field.trim()), {
        message: "invalid format",
      }),
    password: z
      .string()
      .refine((field) => field.trim().length > 0, {
        message: "password is required",
      })
      .refine((field) => field.trim().length >= PASSWORD_MIN_LENGTH, {
        message: `password min length is ${PASSWORD_MIN_LENGTH}`,
      })
      .refine((field) => field.trim().length <= PASSWORD_MAX_LENGTH, {
        message: `password max length is ${PASSWORD_MAX_LENGTH}`,
      }),
    repeatPassword: z
      .string()
      .refine((field) => field.trim().length > 0, {
        message: "password is required",
      })
      .refine((field) => field.trim().length >= PASSWORD_MIN_LENGTH, {
        message: `password min length is ${PASSWORD_MIN_LENGTH}`,
      })
      .refine((field) => field.trim().length <= PASSWORD_MAX_LENGTH, {
        message: `password max length is ${PASSWORD_MAX_LENGTH}`,
      }),
  })
  .refine((fields) => fields.password === fields.repeatPassword, {
    message: "passwords not match",
    path: ["repeatPassword"],
  });
