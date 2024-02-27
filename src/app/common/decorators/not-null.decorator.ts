/**
 * Ellenőrzi, hogy a dekorált metódus összes argumentuma, valamint az argumentumokban lévő objektumok tulajdonságai
 * nem `null` és nem `undefined` értékek-e. Ha talál ilyet, figyelmeztetést jelenít meg és kivételt dob.
 *
 * @param {Object} target - Az osztály prototípusa, amelyhez a metódus tartozik.
 * @param {string} propertyName - A dekorált metódus neve.
 * @param {PropertyDescriptor} descriptor - A metódus leírója, amely tartalmazza a metódus eredeti definícióját.
 */
export function NotNullDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const checkNotNull = (obj: any) => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value === null || value === undefined) {
          alert(`Invalid argument passed to ${propertyName}: ${key} is null or undefined`)
          throw new Error(`Invalid argument passed to ${propertyName}: ${key} is null or undefined`);
        }
      });
    };

    args.forEach(arg => {
      if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
        checkNotNull(arg);
      } else if (arg === null || arg === undefined) {
        throw new Error(`Invalid argument passed to ${propertyName}`);
      }
    });

    return originalMethod.apply(this, args);
  };
}
