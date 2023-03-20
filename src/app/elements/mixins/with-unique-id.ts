export function withUniqueId(prefix: string) {
  return class WithUniqueId {
    private static __nextUniqueId = 0;

    private __uniqueId = `${prefix}-${WithUniqueId.__nextUniqueId++}`;

    public useId(name?: string) {
      if (name) {
        return `${this.__uniqueId}-${name}`;
      } else {
        return this.__uniqueId;
      }
    }
  };
}
