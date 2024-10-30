import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthData } from '../../features/auth/models';
import { User } from '../../features/dashboard/users/models';
import { MockProvider } from 'ng-mocks';
import { NavigationExtras, Router } from '@angular/router';

const mockUser: User = {
  id: 'dsds',
  firstName: 'Mock',
  lastName: 'Mock',
  email: 'mockuser@mail.com',
  password: '123456',
  createdAt: new Date(),
  token: 'FJDSFNSDvmfSKDdmsddaamds',
};
const mockAuthData: AuthData = {
  email: 'mockuser@mail.com',
  password: '123456',
};

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router, {
          navigate: (commands: any[], extras?: NavigationExtras) => {
            return new Promise((res) => res(true));
          },
        }),
      ],
    });

    httpContoller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizarse el login debe establecer el token en localStorage', (done) => {
    service.login(mockAuthData).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        expect(localStorage.getItem('token')).toEqual(mockUser.token);
        done();
      },
    });
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);
  });

  it('Debe retornar un error al realizar un login invalido', (done) => {
    service.login(mockAuthData).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err['message']).toBe('Los datos son invalidos');
        done();
      },
    });

    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    // mockReq.flush([], { status: 401, statusText: 'Unauthorized' });
    mockReq.flush([]);
  });

  it('Logout debe remover el token de localstorage, debe desestablecer el usuario autenticado y debe redirigir a /auth/login', (done) => {
    const spyOnNavigate = spyOn(router, 'navigate');

    service.login(mockAuthData).subscribe();
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);

    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    service.authUser$.subscribe({
      next: (user) => {
        expect(user).toBeNull();
        done();
      },
    });

    expect(spyOnNavigate).toHaveBeenCalledOnceWith(['auth', 'login']);
  });
});
