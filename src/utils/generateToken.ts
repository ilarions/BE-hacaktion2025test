import jwt from 'jsonwebtoken';

export interface IGenerateToken {
  id: string;
  secret: string;
  time: string;
}

export const generateToken = (
  id: string,
  secret: string,
  time: string,
): string => {
  const token = jwt.sign({ id: id }, secret, { expiresIn: time });
  return token;
};
