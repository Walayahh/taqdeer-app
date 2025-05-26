// next.config.js
module.exports = {
  async rewrites() {
    return [
      // forward /tip/:id to your dynamic page
      {
        source: '/tip/:id',
        destination: '/tip/[id]'
      },
      // admin is already /admin.js so no rewrite needed
    ]
  }
}
