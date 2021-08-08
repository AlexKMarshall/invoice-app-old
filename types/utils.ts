export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type CompleteDeep<T> = T extends Primitive
  ? NonNullable<T>
  : T extends object
  ? CompleteObjectDeep<T>
  : unknown

// helper for CompleteDeep
type CompleteObjectDeep<ObjectType extends object> = {
  [KeyType in keyof ObjectType]-?: CompleteDeep<ObjectType[KeyType]>
}
