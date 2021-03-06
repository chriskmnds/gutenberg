/**
 * Internal dependencies
 */
import warning from '..';

const initialNodeEnv = process.env.NODE_ENV;

describe( 'warning', () => {
	afterEach( () => {
		process.env.NODE_ENV = initialNodeEnv;
	} );

	it( 'logs to console.warn when NODE_ENV is not "production"', () => {
		process.env.NODE_ENV = 'development';
		warning( true, 'warning' );
		expect( console ).toHaveWarnedWith( 'warning' );
	} );

	it( 'does not log to console.warn if NODE_ENV is "production"', () => {
		process.env.NODE_ENV = 'production';
		warning( true, 'warning' );
		expect( console ).not.toHaveWarned();
	} );

	it( 'does not log to console.warn if condition is falsy', () => {
		process.env.NODE_ENV = 'development';
		warning( false, 'warning' );
		expect( console ).not.toHaveWarned();
	} );
} );
