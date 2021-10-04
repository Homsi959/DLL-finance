const fixProto = (target: Error, prototype: {}) => {
  const setPrototypeOf: Function = (Object as any).setPrototypeOf;
  setPrototypeOf ? setPrototypeOf(target, prototype) : ((target as any).__proto__ = prototype);
};

const fixStack = (target: Error, fn: Function = target.constructor) => {
  const captureStackTrace: Function = (Error as any).captureStackTrace;
  captureStackTrace && captureStackTrace(target, fn);
};

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
      configurable: true,
    });
    fixProto(this, new.target.prototype);
    fixStack(this);
  }
}
