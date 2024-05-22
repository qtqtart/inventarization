import { z } from "zod";

import {
  SMALL_FIELD_MAX_LENGTH,
  SMALL_FIELD_MIN_LENGTH,
} from "@/shared/constants.ts";

export const CreateRamSchema = z.object({
  model: z
    .string()
    .refine((field) => field.trim().length > 0, {
      message: "ram model is required",
    })
    .refine((field) => field.trim().length >= SMALL_FIELD_MIN_LENGTH, {
      message: `ram model min length is ${SMALL_FIELD_MIN_LENGTH}`,
    })
    .refine((field) => field.trim().length <= SMALL_FIELD_MAX_LENGTH, {
      message: `ram model max length is ${SMALL_FIELD_MAX_LENGTH}`,
    }),

  manufacturerCode: z
    .string()
    .refine((field) => field.trim().length > 0, {
      message: "ram manufacturer code is required",
    })
    .refine((field) => field.trim().length >= SMALL_FIELD_MIN_LENGTH, {
      message: `ram manufacturer code min length is ${SMALL_FIELD_MIN_LENGTH}`,
    })
    .refine((field) => field.trim().length <= SMALL_FIELD_MAX_LENGTH, {
      message: `ram manufacturer code max length is ${SMALL_FIELD_MAX_LENGTH}`,
    }),

  brandId: z.string().refine((field) => field.trim().length > 0, {
    message: "ram brand is required",
  }),
});