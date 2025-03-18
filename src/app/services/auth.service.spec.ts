import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  // Create a fresh instance of AuthService before each test
  beforeEach(() => {
    authService = new AuthService();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authService).toBeTruthy();
    });

    it('should return false when not logged in', () => {
      // Initially the user is not logged in
      expect(authService.isLoggedIn()).toBe(false);
    });

    it('should set loggedIn to true after login()', () => {
      // Call login method
      authService.login();

      // After login, the user should be logged in
      expect(authService.isLoggedIn()).toBe(true);
    });

    it('should set loggedIn to false after logout()', () => {
      // First, login the user
      authService.login();

      // Call logout method
      authService.logout();

      // After logout, the user should be logged out
      expect(authService.isLoggedIn()).toBe(false);
    });

    it('should not change loggedIn status if login is called multiple times', () => {
      // Call login multiple times
      authService.login();
      authService.login();

      // After multiple logins, the status should still be true
      expect(authService.isLoggedIn()).toBe(true);
    });

    it('should not change loggedIn status if logout is called multiple times', () => {
      // Call logout multiple times
      authService.logout();
      authService.logout();

      // After multiple logouts, the status should still be false
      expect(authService.isLoggedIn()).toBe(false);
    });
  });
});
