import { z } from "zod";

import {
  SMALL_FIELD_MAX_LENGTH,
  SMALL_FIELD_MIN_LENGTH,
} from "@/shared/constants.ts";

export const UpdateGpuSchema = z.object({
  model: z
    .string()
    .refine((field) => field.trim().length > 0, {
      message: "gpu model is required",
    })
    .refine((field) => field.trim().length >= SMALL_FIELD_MIN_LENGTH, {
      message: `gpu model min length is ${SMALL_FIELD_MIN_LENGTH}`,
    })
    .refine((field) => field.trim().length <= SMALL_FIELD_MAX_LENGTH, {
      message: `gpu model max length is ${SMALL_FIELD_MAX_LENGTH}`,
    })
    .optional(),

  manufacturerCode: z
    .string()
    .refine((field) => field.trim().length > 0, {
      message: "gpu manufacturer code is required",
    })
    .refine((field) => field.trim().length >= SMALL_FIELD_MIN_LENGTH, {
      message: `gpu manufacturer code min length is ${SMALL_FIELD_MIN_LENGTH}`,
    })
    .refine((field) => field.trim().length <= SMALL_FIELD_MAX_LENGTH, {
      message: `gpu manufacturer code max length is ${SMALL_FIELD_MAX_LENGTH}`,
    })
    .optional(),

  brandId: z
    .string()
    .refine((field) => field.trim().length > 0, {
      message: "gpu brand is required",
    })
    .optional(),
});