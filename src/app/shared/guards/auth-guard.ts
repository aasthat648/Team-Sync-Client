import { UserStore } from '@/stores/user.store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userstore = inject(UserStore);
  const router = inject(Router);
  const user = userstore.user();

  if (!user.id) {
    router.navigate(['./login']);
    return false;
  }
  return true;
};
