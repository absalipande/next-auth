'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { SettingsSchema } from '@/schemas';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail, getUserById } from '@/data/user';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'User not found!' };
  }

  // the reason for this is we need to hash the new password again, but we can't do that with OAuth accounts
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent!' };
  }

  // for password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordsMatch) {
      return { error: 'Invalid password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings Updated!' };
};
