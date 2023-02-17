/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites () {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.0.194:4000/api/:path*",
      }
    ];
  },
};

