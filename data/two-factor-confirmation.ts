import { db } from '@/lib/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorComfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorComfirmation;
  } catch (error) {
    return null;
  }
};
