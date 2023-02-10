import crypto from "crypto";

class Encryption {
  private static algorithm = process.env.CRYPTO_ALGORITHM as unknown as string;
  private static key = Buffer.from(
    process.env.CRYPTO_KEY as unknown as string,
    "hex"
  );
  private static iv = Buffer.from(
    process.env.CRYPTO_IV as unknown as string,
    "hex"
  );

  encrypt(text: string): string {
    try {
      const cipher = crypto.createCipheriv(
        Encryption.algorithm,
        Encryption.key,
        Encryption.iv
      );
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      return encrypted.toString("hex");
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  decrypt(encreptedText: string): string {
    try {
      const encryptedText = Buffer.from(encreptedText, "hex");

      const decipher = crypto.createDecipheriv(
        Encryption.algorithm,
        Encryption.key,
        Encryption.iv
      );

      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new Encryption();
