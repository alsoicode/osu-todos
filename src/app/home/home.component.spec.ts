import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../auth/auth.service';
import { LoginButtonComponent } from '../auth/login-button.component';
import { HomeComponent } from './home.component';

export class MockAuthService {
  loggedIn = false;
  username = null;

  login(): void {}
  logout(): void {}
}


describe('HomeComponent Tests', () => {

  let component: HomeComponent;
  let fixture: any;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoginButtonComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: Title,
          useClass: Title
        }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the home component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Welcome to Things to Do'`, async(() => {
    fixture.detectChanges();

    titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('Welcome to Things to Do');
  }));

  it('should render an a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hi');
  }));
});
