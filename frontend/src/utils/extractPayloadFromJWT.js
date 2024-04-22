export default function extractPayloadFromJWT (jwt) {
  const parts = jwt.split('.')
  return JSON.parse(atob(parts[1]))
}
