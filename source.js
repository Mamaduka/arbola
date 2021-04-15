(function( $ ) {
	'use strict';

	// Will hold elements
	var $hi_roy_welcome = false;
	var $hi_roy_social_grid = false;

	// Set our sides
	var $sides = [ 'top', 'right', 'bottom', 'left' ];

	// Handle the Roy cutout
	var $roy_cutout_enabled = true;
	var $roy_cutout = false;
	var $roy_cutout_img = false;
	var $roy_cutout_height = false;
	var $roy_cutout_space = 87; // Space sticking out from the side
	var $current_roy_side = $sides[ Math.floor( Math.random() * $sides.length ) ];

	// When the document is ready...
	$(document).ready(function() {

		// Store elements
		$hi_roy_welcome = $( '#hi-roy-welcome' );
		$hi_roy_social_grid = $( '#hi-roy-social-grid' );

		// Handle the Roy cutout
		$roy_cutout = $( '#roy-cutout' ).addClass( $current_roy_side );
		$roy_cutout_img = $roy_cutout.find( 'img' );
		$roy_cutout_height = $.inArray( $current_roy_side, [ 'left', 'right' ] ) >= 0 ? $roy_cutout.width() : $roy_cutout.height();

		// Move Roy in
		var $move_roy_animate = {};
		$move_roy_animate[ $current_roy_side ] = ( 0 - $roy_cutout_height ) + $roy_cutout_space;

		// Move Roy
		$roy_cutout.animate( $move_roy_animate, 800, function() {

			// Move Roy cutout when the screen is touched or when the mouse moves
			$( '#hi-roy-welcome' ).on( 'touchstart mousemove', function( $event ) {
				move_roy_cutout();
			});

		});



	});

	///// FUNCTIONS /////

	// Will animate the Roy cutout off screen and then back on screen in a new position
	function move_roy_cutout() {

		// Don't move if disabled
		if ( ! $roy_cutout_enabled ) {
			return false;
		}

		// Disable while we work
		$roy_cutout_enabled = false;

		// Get new side
		var $new_roy_side = $sides[ Math.floor( Math.random() * $sides.length ) ];

		// Set animate properties for moving out
		var $animate1 = {};
		$animate1[ $current_roy_side ] = 0 - $roy_cutout_height;

		// Set animate properties for moving back in
		var $animate2 = {};
		$animate2[ $new_roy_side ] = 0 - ( $roy_cutout_height - $roy_cutout_space );

		// Move Roy
		$roy_cutout.animate( $animate1, 800, function() {

			// Switch out classes
			$roy_cutout.removeAttr( 'style' );
			$roy_cutout_img.removeAttr( 'style' );
			$roy_cutout.removeClass( $current_roy_side );
			$roy_cutout.addClass( $new_roy_side );

			// Remove if Roy is no longer on bottom
			if ( 'bottom' != $new_roy_side ) {
				$hi_roy_welcome.removeClass( 'has-bottom-roy' );
			}

			// Set new background position
			// A whole number between 10 and 90
			var $new_cutout_pos = Math.floor( Math.random() * ( ( 90 - 10 ) + 1 ) + 10 );
			switch( $new_roy_side ) {
				case 'left':
				case 'right':
					$roy_cutout_img.css({ 'top': $new_cutout_pos + '%' });
					break;
				case 'top':
				case 'bottom':
					$roy_cutout_img.css({ 'left': $new_cutout_pos + '%' });
					break;
			}

			// Move Roy back in
			$roy_cutout.animate( $animate2, 800, function() {

				// Enable cutout
				$roy_cutout_enabled = true;

				// Change current side
				$current_roy_side = $new_roy_side;

			} );

		});

	}

})( jQuery );
