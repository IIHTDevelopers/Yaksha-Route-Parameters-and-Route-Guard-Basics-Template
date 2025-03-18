import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'; // for routing in tests

// Mock classes for dependencies
class MockAuthService {
  login = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],  // Importing RouterTestingModule for navigation handling in tests
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should call authService.login() when login() is called', () => {
      // Trigger login method
      component.login();

      // Verify that authService.login() has been called
      expect(mockAuthService.login).toHaveBeenCalled();
    });

    it('should navigate to /profile/1 after login', () => {
      // Trigger login method
      component.login();

      // Verify that the router.navigate was called with the correct URL
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile/1']);
    });
  });
});
