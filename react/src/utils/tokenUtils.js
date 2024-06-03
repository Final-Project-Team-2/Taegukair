import { jwtDecode } from 'jwt-decode'; // 중괄호를 사용하여 named import

export function decodeJwt(token) {
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
