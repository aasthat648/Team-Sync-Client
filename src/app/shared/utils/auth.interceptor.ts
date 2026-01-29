import { User } from '@/types/auth';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Auth interceptor');
  const raw = localStorage.getItem('auth_user');
  if (!raw) {
    console.log('Not able to fetch local storage : Auth Interceptor:', raw);
    return next(req);
  }
  const user: User = JSON.parse(raw);

  // skip public endpoints
  if (!user.token || req.url.includes('/auth/login')) {
    console.log('User', user);

    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return next(authReq);
};
