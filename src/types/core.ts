export type OpaqueString<Key extends string> = string & { __opaque: Key };
export type DateString = OpaqueString<'DateString'>;
