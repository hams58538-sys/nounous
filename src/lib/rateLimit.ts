import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Falls back to allowing requests if Redis env vars aren't set (local dev),
// but logs a warning — production MUST have Upstash configured.
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  // 5 submissions per 10 minutes per IP, across lead/candidate forms
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
  });
} else if (process.env.NODE_ENV === "production") {
  console.warn(
    "UPSTASH_REDIS_* env vars missing in production — public forms are NOT rate-limited."
  );
}

export async function checkRateLimit(identifier: string) {
  if (!ratelimit) return { success: true };
  return ratelimit.limit(identifier);
}
