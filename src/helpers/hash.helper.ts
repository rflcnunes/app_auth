import { hash, compareSync } from 'bcryptjs';

const hashWithBcrypt = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const checkPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compareSync(password, hashedPassword);
};

export const HashHelper = {
  hashWithBcrypt,
  checkPassword,
};
