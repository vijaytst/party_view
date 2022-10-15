module.exports = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
  images: {
    domains: ['image.tmdb.org']
  }
}
