import { AppComponent } from '../../app.component';
import { ApiService } from '../service/api.service';
import { catchError, throwError } from 'rxjs';

/**
 * Egy dekorátor, amely korlátozza a metódus hozzáférését az alapján, hogy a felhasználónak van-e megfelelő szerepköre.
 *
 * Ez a dekorátor aszinkron módon ellenőrzi a felhasználó szerepkörét a megadott szükséges szerepkörrel szemben
 * a metódus végrehajtása előtt. Ha a felhasználónak megvan a szükséges szerepköre, akkor a metódus végrehajtásra kerül.
 * Ellenkező esetben hiba dobódik, és figyelmezteti a felhasználót a jogosulatlan hozzáférési kísérletről.
 *
 * @param requiredRole A metódushoz szükséges szerepkör.
 * @returns Egy dekorátor függvény, amely becsomagolja az eredeti metódust.
 *
 *
 * Megjegyzés: Ez a dekorátor az `ApiService`-re támaszkodik a jelenlegi felhasználó szerepkörének lekéréséhez.
 */

export function AuthorizationDecorator(requiredRole: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    const apiService = AppComponent.INJECTOR.get(ApiService);
    descriptor.value = async function (...args: any[]) {
      apiService
        .loadRole()
        .pipe(catchError(err => throwError(() => err)))
        .subscribe(data => {
          const userRole = apiService.getCurrentUserRole();
          if (userRole === requiredRole) {
            alert('Van jogod hozzá am');
            return method.apply(this, args);
          } else {
            alert(
              `Unauthorized access to ${propertyName}. Required role: ${requiredRole}, but current role is: ${userRole}.`
            );
            throw new Error(
              `Unauthorized access to ${propertyName}. Required role: ${requiredRole}, but current role is: ${userRole}.`
            );
          }
        });

      return descriptor;
    };
  };
}
