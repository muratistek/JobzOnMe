export default function attachCookie({ res, token }) {
  // Setup auth cookie
  res.cookie('token', token, {
    // Ensures that ONLY a browser can access a cookie (very important)
    httpOnly: true,
    // Set expiration to one day
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
    // Only send the cookie if we are using the HTTPS protocol
    secure: process.env.NODE_ENV === 'production'
  })
}