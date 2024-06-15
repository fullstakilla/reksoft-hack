declare const _brand: unique symbol

declare global {
  /**
   * Custom utility types
   */
  export type Brand<K, T> = K & { [_brand]: T }

   /**
   * Type aliases
   */
   export type Id = number
   export type roleIdType = 1 | 2;

  // redux hack
  declare type RootState = import('@/app/providers/store').RootState
  declare type AppDispatch = import('@/app/providers/store').AppDispatch
}

export {}