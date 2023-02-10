import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

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

  decryptObject(ob: Object): Object {
    let enOb = {};
    for (const x in ob) {
      if (x !== "id" && x !== "password" && x !== "username") {
        enOb = {
          ...enOb,
          [x]: this.decrypt(ob[x as keyof typeof ob] as unknown as string),
        };
      } else {
        enOb = {
          ...enOb,
          [x]: ob[x as keyof typeof ob],
        };
      }
    }
    return enOb;
  }
}

export default new Encryption();
