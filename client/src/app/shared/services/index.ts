export * from './main.service';
export * from './jwt.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
