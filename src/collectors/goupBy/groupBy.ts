import {CollectorFunction} from '../../types';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupBy<T, TKey>(
  keySelector: (entry: T) => TKey
): CollectorFunction<T, Map<TKey, T[]>> {
  return stream => {
    const result: Map<TKey, T[]> = new Map<TKey, T[]>();
    for (const entry of stream) {
      const key = keySelector(entry);
      result.set(key, [...(result.get(key) || []), entry]);
    }
    return result;
  };
}
