/*
	Projection by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

	// Off-Canvas Navigation.

		// Navigation Panel.
			$(
				'<div id="navPanel">' +
					$('#nav').html() +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					
				});
				
				

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
				$('#navPanel')
					.css('transition', 'none');

	});

	

})(jQuery);




/* Effects Mouse */ 
$("a").on("mouseover", function() {
    $(this).css("color", "grey");
}).on("mouseout", function() {
      $(this).css("color", "#000");
});
/*
$("a>li").on("mouseover", function() {
    $(this).css("color", "grey");
}).on("mouseout", function() {
      $(this).css("color", "#000");
});


$("a>i").on("mouseover", function() {
    $(this).css("color", "grey");
}).on("mouseout", function() {
      $(this).css("color", "white");
});*/

$("a.uppercase.disabled").on("mouseover", function() {
	$(this).css("color", "grey");
}).on("mouseout", function() {
		$(this).css("color", "grey");
});



/*Scroll*/

/* Nav scroll*/



$('#nav a[href^="#"]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - 95
			}, 1200);
			return false;
		}
	}
});
/*
$('a.uppercase.top').click(function() {
	
			 $("html, body").animate({    // catch the `html, body`
			 scrollTop: $(this).offset().top - 100          // make their `scrollTop` property 0, to go at the top
    }, 1200);
			
		
	
});*/

(function(document, history, location) {
	var HISTORY_SUPPORT = !!(history && history.pushState);
  
	var anchorScrolls = {
	  ANCHOR_REGEX: /^#[^ ]+$/,
	  OFFSET_HEIGHT_PX: 80,
  
	  /**
	   * Establish events, and fix initial scroll position if a hash is provided.
	   */
	  init: function() {
		this.scrollToCurrent();
		window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
		document.body.addEventListener('click', this.delegateAnchors.bind(this));
	  },
  
	  /**
	   * Return the offset amount to deduct from the normal scroll position.
	   * Modify as appropriate to allow for dynamic calculations
	   */
	  getFixedOffset: function() {
		return this.OFFSET_HEIGHT_PX;
	  },
  
	  /**
	   * If the provided href is an anchor which resolves to an element on the
	   * page, scroll to it.
	   * @param  {String} href
	   * @return {Boolean} - Was the href an anchor.
	   */
	  scrollIfAnchor: function(href, pushToHistory) {
		var match, rect, anchorOffset;
  
		if(!this.ANCHOR_REGEX.test(href)) {
		  return false;
		}
  
		match = document.getElementById(href.slice(1));
  
		if(match) {
		  rect = match.getBoundingClientRect();
		  anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
		  window.scrollTo(window.pageXOffset, anchorOffset);
  
		  // Add the state to history as-per normal anchor links
		  if(HISTORY_SUPPORT && pushToHistory) {
			history.pushState({}, document.title, location.pathname + href);
		  }
		}
  
		return !!match;
	  },
  
	  /**
	   * Attempt to scroll to the current location's hash.
	   */
	  scrollToCurrent: function() {
		this.scrollIfAnchor(window.location.hash);
	  },
  
	  /**
	   * If the click event's target was an anchor, fix the scroll position.
	   */
	  delegateAnchors: function(e) {
		var elem = e.target;
  
		if(
		  elem.nodeName === 'A' &&
		  this.scrollIfAnchor(elem.getAttribute('href'), true)
		) {
		  e.preventDefault();
		}
	  }
	};
  
	window.addEventListener(
	  'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
	);
  })(window.document, window.history, window.location);