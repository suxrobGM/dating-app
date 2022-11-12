import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {map, Observable} from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private oidcService: OidcSecurityService,
    private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReturnType {
    return this.oidcService.isAuthenticated$.pipe(
        map(({isAuthenticated}) => {
          if (isAuthenticated) {
            return true;
          }

          return this.router.parseUrl('/unauthorized');
        }),
    );
  }
}

type ReturnType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
