import fp from "fastify-plugin";
import compress, { type FastifyCompressOptions } from "@fastify/compress";

/**
 * CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCompressOptions>(async (fastify) => {
  fastify.register(compress);
});
