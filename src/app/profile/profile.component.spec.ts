import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock the ActivatedRoute to return a mock parameter
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jest.fn().mockReturnValue('123')  // Mock 'id' parameter to return '123'
    }
  };
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute();

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should extract the user ID from the route parameter', () => {
      // After component initialization (ngOnInit), the userId should be '123'
      expect(component.userId).toBe('123');
    });

    it('should display the correct user ID in the template', () => {
      // We can trigger the change detection cycle and check the rendered output
      fixture.detectChanges();

      // The profile component should display 'User ID: 123'
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('p').textContent).toContain('User ID: 123');
    });
  });
});
