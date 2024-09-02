'use server'

import * as z from 'zod'

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  // TODO: Send password reset email

  return { success: 'Password reset email sent!' }
}