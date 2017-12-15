/**
 * Internal dependencies
 */
import { urlSerialize } from '../url';

describe( 'urlSerialize()', () => {
	it( 'should handle strings and number', () => {
		expect( urlSerialize( '' ) ).toEqual( '' );
		expect( urlSerialize( undefined ) ).toEqual( '' );
		expect( urlSerialize( null ) ).toEqual( '' );
		expect( urlSerialize( false ) ).toEqual( 'false' );
		expect( urlSerialize( 'chicken' ) ).toEqual( 'chicken' );
		expect( urlSerialize( new String( 'chicken' ) ) ).toEqual( 'chicken' );
		expect( urlSerialize( 2 ) ).toEqual( '2' );
		expect( urlSerialize( new Number( 2 ) ) ).toEqual( '2' );
	} );

	it( 'should handle objects', () => {
		expect( urlSerialize( {} ) ).toEqual( '' );
		expect( urlSerialize( { chicken: 'ribs' } ) ).toEqual( 'chicken=ribs' );
		expect( urlSerialize( { chicken: 'ribs', ribs: 'chicken', ok: false } ) ).toEqual( 'chicken=ribs&ribs=chicken&ok=false' );
		expect( urlSerialize( { chicken: { ribs: 1 }, ribs: 'chicken', chickenRibs: { ribs: 'yes' } } ) )
			.toEqual( 'chicken[ribs]=1&ribs=chicken&chickenRibs[ribs]=yes' );
	} );

	it( 'should handle arrays', () => {
		expect( urlSerialize( [] ) ).toEqual( '' );
		expect( urlSerialize( [ 1 ] ) ).toEqual( '[]=1' );
		expect( urlSerialize( [ 1, 2 ] ) ).toEqual( '[]=1&[]=2' );
		expect( urlSerialize( [ 1, 'chicken', [], 'ribs', 2 ] ) ).toEqual( '[]=1&[]=chicken&[]=ribs&[]=2' );
	} );

	it( 'should handle complex mixes', () => {
		expect( urlSerialize( { a: {}, b: [] } ) ).toEqual( '' );
		expect( urlSerialize( { a: {}, b: [ { c: [] } ] } ) ).toEqual( '' );
		expect( urlSerialize( { a: { b: [ 'chicken', 'ribs' ] } } ) ).toEqual( 'a[b][]=chicken&a[b][]=ribs' );
		expect( urlSerialize( [ { a: [ 'chicken' ] }, {}, { c: [ { ribs: 'chicken' } ] } ] ) ).toEqual( '[][a][]=chicken&[][c][][ribs]=chicken' );
	} );
} );
