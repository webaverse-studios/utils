
/**
 * Create a frozen object with a set of unique keyed symbols.
 *
 * @param {string} keys List of enum keys.
 * @returns {object} Frozen object with unique keyed symbols.
 */
export function createEnum( ...keys ) {
  const obj = {}

  for ( let index = 0; index < keys.length; index++ ) {
    const key = keys[ index ]

    obj[ key ] = Symbol( key )
  }

  return Object.freeze( obj )
}
