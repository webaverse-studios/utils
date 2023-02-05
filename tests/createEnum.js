import o from 'ospec'
import { createEnum } from '../index.js'

o.spec( 'createEnum', async () => {
  o( 'returns the appropriate properties', () => {
    const enum1 = createEnum( 'foo', 'bar', 'baz' )

    o( enum1.foo.toString()).equals( 'Symbol(foo)' )
    o( enum1.bar.toString()).equals( 'Symbol(bar)' )
    o( enum1.baz.toString()).equals( 'Symbol(baz)' )
  })

  o( 'properties are enumerable', () => {
    const enum1 = createEnum( 'foo', 'bar', 'baz' )

    o( Object.keys( enum1 )).deepEquals([ 'foo', 'bar', 'baz' ])
  })

  o( 'properties are frozen', () => {
    const enum1 = createEnum( 'foo', 'bar', 'baz' )

    o( Object.isFrozen( enum1.foo )).equals( true )
    o( Object.isFrozen( enum1.bar )).equals( true )
    o( Object.isFrozen( enum1.baz )).equals( true )
  })

  o( 'properties are immutable', () => {
    const enum1 = createEnum( 'foo', 'bar', 'baz' )

    o(() => enum1.foo = 'bar' ).throws(
      `Cannot assign to read only property 'foo' of object '#<Object>'`
    )
    o( enum1.foo.toString()).equals( 'Symbol(foo)' )
  })

  o( 'properties are internally unique', () => {
    const enum1 = createEnum( 'foo', 'bar', 'baz' )

    o( enum1.foo ).notEquals( enum1.bar )
    o( enum1.foo ).notEquals( enum1.baz )
    o( enum1.bar ).notEquals( enum1.baz )
  })

  o( 'properties are unique across multiple enums', () => {
    const
      enum1 = createEnum( 'foo', 'bar', 'baz' ),
      enum2 = createEnum( 'foo', 'bar', 'baz' )

    o( enum1.foo ).notEquals( enum2.foo )
    o( enum1.bar ).notEquals( enum2.bar )
    o( enum1.baz ).notEquals( enum2.baz )
  })
})
