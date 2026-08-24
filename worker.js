export default {
  async fetch(request, env) {
    // Serve static assets from the Next.js export
    return env.ASSETS.fetch(request);
  },
};
