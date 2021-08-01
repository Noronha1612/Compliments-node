import { createConnection } from 'typeorm';

export const startDBConnection = async () => {
  try {
    await createConnection();
  } catch (err) {
    process.exit(1);
  }
};
