// import { Injectable } from '@angular/core';
// import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { RootService } from './root.service'

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardsGuard implements CanActivate {

//   constructor(
//     private router: Router,
//     private root: RootService
// ) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//       // const currentUser = this.root.currentUserValue;
//       if (currentUser) {
//           // logged in so return true
//           return true;
//       }

//       // not logged in so redirect to login page with the return url
//       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//       return false;
//   }

// }
