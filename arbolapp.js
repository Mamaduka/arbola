(function () {
	const HEIGHT = 192;
	const ZERO = 0;
	const SIDES = [ 'top', 'right', 'bottom', 'left' ];
	let currentSide = SIDES[ Math.floor( Math.random() * SIDES.length ) ];
	let isAroblaMoving = true;

	const container = document.querySelector('.container');
	const arbola = jQuery('.arbola');
	const arbolaImg = arbola.find('img');

	arbola.addClass(currentSide);

	arbola.animate( { bottom: 0 }, 800, function() {
		jQuery('.container').on('touchstart mousemove', function() {
			moveArbola();
		});
	});

	function moveArbola() {
		if ( ! isAroblaMoving ) {
			return;
		}

		// Stop for now.
		isAroblaMoving = false;

		// Set new side.
		const newSide = SIDES[ Math.floor( Math.random() * SIDES.length ) ];

		const moveOut = {
			[ currentSide ]: ZERO - HEIGHT,
		};

		const moveIn = {
			[ newSide ]: ZERO,
		};

		arbola.animate( moveOut, 800, function() {
			arbola.removeAttr( 'style' );
			arbolaImg.removeAttr( 'style' );
			arbola.removeClass( currentSide );
			arbola.addClass( newSide );

			const newPosition = Math.floor( Math.random() * ( ( 90 - 10 ) + 1 ) + 10 );

			switch ( newSide ) {
				case 'left':
				case 'right':
					arbolaImg.css({ 'top': newPosition + '%' });
					break;
				case 'top':
				case 'bottom':
					arbolaImg.css({ 'left': newPosition + '%' });
					break;
			}
		} );

		arbola.animate( moveIn, 800, function() {
			// Get that girl moving.
			isAroblaMoving = true;

			// Switch sides, sorry.
			currentSide = newSide;
		} );
	}
})();
