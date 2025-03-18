import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// Mock classes for dependencies
class MockAuthService {
  isLoggedIn() {
    return true; // default to logged-in state for testing
  }
}

class MockRouter {
  navigate = jest.fn(); // mock navigate method
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = new MockAuthService() as any;
    router = new MockRouter() as any;
    authGuard = new AuthGuard(authService, router);
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authGuard).toBeTruthy();
    });

    it('should allow access if the user is logged in', () => {
      // Mocking the AuthService to return true for isLoggedIn
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);

      // Mock ActivatedRouteSnapshot to avoid the TypeScript error
      const mockRouteSnapshot = {} as any;  // Can be an empty object, since we don’t need its details here.
      const mockState = {} as any;

      const canActivate = authGuard.canActivate(mockRouteSnapshot, mockState);

      expect(canActivate).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled(); // router should not navigate anywhere
    });

    it('should deny access if the user is not logged in and redirect to login', () => {
      // Mocking the AuthService to return false for isLoggedIn
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);

      const mockRouteSnapshot = {} as any;  // Can be an empty object, since we don’t need its details here.
      const mockState = {} as any;

      const canActivate = authGuard.canActivate(mockRouteSnapshot, mockState);

      expect(canActivate).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // should navigate to login
    });

    it('should redirect to login page when navigating to protected route without login', () => {
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);

      const mockRouteSnapshot = {} as any;  // Can be an empty object, since we don’t need its details here.
      const mockState = {} as any;

      authGuard.canActivate(mockRouteSnapshot, mockState);

      // Verify that router.navigate was called with '/login'
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not redirect to login when user is logged in', () => {
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);

      const mockRouteSnapshot = {} as any;  // Can be an empty object, since we don’t need its details here.
      const mockState = {} as any;

      authGuard.canActivate(mockRouteSnapshot, mockState);

      // Ensure that the navigation method was not called
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
