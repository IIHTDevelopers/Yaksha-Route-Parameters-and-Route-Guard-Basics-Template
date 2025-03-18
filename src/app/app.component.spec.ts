import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';  // For testing routes

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]  // Import RouterTestingModule for routing tests
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();  // Trigger initial data binding
    });

    describe('boundary', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should contain the login link with correct routerLink', () => {
            const compiled = fixture.nativeElement;
            const loginLink = compiled.querySelector('a[href="/login"]');
            expect(loginLink).toBeTruthy();  // Verify if the login link exists
            expect(loginLink.getAttribute('routerLink')).toBe('/login');  // Check if the routerLink is correct
        });

        it('should contain the profile link with correct routerLink', () => {
            const compiled = fixture.nativeElement;
            const profileLink = compiled.querySelector('a[href="/profile/1"]');
            expect(profileLink).toBeTruthy();  // Verify if the profile link exists
            expect(profileLink.getAttribute('routerLink')).toBe('/profile/1');  // Check if the routerLink is correct
        });

        it('should have router-outlet in the template', () => {
            const compiled = fixture.nativeElement;
            const routerOutlet = compiled.querySelector('router-outlet');
            expect(routerOutlet).toBeTruthy();  // Check if <router-outlet> exists in the template
        });
    });
});
