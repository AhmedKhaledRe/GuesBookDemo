import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {
  tokenKey = "GuestUser";

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  invalidateUser() {
    localStorage.removeItem(this.tokenKey);
  }

  getExpiration(token) {
    const exp = this.decode(token)?.exp || null;

    return moment.unix(exp);
  }

  getUsername() {
    return this.decode(this.getToken()).username;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();

    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
