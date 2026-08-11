export interface Bindings {
  ping(): Promise<string>;
}

declare global {
  const bindings: Bindings;
}