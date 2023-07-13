import fp from "fastify-plugin";
import compress, { type FastifyCompressOptions } from "@fastify/compress";

/**
 * Fastify compression utils
 *
 * @see https://github.com/fastify/fastify-compress
 */
export default fp<FastifyCompressOptions>(async (fastify) => {
  fastify.register(compress);
});
