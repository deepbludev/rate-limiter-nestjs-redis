export const configuration = () => ({
  rateLimit: {
    apiKey: parseInt(process.env.RATE_LIMIT_API_KEY, 10) || 200,
    ip: parseInt(process.env.RATE_LIMIT_IP, 10) || 100,
  },
})
