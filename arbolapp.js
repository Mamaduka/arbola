(function () {
	const HEIGHT = 96;
	const ZERO = 0;
	const SIDES = [ 'top', 'right', 'bottom', 'left' ];
	let currentSide = SIDES[ Math.floor( Math.random() * SIDES.length ) ];
	let isAroblaMoving = true;

	const container = document.querySelector('.container');
	const arbola = document.querySelector('.arbola');
	const arbolaImg = arbola.querySelector('img');

	arbola.classList.add(currentSide);

	Velocity( arbola, { bottom: 0 }, 800, function() {
		container.addEventListener('mousemove', function() {
			moveArbola();
		} );
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

		Velocity( arbola, moveOut, 800, function() {
			arbola.setAttribute( 'style', '' );
			arbolaImg.setAttribute( 'style', '' );
			arbola.classList.remove( currentSide );
			arbola.classList.add( newSide );

			const newPosition = Math.floor( Math.random() * ( ( 90 - 10 ) + 1 ) + 10 );

			switch ( newSide ) {
				case 'left':
				case 'right':
					arbolaImg.style.top = newPosition + '%';
					break;
				case 'top':
				case 'bottom':
					arbolaImg.style.left = newPosition + '%';
					break;
			}
		} );

		Velocity( arbola, moveIn, 800, function() {
			// Get that girl moving.
			isAroblaMoving = true;

			// Switch sides, sorry.
			currentSide = newSide;
		} );
	}

	// Safari Hack.
	function appHeight() {
		const doc = document.documentElement
		doc.style.setProperty('--app-height', `${window.innerHeight}px`);
	}

	window.addEventListener('resize', appHeight)
	appHeight()
})();
