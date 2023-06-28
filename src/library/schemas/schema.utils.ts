import { z } from "zod";

/**a utility to allow us to have ranges in our schemas */
export const numberRange = (min: number, max: number) => {
    return z.number().refine(
      (value) => value >= min && value <= max,
      {
        message: `The value should be between ${min} and ${max}`,
      }
    );
  };