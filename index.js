"use strict";

/*
 * Challenge:
 * You are given a function 'secret()' that accepts a single integer parameter
 * and returns an integer. In your favorite programming language, write a
 * command-line program that takes one command-line argument (a number) and
 * determines if the secret() function is additive
 * [secret(x+y) = secret(x) + secret(y)], for all combinations x and y, where x
 * and y are all prime numbers less than the number passed via the command-line
 * argument.  Describe how to run your examples. Please generate the list of
 * primes without using built-in functionality.
 *
 * To run examples, run script with node and enter any positive integer as the
 * third argument (e.g. `node index.js 89`).
 */

const INVALID_INT  = 2;
const INVALID_FUNC = 3;
const INVALID_ARR_OF_INTS = 4;

// set up listener for "exit" events to provide helpful error messages
process.on( "exit", code => {
	switch ( code ) {
		case INVALID_INT:
			console.log( "Please provide valid positive integer greater than 1." );
			break;
		case INVALID_FUNC:
			console.log( "Please provide valid function." );
			break;
		case INVALID_ARR_OF_INTS:
			console.log( "Please provide valid array of integers" );
			break;
	}
});

// assign third cli argument to scoped variable and convert to number
const numInput = +process.argv[2];

// validate that numInput is a positive integer
if ( !Number.isInteger( numInput ) || numInput <= 1 ) process.exit( INVALID_INT );

/*
 * DEFINE FUNCTIONS
 */
function findPrimeInts ( input ) {

	// use the sieve of Eratosthenes to find all prime numbers equal to or less than input.
	let potentialPrimeInts = [];
	for ( let i = 2; i <= input; i++ ) {
		potentialPrimeInts.push( { value: i, isPrime: true } );
	}

	let primeInts = [];
	for ( let i = 0; i < potentialPrimeInts.length; i++ ) {
		if ( potentialPrimeInts[i].isPrime ) {
			let primeValue = potentialPrimeInts[i].value;
			primeInts.push( primeValue );
			for ( let j = ( primeValue + i ); j < potentialPrimeInts.length; j += primeValue ) {
				potentialPrimeInts[j].isPrime = false;
			}
		}
	}

	return primeInts;
}

function isFuncAdditive ( func, ints ) {

	// basic (even simplistic - would ideally use lodash or underscore methods) validation for function and integers
	if ( typeof func !== "function" ) process.exit( INVALID_FUNC );
	if ( typeof ints[0] !== "number" ) process.exit( INVALID_ARR_OF_INTS );

	// nested loop to test secret function against every combination of two items in `ints`
	for ( let i = 0; i < ints.length-1; i++ ) {
		for ( let j = i+1; j < ints.length; j++ ) {
			let result1 = func( ints[i] );
			let result2 = func( ints[j] );
			let result3 = func( ints[i] + ints[j] );
			if ( ( result1 + result2 ) !== result3 ) {
				return false;
			}
		}
	}

	return true;
}

/*
 * Secret Function - Replace with any function named "secret" which takes a number as the input and returns a number.
 */
function secret ( x ) {
	return x * 2;
}

/*
 * RUN FUNCTIONS
 */
let primeIntegers = findPrimeInts( numInput );
let funcIsAdditive = isFuncAdditive( secret, primeIntegers );

console.log( `The secret function is ${funcIsAdditive ? "indeed" : " not "} additive.` );
