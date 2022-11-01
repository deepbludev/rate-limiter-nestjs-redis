export const privateRoutes = Object.freeze({
  a: {
    path: '/a',
    rateLimit: {
      weight: 2,
    },
  },
  b: {
    path: '/b',
    rateLimit: {
      weight: 4,
    },
  },
  c: {
    path: '/c',
    rateLimit: {
      weight: 6,
    },
  },
})
