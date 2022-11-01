export const publicRoutes = Object.freeze({
  a: {
    path: '/a',
    rateLimit: {
      weight: 1,
    },
  },
  b: {
    path: '/b',
    rateLimit: {
      weight: 2,
    },
  },
  c: {
    path: '/c',
    rateLimit: {
      weight: 3,
    },
  },
})
