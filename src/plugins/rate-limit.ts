import fp from "fastify-plugin";
import rateLimit, { type FastifyRateLimitOptions } from "@fastify/rate-limit";

/**
 * A low overhead rate limiter for your routes
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<FastifyRateLimitOptions>(async (fastify) => {
  fastify.register(rateLimit, {
    max: 100,
  });
});
