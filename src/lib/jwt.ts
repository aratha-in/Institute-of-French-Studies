import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "SuperSecretSecurityKeyThatNeedsToBeLongEnough12345!";

function base64url(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf;
  return b.toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

export function signJwt(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" };
  const headerStr = base64url(JSON.stringify(header));
  const payloadStr = base64url(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiration
  }));

  const signature = crypto.createHmac("sha256", JWT_SECRET)
    .update(`${headerStr}.${payloadStr}`)
    .digest();
  const signatureStr = base64url(signature);

  return `${headerStr}.${payloadStr}.${signatureStr}`;
}

export function verifyJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerStr, payloadStr, signatureStr] = parts;
    
    // Verify signature
    const expectedSignature = crypto.createHmac("sha256", JWT_SECRET)
      .update(`${headerStr}.${payloadStr}`)
      .digest();
    const expectedSignatureStr = base64url(expectedSignature);

    if (signatureStr !== expectedSignatureStr) {
      return null;
    }

    const payload = JSON.parse(base64urlDecode(payloadStr));
    
    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
