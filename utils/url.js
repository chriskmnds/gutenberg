/**
 * External dependencies
 */
import { compact, isArray, isEqual, isString, map, size } from 'lodash';

/**
 * Given a javascript object serializes for use in the url of http requests.
 *
 * @param  {Object} value object to serialize
 * @param  {String} key   key of the object
 * @return {String}       String with the serialization result.
 */
export function urlSerialize( value, key = '' ) {
	if ( isString( value ) || ! size( value ) ) {
		if ( value === undefined || value === null || isEqual( value, {} ) || isEqual( value, [] ) ) {
			return '';
		}
		const valueEncoded = encodeURIComponent( value );
		return key ? `${ key }=${ valueEncoded }` : valueEncoded;
	}
	return compact( map( value, ( objValue, objKey ) => {
		let newKey;
		if ( isArray( value ) ) {
			newKey = `${ key }[]`;
		} else if ( key ) {
			newKey = `${ key }[${ objKey }]`;
		} else {
			newKey = objKey;
		}
		return urlSerialize( objValue, newKey );
	} ) ).join( '&' );
}
