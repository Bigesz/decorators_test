export function AuthorizationDecorator(requiredRole: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    descriptor.value = function (...args: any[]) {

      const userRole = 'admin'; // Szimulált felhasználói szerepkör
      if (userRole !== requiredRole) {
        alert(`Unauthorized access to ${propertyName}. Required role: ${requiredRole}, but current role is: ${userRole}.`);
        throw new Error(`Unauthorized access to ${propertyName}. Required role: ${requiredRole}, but current role is: ${userRole}.`);
      }
      return method.apply(this, args);
    };
  };
}
