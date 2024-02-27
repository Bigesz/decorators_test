import { TranslateService } from '@ngx-translate/core';
import {AppComponent} from "../../app.component";
import {DialogService} from "../dialog/dialog.service";

/**
 * Megerősítő párbeszédablakot jelenít meg a dekorált metódus meghívása előtt.
 * Ha a felhasználó megerősíti a műveletet, a metódus végrehajtódik.
 * A megerősítő ablak címét és szövegét lefordítja a megadott kulcsok alapján.
 *
 * @param {string} titleTranslateKey - A párbeszédablak címének fordítási kulcsa.
 * @param {string} textTranslateKey - A párbeszédablak szövegének fordítási kulcsa.
 * @param {string} [textTranslateParamKey] - Opcionális. A szövegben használt dinamikus paraméter kulcsa,
 *                                           amely az első argumentum egy tulajdonságát helyettesíti be.
 * @returns A dekorátor függvény, amely módosítja a dekorált metódus viselkedését.
 */
export function Confirmable(titleTranslateKey: string, textTranslateKey: string, textTranslateParamKey?: string) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // Az AppComponent statikus INJECTOR-án keresztül szerezze be a szükséges szolgáltatásokat
    const dialogService = AppComponent.INJECTOR.get(DialogService);
    const translateService = AppComponent.INJECTOR.get(TranslateService);

    descriptor.value = async function (...args: any[]) {
      // A megerősítő párbeszédablak megjelenítése a fordított címmel és szöveggel
      dialogService.confirm(
        translateService.instant(titleTranslateKey),
        translateService.instant(textTranslateKey, {
          // Dinamikus paraméter behelyettesítése, ha van
          ...(textTranslateParamKey && { name: args[0][textTranslateParamKey] })
        }),
        // A megerősítés esetén az eredeti metódus meghívása az aktuális argumentumokkal
        () => originalMethod.apply(this, args)
      );
    };

    return descriptor;
  };
}
