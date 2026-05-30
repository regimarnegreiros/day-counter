import {
  generateSecret,
  SignJWT,
  jwtVerify,
  type CryptoKey,
  type JWTPayload,
} from "jose";

export default class JWT {
  private static actual_secret: CryptoKey | Uint8Array<ArrayBufferLike>;
  private static old_secret: CryptoKey | Uint8Array<ArrayBufferLike>;
  private static instance: JWT;
  private static last_refresh: Date;

  private constructor(secret: CryptoKey | Uint8Array<ArrayBufferLike>) {
    if (!JWT.instance) {
      JWT.actual_secret = secret;
      JWT.last_refresh = new Date();
    }
  }
  static async initialize() {
    JWT.instance = new JWT(await generateSecret("HS256"));
  }
  static async sign(payload: JWTPayload) {
    await JWT.isActualSecretExpired();
    if (!process.env.JWT_EXPIRE_PERIOD)
      throw new Error("JWT expire period not found");
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("api.day-counter")
      .setAudience("app.day-counter")
      .setExpirationTime(process.env.JWT_EXPIRE_PERIOD)
      .sign(JWT.actual_secret);
  }

  static async verify(jwt: string): Promise<JWTPayload> {
    try {
      const result = await jwtVerify(jwt, JWT.actual_secret, {
        issuer: "api.day-counter",
        audience: "app.day-counter",
      });
      return result.payload;
    } catch (err:any) {
      if (!process.env.JWT_EXPIRE_PERIOD)
        throw new Error("JWT expire period not found");
      if (
        new Date().getTime() - JWT.last_refresh.getTime() / 86_400_000 > // 1000 * 24 * 60 * 60
        Number.parseInt(process.env.JWT_EXPIRE_PERIOD)
      ) {
        const result2 = await jwtVerify(jwt, JWT.old_secret, {
          issuer: "api.day-counter",
          audience: "app.day-counter",
        });
        return result2.payload;
      }
      throw new Error()
    }
  }

  private static async isActualSecretExpired() {
    if (!JWT.last_refresh) return;
    if (process.env.JWT_REFRESH_SECRET === undefined)
      throw new Error("JWT period refresh secret not found");
    if (
      new Date().getTime() - JWT.last_refresh.getTime() / 86400000 > // 1000 * 24 * 60 * 60
      Number.parseInt(process.env.JWT_REFRESH_SECRET)
    ) {
      JWT.old_secret = JWT.actual_secret;
      JWT.actual_secret = await generateSecret("HS256");
      JWT.last_refresh = new Date();
    }
  }
}