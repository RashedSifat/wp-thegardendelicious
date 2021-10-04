/*
** Instantly live-update customizer settings in the preview for improved user experience.
*/

(function( $ ) {

/*
** Colors
*/

	// Top Bar
	asheLivePreview( 'colors_top_bar_bg', function( val ) {
		$('#top-bar, #top-menu .sub-menu').css( 'background-color', val );
	});

	asheLivePreview( 'colors_top_bar_link', function( val ) {
		$('#top-bar a').css( 'color', val );
		$('#top-menu .sub-menu, #top-bar .sub-menu a').css( 'border-color', asheHex2Rgba( val, 0.05 ) );
	});

	asheLivePreview( 'colors_top_bar_link_hover', function( val ) {
		// Link Hover
		var css = '\
			#top-bar a:hover,\
			#top-bar li.current-menu-item > a,\
			#top-bar li.current-menu-ancestor > a,\
			#top-bar .sub-menu li.current-menu-item > a,\
			#top-bar .sub-menu li.current-menu-ancestor> a {\
			  color: '+ val +' !important;\
			}\
		';
		asheStyle( 'colors_top_bar_bg', css );
	});


	// Header
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( val ) {
			if ( 'blank' === val ) {
				$( '.header-logo a, .site-description' ).css( 'color', $('.site-description').css('color') );
				$( 'body' ).removeClass( 'title-tagline-shown' );
				$( 'body' ).addClass( 'title-tagline-hidden' );
			} else {
				$( '.header-logo a, .site-description' ).css( 'color', val );
				$( 'body' ).removeClass( 'title-tagline-hidden' );
				$( 'body' ).addClass( 'title-tagline-shown' );
			}
		});
	});

	asheLivePreview( 'colors_header_bg', function( val ) {
		$('.entry-header').css( 'background-color', val );
	});


	// Main Navigation
	asheLivePreview( 'colors_main_nav_bg', function( val ) {
		$('#main-nav, #main-menu .sub-menu a, #main-nav #s').css( 'background-color', val );
	});

	asheLivePreview( 'colors_main_nav_link', function( val ) {
		$('#main-nav li a:not(li.current-menu-item > a), #main-nav .svg-inline--fa, #main-nav #s,.instagram-title h2').css( 'color', val );
		$('.main-nav-sidebar span').css( 'background-color', val );
		$('#main-nav').css( 'box-shadow', '0px 1px 5px '+ asheHex2Rgba( val, 0.1 ) );
		$('#main-menu .sub-menu,#main-menu .sub-menu a').css( 'border-color', asheHex2Rgba( val, 0.05 ) );

		// Placeholder
		var css = '\
			#main-nav #s::-webkit-input-placeholder {\
			  color: '+ asheHex2Rgba( val, 0.7 ) +';\
			}\
			#main-nav #s::-moz-placeholder {\
			  color: '+ asheHex2Rgba( val, 0.7 ) +';\
			}\
			#main-nav #s:-ms-input-placeholder {\
			  color: '+ asheHex2Rgba( val, 0.7 ) +';\
			}\
			#main-nav #s:-moz-placeholder {\
			  color: '+ asheHex2Rgba( val, 0.7 ) +';\
			}\
		';
		asheStyle( 'colors_main_nav_link', css );
	});

	asheLivePreview( 'colors_main_nav_link_hover', function( val ) {
		// Links, Icons
		var css = '\
			#main-nav a:hover,\
			#main-nav .svg-inline--fa:hover,\
			#main-nav li.current-menu-item > a,\
			#main-nav li.current-menu-ancestor > a,\
			#main-nav .sub-menu li.current-menu-item > a,\
			#main-nav .sub-menu li.current-menu-ancestor> a {\
				color: '+ val +' !important;\
			}\
			.main-nav-sidebar:hover span {\
				background-color: '+ val +' !important;\
			}\
		';
		asheStyle( 'colors_main_nav_link_hover', css );
	});

	// Content
	asheLivePreview( 'colors_content_bg', function( val ) {
		var css = '\
			.sidebar-alt,\
			.main-content,\
			.featured-slider-area,\
			#featured-links,\
			.page-content select,\
			.page-content input,\
			.page-content textarea {\
				background-color: '+ val +';\
			}\
			.page-content #featured-links h6,\
			.instagram-title h2 {\
				background-color: '+ asheHex2Rgba( val, 0.85 ) +';\
			}\
			.ashe_promo_box_widget h6 {\
				background-color: '+ val +';\
			}\
			.ashe_promo_box_widget .promo-box:after  {\
				border-color: '+ val +';\
			}\
		';
		asheStyle( 'colors_content_bg', css );
	});

	asheLivePreview( 'colors_content_text', function( val ) {
		// Text
		var css = '\
			.page-content,\
			.page-content select,\
			.page-content input,\
			.page-content textarea,\
			.page-content .post-author a,\
			.page-content .ashe-widget a,\
			.page-content .comment-author,\
			.page-content #featured-links h6,\
			.ashe_promo_box_widget h6 {\
				color: '+ val +';\
			}\
			.woocommerce div.product .stock,\
			.woocommerce div.product p.price,\
			.woocommerce div.product span.price,\
			.woocommerce ul.products li.product .price,\
			.woocommerce-Reviews .woocommerce-review__author,\
			.woocommerce form .form-row .required,\
			.woocommerce form .form-row.woocommerce-invalid label,\
			.woocommerce .page-content div.product .woocommerce-tabs ul.tabs li a {\
				color: '+ val +';\
			}\
			.woocommerce a.remove:hover {\
			    color: '+ val +' !important;\
			}\
		';
		asheStyle( 'colors_content_text', css );
	});

	asheLivePreview( 'colors_content_title', function( val ) {
		// Title
		var css = '\
			.page-content h1,\
			.page-content h2,\
			.page-content h3,\
			.page-content h4,\
			.page-content h5,\
			.page-content h6,\
			.page-content .post-title a,\
			.post-content > p:first-of-type:first-letter,\
			p.has-drop-cap:not(:focus)::first-letter,\
			.page-content .author-description h4 a,\
			.page-content .related-posts h4 a,\
			.page-content .blog-pagination .previous-page a,\
			.page-content .blog-pagination .next-page a,\
			blockquote,\
			.page-content .post-share a {\
				color: '+ val +';\
			}\
			.page-content .post-title a:hover {\
				color: '+ asheHex2Rgba( val, 0.75 ) +';\
			}\
			.sidebar-alt-close-btn span {\
				background-color: '+ val +';\
			}\
		';
		asheStyle( 'colors_content_title', css );
	});

	asheLivePreview( 'colors_content_meta', function( val ) {
		// Meta
		var css = '\
			.page-content .post-date,\
			.page-content .post-comments,\
			.page-content .meta-sep,\
			.page-content .post-author,\
		    .page-content [data-layout*="list"] .post-author a,\
			.page-content .related-post-date,\
			.page-content .comment-meta a,\
			.page-content .author-share a,\
			.page-content .post-tags a,\
			.page-content .tagcloud a,\
			.widget_categories li,\
			.widget_archive li,\
			.ashe-subscribe-text p,\
			.rpwwt-post-author,\
			.rpwwt-post-categories,\
			.rpwwt-post-date,\
			.rpwwt-post-comments-number {\
				color: '+ val +';\
			}\
			.page-content input::-webkit-input-placeholder { /* Chrome/Opera/Safari */\
				color: '+ val +';\
			}\
			.page-content input::-moz-placeholder { /* Firefox 19+ */\
				color: '+ val +';\
			}\
			.page-content input:-ms-input-placeholder { /* IE 10+ */\
				color: '+ val +';\
			}\
			.page-content input:-moz-placeholder { /* Firefox 18- */\
				color: '+ val +';\
			}\
			.woocommerce a.remove,\
			.woocommerce .product_meta,\
			.page-content .woocommerce-breadcrumb,\
			.page-content .woocommerce-review-link,\
			.page-content .woocommerce-breadcrumb a,\
			.page-content .woocommerce-MyAccount-navigation-link a,\
			.woocommerce .woocommerce-info:before,\
			.woocommerce .page-content .woocommerce-result-count,\
			.woocommerce-page .page-content .woocommerce-result-count,\
			.woocommerce-Reviews .woocommerce-review__published-date,\
			.woocommerce.product_list_widget .quantity,\
			.woocommerce.widget_shopping_cart .quantity,\
			.woocommerce.widget_products .amount,\
			.woocommerce.widget_price_filter .price_slider_amount,\
			.woocommerce.widget_recently_viewed_products .amount,\
			.woocommerce.widget_top_rated_products .amount,\
			.woocommerce.widget_recent_reviews .reviewer {\
				color: '+ val +';\
			}\
			.woocommerce a.remove {\
				color: '+ val +' !important;\
			}\
		';
		asheStyle( 'colors_content_meta', css );
	});

	asheLivePreview( 'colors_content_accent', function( val ) {
		var selectors = '\
			.page-content .post-title a,\
			.page-content .post-comments,\
			.page-content .post-author a,\
			.page-content .post-share a,\
			.page-content .related-posts h4 a,\
			.page-content .author-description h4 a,\
			.page-content .blog-pagination a,\
			.page-content .post-date,\
			.page-content .post-author,\
			.page-content .related-post-date,\
			.page-content .comment-meta a,\
			.page-content .author-share a,\
			.page-content .ashe-widget a,\
			.page-content #featured-slider a\
		';

		$( '.page-content a' ).not( selectors ).css( 'color', val );
		
		/* Disable TMP
		$( '.page-content .elementor a' ).css( 'color', 'inherit' );
		*/

		var css = '\
			.page-content a:hover {\
				color: '+ asheHex2Rgba( val, 0.8 ) +';\
			}\
			.post-categories,\
			#page-wrap .ashe-widget.widget_text a,\
			#page-wrap .ashe-widget.ashe_author_widget a {\
				color: '+ val +';\
			}\
			.ps-container > .ps-scrollbar-y-rail > .ps-scrollbar-y {\
				background:'+ val +';\
			}\
			.page-content a:hover {\
				color: '+ asheHex2Rgba( val, 0.8 ) +';\
			}\
			blockquote {\
				border-color:'+ val +';\
			}\
			.slide-caption {\
				color: #ffffff;\
				background:'+ val +';\
			}\
			p.demo_store,\
			.woocommerce-store-notice,\
			.woocommerce span.onsale {\
			   background-color: '+ val +';\
			}\
			.woocommerce .star-rating::before,\
			.woocommerce .star-rating span::before,\
			.woocommerce .page-content ul.products li.product .button,\
			.page-content .woocommerce ul.products li.product .button,\
			.page-content .woocommerce-MyAccount-navigation-link.is-active a,\
			.page-content .woocommerce-MyAccount-navigation-link a:hover {\
			   color: '+ val +';\
			}\
		';
		asheStyle( 'colors_content_accent', css );
	});

	asheLivePreview( 'colors_text_selection', function( val ) {
		var css = '\
			::-moz-selection {\
				color: #ffffff;\
				background: '+ val +';\
			}\
			::selection {\
				color: #ffffff;\
				background: '+ val +';\
			}\
		';
		asheStyle( 'colors_text_selection', css );
	});

	asheLivePreview( 'colors_content_border', function( val ) {
		var css = '\
			.page-content .post-footer,\
			[data-layout*="list"] .blog-grid > li,\
			.page-content .author-description,\
			.page-content .related-posts,\
			.page-content .entry-comments,\
			.page-content .ashe-widget li,\
			.page-content #wp-calendar,\
			.page-content #wp-calendar caption,\
			.page-content #wp-calendar tbody td,\
			.page-content .widget_nav_menu li a,\
			.page-content .widget_pages li a,\
			.page-content .tagcloud a,\
			.page-content select,\
			.page-content input,\
			.page-content textarea,\
			.widget-title h2:before,\
			.widget-title h2:after,\
			.post-tags a,\
			.gallery-caption,\
			.wp-caption-text,\
			table tr,\
			table th,\
			table td,\
			pre {\
				border-color: '+ val +';\
			}\
			hr {\
				background-color: '+ val +';\
			}\
			.woocommerce form.login,\
			.woocommerce form.register,\
			.woocommerce-account fieldset,\
			.woocommerce form.checkout_coupon,\
			.woocommerce .woocommerce-info,\
			.woocommerce .woocommerce-error,\
			.woocommerce .woocommerce-message,\
			.woocommerce.widget_shopping_cart .total,\
			.woocommerce-Reviews .comment_container,\
			.woocommerce-cart #payment ul.payment_methods,\
			#add_payment_method #payment ul.payment_methods,\
			.woocommerce-checkout #payment ul.payment_methods,\
			.woocommerce div.product .woocommerce-tabs ul.tabs::before,\
			.woocommerce div.product .woocommerce-tabs ul.tabs::after,\
			.woocommerce div.product .woocommerce-tabs ul.tabs li,\
			.woocommerce .woocommerce-MyAccount-navigation-link,\
			.select2-container--default .select2-selection--single {\
				border-color: '+ val +';\
			}\
			.woocommerce-cart #payment,\
			#add_payment_method #payment,\
			.woocommerce-checkout #payment,\
			.woocommerce .woocommerce-info,\
			.woocommerce .woocommerce-error,\
			.woocommerce .woocommerce-message,\
			.woocommerce div.product .woocommerce-tabs ul.tabs li {\
				background-color: '+ asheHex2Rgba( val, 0.3 ) + ';\
			}\
			.woocommerce-cart #payment div.payment_box::before,\
			#add_payment_method #payment div.payment_box::before,\
			.woocommerce-checkout #payment div.payment_box::before {\
				border-color: '+ asheHex2Rgba( val, 0.5 ) +';\
			}\
			.woocommerce-cart #payment div.payment_box,\
			#add_payment_method #payment div.payment_box,\
			.woocommerce-checkout #payment div.payment_box {\
				background-color: '+ asheHex2Rgba( val, 0.5 ) +';\
			}\
		';

		asheStyle( 'colors_content_border', css );
	});

	// Buttons
	asheLivePreview( 'colors_button', function( val ) {
		var css = '\
			.widget_search .svg-fa-wrap,\
			.widget_search #searchsubmit,\
			.single-navigation i,\
			.page-content input.submit,\
			.page-content .blog-pagination.numeric a,\
			.page-content .blog-pagination.load-more a,\
			.page-content .mc4wp-form-fields input[type="submit"],\
			.page-content .widget_wysija input[type="submit"],\
			.page-content .post-password-form input[type="submit"],\
			.page-content .wpcf7 [type="submit"] {\
				background-color: '+ val +';\
			}\
			.page-content .woocommerce input.button,\
			.page-content .woocommerce a.button,\
			.page-content .woocommerce a.button.alt,\
			.page-content .woocommerce button.button.alt,\
			.page-content .woocommerce input.button.alt,\
			.page-content .woocommerce #respond input#submit.alt,\
			.page-content .woocommerce.widget_product_search input[type="submit"],\
			.page-content .woocommerce.widget_price_filter .button,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce .page-content a.button.alt,\
			.woocommerce .page-content button.button.alt,\
			.woocommerce .page-content #respond input#submit,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce-page .page-content .woocommerce-message .button {\
				background-color: '+ val +';\
			}\
		';
		asheStyle( 'colors_button', css );
	});

	asheLivePreview( 'colors_button_text', function( val ) {
		var css = '\
			.widget_search .svg-fa-wrap,\
			.widget_search #searchsubmit,\
			.single-navigation i,\
			.page-content input.submit,\
			.page-content .blog-pagination.numeric a,\
			.page-content .blog-pagination.load-more a,\
			.page-content .mc4wp-form-fields input[type="submit"],\
			.page-content .widget_wysija input[type="submit"],\
			.page-content .post-password-form input[type="submit"],\
			.page-content .wpcf7 [type="submit"] {\
				color: '+ val +';\
			}\
			.page-content .woocommerce input.button,\
			.page-content .woocommerce a.button,\
			.page-content .woocommerce a.button.alt,\
			.page-content .woocommerce button.button.alt,\
			.page-content .woocommerce input.button.alt,\
			.page-content .woocommerce #respond input#submit.alt,\
			.page-content .woocommerce.widget_product_search input[type="submit"],\
			.page-content .woocommerce.widget_price_filter .button,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce .page-content a.button.alt,\
			.woocommerce .page-content button.button.alt,\
			.woocommerce .page-content #respond input#submit,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce-page .page-content .woocommerce-message .button {\
				color: '+ val +';\
			}\
		';
		asheStyle( 'colors_button_text', css );
	});

	asheLivePreview( 'colors_button_hover', function( val ) {
		var css = '\
			.single-navigation i:hover,\
			.page-content input.submit:hover,\
			.page-content .blog-pagination.numeric a:hover,\
			.page-content .blog-pagination.numeric span,\
			.page-content .blog-pagination.load-more a:hover,\
			.page-content .mc4wp-form-fields input[type="submit"]:hover,\
			.page-content .widget_wysija input[type="submit"]:hover,\
			.page-content .post-password-form input[type="submit"]:hover,\
			.page-content .wpcf7 [type="submit"]:hover {\
				background-color: '+ val +';\
			}\
			.page-content .woocommerce input.button:hover,\
			.page-content .woocommerce a.button:hover,\
			.page-content .woocommerce a.button.alt:hover,\
			.page-content .woocommerce button.button.alt:hover,\
			.page-content .woocommerce input.button.alt:hover,\
			.page-content .woocommerce #respond input#submit.alt:hover,\
			.page-content .woocommerce.widget_price_filter .button:hover,\
			.woocommerce .page-content .woocommerce-message .button:hover,\
			.woocommerce .page-content a.button.alt:hover,\
			.woocommerce .page-content button.button.alt:hover,\
			.woocommerce .page-content #respond input#submit:hover,\
			.woocommerce .page-content .woocommerce-message .button:hover,\
			.woocommerce-page .page-content .woocommerce-message .button:hover {\
				background-color: '+ val +';\
			}\
		';
		asheStyle( 'colors_button_hover', css );
	});

	asheLivePreview( 'colors_button_hover_text', function( val ) {
		var css = '\
			.single-navigation i:hover,\
			.page-content input.submit:hover,\
			.page-content .blog-pagination.numeric a:hover,\
			.page-content .blog-pagination.numeric span,\
			.page-content .blog-pagination.load-more a:hover,\
			.page-content .mc4wp-form-fields input[type="submit"]:hover,\
			.page-content .widget_wysija input[type="submit"]:hover,\
			.page-content .post-password-form input[type="submit"]:hover,\
			.page-content .wpcf7 [type="submit"]:hover {\
				color: '+ val +';\
			}\
			.page-content .woocommerce input.button:hover,\
			.page-content .woocommerce a.button:hover,\
			.page-content .woocommerce a.button.alt:hover,\
			.page-content .woocommerce button.button.alt:hover,\
			.page-content .woocommerce input.button.alt:hover,\
			.page-content .woocommerce #respond input#submit.alt:hover,\
			.page-content .woocommerce.widget_price_filter .button:hover,\
			.woocommerce .page-content .woocommerce-message .button:hover,\
			.woocommerce .page-content a.button.alt:hover,\
			.woocommerce .page-content button.button.alt:hover,\
			.woocommerce .page-content #respond input#submit:hover,\
			.woocommerce .page-content .woocommerce-message .button:hover,\
			.woocommerce-page .page-content .woocommerce-message .button:hover {\
				color: '+ val +';\
			}\
		';
		asheStyle( 'colors_button_hover_text', css );
	});

	asheLivePreview( 'colors_overlay_text', function( val ) {
		// Image Overlay
		var css = '\
			.image-overlay,\
			#infscr-loading,\
			.page-content h4.image-overlay,\
			.image-overlay a,\
			.post-slider .prev-arrow,\
			.post-slider .next-arrow,\
			.header-slider-prev-arrow,\
			.header-slider-next-arrow,\
			.page-content .image-overlay a,\
			#featured-slider .slick-arrow,\
			#featured-slider .slider-dots,\
			.header-slider-dots {\
				color: '+ val +';\
			}\
		';
		asheStyle( 'colors_overlay_text', css );
	});

	asheLivePreview( 'colors_overlay', function( val ) {
		var selectors = '\
			.image-overlay,\
			#infscr-loading,\
			.page-content h4.image-overlay\
		';

		$( selectors ).css( 'background-color', asheHex2Rgba( val, 0.3 ) );
	});

	// Page Footer
	asheLivePreview( 'colors_footer_bg', function( val ) {
		// Background
		var selectors = '\
			#page-footer,\
			#page-footer select,\
			#page-footer input,\
			#page-footer textarea\
		';

		$( selectors ).css( 'background-color', val );
	});

	asheLivePreview( 'colors_footer_text', function( val ) {
		// Text
		var css = '\
			#page-footer,\
			#page-footer a,\
			#page-footer select,\
			#page-footer input,\
			#page-footer textarea {\
				color: '+ val +';\
			}\
		';
		asheStyle( 'colors_footer_text', css );
	});

	asheLivePreview( 'colors_footer_title', function( val ) {
		// Title
		var selectors = '\
			#page-footer h1,\
			#page-footer h2,\
			#page-footer h3,\
			#page-footer h4,\
			#page-footer h5,\
			#page-footer h6\
		';

		$( selectors ).css( 'color', val );
	});

	asheLivePreview( 'colors_footer_accent', function( val ) {
		// Accent
		var css = '\
			#page-footer a:hover {\
				color: '+ val +';\
			}\
		';
		asheStyle( 'colors_footer_accent', css );
	});

	asheLivePreview( 'colors_footer_border', function( val ) {
		var css = '\
			#page-footer a,\
			#page-footer .ashe-widget li,\
			#page-footer #wp-calendar,\
			#page-footer #wp-calendar caption,\
			#page-footer #wp-calendar th,\
			#page-footer #wp-calendar td,\
			#page-footer .widget_nav_menu li a,\
			#page-footer select,\
			#page-footer input,\
			#page-footer textarea,\
			#page-footer .widget-title h2:before,\
			#page-footer .widget-title h2:after,\
			.footer-widgets,\
			.category-description {\
				border-color: '+ val +';\
			}\
			#page-footer hr {\
				background-color: '+ val +';\
			}\
		';
		asheStyle( 'colors_footer_border', css );
	});

	asheLivePreview( 'colors_preloader_bg', function( val ) {
		// Preloader
		$( '.ashe-preloader-wrap' ).css( 'background-color', val );
	});


/*
** General Layouts
*/
	// General
	asheLivePreview( 'general_site_width', function( val ) {
		$( '.boxed-wrapper' ).css( 'max-width', val +'px' );

		// Fix the Slider
		$('#featured-slider').slick('refresh');
	});

	// Padding
	asheLivePreview( 'general_content_padding', function( val ) {

		var css = '\
			#top-bar > div,\
			#main-nav > div,\
			.featured-slider-area.boxed-wrapper,\
			#featured-links,\
			.main-content,\
			.page-footer-inner {\
				padding-left: '+ val +'px;\
				padding-right: '+ val +'px;\
			}\
		';

		if( $( '#main-nav' ).css( 'text-align' ) === 'center' ) {
			css += '\
			.main-nav-sidebar {\
			  left: '+ val +'px;\
			  z-index: 1;\
			}			\
			.main-nav-icons {\
			  right: '+ val +'px;\
			}\
			';
		}
		asheStyle( 'general_content_padding', css );

		// Fix the Slider
		$('#featured-slider').slick('refresh');
	});


/*
** Top Bar
*/
	asheLivePreview( 'top_bar_align', function( val ) {
		// reset
		$('#top-menu, .top-bar-socials').css( 'float', 'none' );

		if ( val === 'left-right' ) {
			$('#top-menu').css( 'float', 'left' );
			$('.top-bar-socials').css( 'float', 'right' );
		} if ( val === 'right-left' ) {
			$('#top-menu').css( 'float', 'right' );
			$('.top-bar-socials').css( 'float', 'left' );
		}
	});


/*
** Page Header
*/

	asheLivePreview( 'header_image_height', function( val ) {
		$('.entry-header').css( 'height', val +'px' );
	});

	asheLivePreview( 'header_image_bg_image_size', function( val ) {
		$('.entry-header').css( 'background-size', val );
	});

	asheLivePreview( 'title_tagline_logo_width', function( val ) {
		$('.header-logo a').css( 'max-width', val +'px' );
	});

	asheLivePreview( 'title_tagline_logo_distance', function( val ) {
		$('.header-logo').css( 'padding-top', val +'px' );
	});

	asheLivePreview( 'main_nav_mini_logo_width', function( val ) {
		$('.mini-logo a').css( 'max-width', val +'px' );
	});


/*
** Site Identity
*/
	wp.customize( 'blogname', function( value ) {
		value.bind( function( val ) {
			$('.header-logo a').text( val );
		});
	});
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( val ) {
			$('.header-logo p').text( val );
		});
	});


/*
** Featured Slider =====
*/
	asheLivePreview( 'featured_slider_crop_width', function( val ) {
		if ( $('#featured-slider .slick-slide').find('.slider-item-bg').length > 0 ) {
			$( '#featured-slider.boxed-wrapper' ).css( 'max-width', val +'px' );
			$('#featured-slider')[0].slick.refresh();
		}
	});

	asheLivePreview( 'featured_slider_crop_height', function( val ) {
		if ( $('#featured-slider .slick-slide').find('.slider-item-bg').length > 0 ) {
			$( '.slider-item-bg' ).css( 'height', val +'px' );
			$('#featured-slider')[0].slick.refresh();
		}
	});

	asheLivePreview( 'featured_slider_gutter_horz', function( val ) {
		if ( $('#featured-slider .slick-slide').find('.slider-item-bg').length <= 0 ) {

			var css = '\
			#featured-slider .slick-slide {\
				margin-left: '+ val +'px;\
			}\
			#featured-slider .slick-list {\
				margin-left: -'+ val +'px;\
			}\
			';

			asheStyle( 'featured_slider_gutter_horz', css );

			$('#featured-slider')[0].slick.refresh();
		}
	});
/*
** Featured Links =====
*/

	asheLivePreview( 'featured_links_title_1', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(1)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(1)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(1) h6' ).text( val );
	});

	asheLivePreview( 'featured_links_title_2', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(2)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(2)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(2) h6' ).text( val );
	});

	asheLivePreview( 'featured_links_title_3', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(3)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(3)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(3) h6' ).text( val );
	});

	asheLivePreview( 'featured_links_title_4', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(4)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(4)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(4) h6' ).text( val );
	});

	asheLivePreview( 'featured_links_title_5', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(5)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(5)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(5) h6' ).text( val );
	});

	asheLivePreview( 'featured_links_title_6', function( val ) {
		if ( val == '' ) {
			$( '.featured-link:nth-child(6)' ).find( '.cv-inner' ).css( 'display', 'none' );
		} else {
			$( '.featured-link:nth-child(6)' ).find( '.cv-inner' ).css( 'display', 'table-cell' );
		}
		$( '.featured-link:nth-child(6) h6' ).text( val );
	});


/*
** Blog Page
*/

	// Vertical Gutter
	asheLivePreview( 'blog_page_gutter_vert', function( val ) {

		var css = '\
		.blog-grid > li,\
		.main-container .featured-slider-area {\
			margin-bottom: '+ val +'px;\
		}\
		[data-layout*="list"] .blog-grid > li {\
			padding-bottom: '+ val +'px;\
		}\
		';

		asheStyle( 'blog_page_gutter_vert', css );

	});

	// Read More
	asheLivePreview( 'blog_page_more_text', function( val ) {
		if ( val == '' ) {
			$( '.read-more' ).css( 'display', 'none' );
		} else {
			$( '.read-more' ).css( 'display', 'block' );
		}
		$( '.read-more a' ).text( val );
	});

	// Blog Related Posts Title
	asheLivePreview( 'blog_page_related_title', function( val ) {
		if ( val == '' ) {
			$( 'body:not(.single) .related-posts h3' ).css( 'display', 'none' );
		} else {
			$( 'body:not(.single) .related-posts h3' ).css( 'display', 'block' );
		}
		$( 'body:not(.single) .related-posts h3' ).text( val );
	});

	// Single Related Posts Title
	asheLivePreview( 'single_page_related_title', function( val ) {
		if ( val == '' ) {
			$( '.single .related-posts h3' ).css( 'display', 'none' );
		} else {
			$( '.single .related-posts h3' ).css( 'display', 'block' );
		}
		$( '.single .related-posts h3' ).text( val );
	});


/*
** Typography
*/

	// Logo Family
	asheLoadGoogleFont( 'typography_logo_family', $( '.header-logo a,.site-description' ) );

	// Logo Size
	asheLivePreview( 'typography_logo_size', function( val ) {
		$( '.header-logo a' ).css( 'font-size', val +'px' );
	});

	// Tagline Size
	asheLivePreview( 'typography_logo_tg_size', function( val ) {
		$( '.header-logo .site-description' ).css( 'font-size', val +'px' );
	});

	// Logo Line Height
	asheLivePreview( 'typography_logo_height', function( val ) {
		$( '.header-logo a' ).css( 'line-height', val +'px' );
	});

	// Logo Letter Spacing
	asheLivePreview( 'typography_logo_spacing', function( val ) {
		$( '.header-logo a' ).css( 'letter-spacing', val +'px' );
	});

	// Logo Font Weight
	asheLivePreview( 'typography_logo_weight', function( val ) {
		$( '.header-logo a' ).css( 'font-weight', val );
	});

	// Logo Italic
	asheLivePreview( 'typography_logo_italic', function( val ) {
		if ( val === true ) {
			$( '.header-logo' ).css( 'font-style', 'italic' );
		} else {
			$( '.header-logo' ).css( 'font-style', 'normal' );
		}
	});

	// Logo Uppercase
	asheLivePreview( 'typography_logo_uppercase', function( val ) {
		if ( val === true ) {
			$( '.header-logo' ).css( 'text-transform', 'uppercase' );
		} else {
			$( '.header-logo' ).css( 'text-transform', 'none' );
		}
	});


	// Menu Family
	asheLoadGoogleFont( 'typography_nav_family', $( '#top-menu li a, #main-menu li a, #mobile-menu li' ) );

	// Menu Size
	asheLivePreview( 'typography_nav_size', function( val ) {

		var css = '\
			#main-nav #s,\
			.main-nav-search,\
			#main-menu li a,\
			#mobile-menu li,\
			#main-menu li.menu-item-has-children > a:after {\
				font-size: '+ val +'px;\
			}\
			#top-menu li a,\
			.top-bar-socials a {\
				font-size: '+ ashe_typography_calc( val, 6 ) +'px;\
			}\
			#top-menu .sub-menu > li > a {\
				font-size: '+ ashe_typography_calc( val, 4 ) +'px;\
			}\
			#main-menu .sub-menu > li > a,\
			#mobile-menu .sub-menu > li {\
				font-size: '+ ashe_typography_calc( val, 5 ) +'px;\
			}\
			.mobile-menu-btn {\
				font-size: '+ ashe_typography_calc( val, 0.45 ) +'px;\
			}\
			.main-nav-socials a {\
				font-size: '+ ashe_typography_calc( val, 10 ) +'px;\
			}\
		';
		asheStyle( 'typography_nav_size', css );

		if ( parseInt( val, 10 ) >= 28 ) {
			$('.main-nav-sidebar span').css({
				'width' : '26px',
				'margin-bottom' : '6px'
			});
		} else if ( parseInt( val, 10 ) >= 24 ) {
			$('.main-nav-sidebar span').css({
				'width' : '26px',
				'margin-bottom' : '5px'
			});
		} else if ( parseInt( val, 10 ) >= 22 ) {
			$('.main-nav-sidebar span').css({
				'width' : '22px',
				'margin-bottom' : '4px'
			});
		} else if ( parseInt( val, 10 ) >= 18 ) {
			$('.main-nav-sidebar span').css({
				'width' : '20px',
				'margin-bottom' : '4px'
			});
		}

	});

	// Menu Line Height
	asheLivePreview( 'typography_nav_height', function( val ) {

		var css = '\
			#main-nav {\
				min-height: '+ val +'px;\
			}\
			.main-nav-sidebar,\
			.mini-logo {\
				height: '+ val +'px;\
			}\
			#main-menu li a,\
			.main-nav-search,\
			#main-nav #s,\
			.mobile-menu-btn,\
			.main-nav-socials a {\
				line-height: '+ val +'px;\
			}\
			#top-menu li a,\
			.top-bar-socials a {\
				line-height: '+ ashe_typography_calc( val, 6 ) +'px;\
			}\
		';
		asheStyle( 'typography_nav_height', css );

		// Fix the Slider
		$('#featured-slider').slick('refresh');

		// Fix Sticky Navigation
		$('#main-nav-sticky-wrapper').height(val)

	});

	// Menu Letter Spacing
	asheLivePreview( 'typography_nav_spacing', function( val ) {

		var css = '\
			#top-menu li a,\
			#top-menu .sub-menu > li > a,\
			#main-menu .sub-menu > li > a,\
			#mobile-menu .sub-menu > li {\
				letter-spacing: '+ ashe_typography_calc( val, 6, 1 ) +'px;\
			}\
			#main-menu li a,\
			#mobile-menu li {\
				letter-spacing: '+ val +'px;\
			}\
		';
		asheStyle( 'typography_nav_spacing', css );

	});

	// Menu Font Weight
	asheLivePreview( 'typography_nav_weight', function( val ) {

		var css = '\
			#top-menu li a {\
				font-weight: '+ val +';\
			}\
			#main-menu li a {\
				font-weight: '+ val +';\
			}\
			#mobile-menu li {\
				font-weight: '+ val +';\
			}\
		';
		asheStyle( 'typography_nav_weight', css );

	});

	// Menu Italic
	asheLivePreview( 'typography_nav_italic', function( val ) {
		if ( val === true ) {
			$( '#top-menu li a,	#main-menu li a, #mobile-menu li' ).css( 'font-style', 'italic' );
		} else {
			$( '#top-menu li a,	#main-menu li a, #mobile-menu li' ).css( 'font-style', 'normal' );
		}
	});

	// Menu Uppercase
	asheLivePreview( 'typography_nav_uppercase', function( val ) {
		if ( val === true ) {
			$( '#top-menu li a,	#main-menu li a, #mobile-menu li' ).css( 'text-transform', 'uppercase' );
		} else {
			$( '#top-menu li a,	#main-menu li a, #mobile-menu li' ).css( 'text-transform', 'none' );
		}
	});


	// Headings Family
	var headingFontFamily = '\
		h1,\
		h2,\
		h3,\
		h4,\
		h5,\
		h6,\
		blockquote p,\
		#reply-title,\
		#reply-title a,\
		#wp-calendar thead th,\
		#wp-calendar caption,\
		.post-meta,\
		.post-content > p:first-of-type:first-letter,\
		p.has-drop-cap:not(:focus)::first-letter\
	';
	asheLoadGoogleFont( 'typography_head_family', $( headingFontFamily ) );

	// Headings Size
	asheLivePreview( 'typography_head_size', function( val ) {

		var css = '\
			h1 {\
				font-size: '+ val +'px;\
			}	\
			h2 {\
				font-size: '+ ashe_typography_calc( val, 10 ) +'px;\
			}\
			h3 {\
				font-size: '+ ashe_typography_calc( val, 4 ) +'px;\
			}\
			h4 {\
				font-size: '+ ashe_typography_calc( val, 2.5 ) +'px;\
			}\
			h5 {\
				font-size: '+ ashe_typography_calc( val, 2.2 ) +'px;\
			}\
			h6 {\
				font-size: '+ ashe_typography_calc( val, 2 ) +'px;\
			}\
			blockquote p {\
				font-size: '+ ashe_typography_calc( val, 1.9 ) +'px;\
			}\
			.related-posts h4 a {\
				font-size: '+ ashe_typography_calc( val, 1.8 ) +'px;\
			}\
			#reply-title,\
			#reply-title a,\
			.comment-title,\
			.widget-title h2,\
			.author-description h4,\
			.category-description h4,\
			.ashe_author_widget h3 {\
				font-size: '+ ashe_typography_calc( val, 1.7 ) +'px;\
			}\
			.woocommerce ul.products li.product .woocommerce-loop-category__title,\
			.woocommerce ul.products li.product .woocommerce-loop-product__title,\
			.woocommerce ul.products li.product h3 {\
				font-size: '+ ashe_typography_calc( val, 2.4 ) +'px;\
			}\
		';
		asheStyle( 'typography_head_size', css );

	});

	// Headings Line Height
	asheLivePreview( 'typography_head_height', function( val ) {
		$('.post-title, .page-title').css( 'line-height', val +'px' );
	});

	// Headings Letter Spacing
	asheLivePreview( 'typography_head_spacing', function( val ) {

		var ls1 = parseFloat(val) + 1,
			ls15 = parseFloat(val) + 1.5;

		var css = '\
			.slider-title,\
			.post-title,\
			.page-title,\
			.related-posts h4 a {\
				letter-spacing: '+ val +'px;\
			}\
			.widget-title h2,\
			.author-description h4,\
			.category-description h4,\
			.comment-title,\
			#reply-title,\
			#reply-title a,\
			.ashe_author_widget h3 {\
				letter-spacing: '+ ls1 +'px;\
			}\
			.related-posts h3 {\
				letter-spacing: '+ ls15 +'px;\
			}\
		';
		asheStyle( 'typography_head_spacing', css );

	});

	// Headings Font Weight
	asheLivePreview( 'typography_head_weight', function( val ) {
		$( 'h1,	h2,	h3,	h4,	h5,	h6' ).css( 'font-weight', val );
	});

	// Headings Italic
	asheLivePreview( 'typography_head_italic', function( val ) {
		if ( val === true ) {
			$( 'h1,	h2,	h3,	h4,	h5,	h6' ).css( 'font-style', 'italic' );
		} else {
			$( 'h1,	h2,	h3,	h4,	h5,	h6' ).css( 'font-style', 'normal' );
		}
	});

	// Headings Uppercase
	asheLivePreview( 'typography_head_uppercase', function( val ) {
		if ( val === true ) {
			$( 'h1,	h2,	h3,	h4,	h5,	h6' ).css( 'text-transform', 'uppercase' );
		} else {
			$( 'h1,	h2,	h3,	h4,	h5,	h6' ).css( 'text-transform', 'none' );
		}
	});


	// Body Family
	var bodyFontFamily = '\
		body,\
		.page-404 h2,\
		#featured-links h6,\
		.ashe_promo_box_widget h6,\
		.comment-author,\
		.related-posts h3,\
		.instagram-title h2,\
		input,\
		textarea,\
		select,\
		.no-result-found h1,\
		.ashe-subscribe-text h4,\
		.widget_wysija_cont .updated,\
		.widget_wysija_cont .error,\
		.widget_wysija_cont .xdetailed-errors,\
		.upsells.products > h2,\
		.crosssells.products > h2,\
		.related.products > h2\
	';
	asheLoadGoogleFont( 'typography_body_family', $( bodyFontFamily ) );

	// Body Size
	asheLivePreview( 'typography_body_size', function( val ) {

		var css = '\
			body,\
			.comment-author,\
			.woocommerce-Reviews .woocommerce-review__author {\
				font-size: '+ val +'px;\
			}\
			.post-media .image-overlay p,\
			.post-media .image-overlay a {\
				font-size: '+ ashe_typography_calc( val, 0.46 ) +'px;\
			}\
			.ashe_social_widget .social-icons a {\
				font-size: '+ ashe_typography_calc( val, 0.47 ) +'px;\
			}\
			.post-author,\
			.post-share,\
			.related-posts h3,\
			input,\
			textarea,\
			select,\
			.comment-reply-link,\
			.wp-caption-text,\
			.author-share a,\
			#featured-links h6,\
		   .ashe_promo_box_widget h6,\
			#wp-calendar,\
			.instagram-title h2,\
			.upsells.products > h2,\
			.crosssells.products > h2,\
			.related.products > h2,\
			.page-content .woocommerce input.button,\
			.page-content .woocommerce a.button,\
			.page-content .woocommerce a.button.alt,\
			.page-content .woocommerce button.button.alt,\
			.page-content .woocommerce input.button.alt,\
			.page-content .woocommerce #respond input#submit.alt,\
			.page-content .woocommerce.widget_price_filter .button,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce .page-content a.button.alt,\
			.woocommerce .page-content button.button.alt,\
			.woocommerce .page-content #respond input#submit,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce-page .page-content .woocommerce-message .button,\
			.woocommerce form .form-row .required, {\
				font-size: '+ ashe_typography_calc( val, 10 ) +'px;\
			}\
			.slider-categories,\
			.slider-read-more a,\
			.read-more a,\
			.blog-pagination a,\
			.blog-pagination span,\
			.footer-socials a,\
			.rpwwt-post-author,\
			.rpwwt-post-categories,\
			.rpwwt-post-date,\
			.rpwwt-post-comments-number,\
			.copyright-info,\
			.footer-menu-container,\
			.woocommerce-result-count,\
			.woocommerce ul.products li.product .price,\
			.woocommerce .product_meta,\
			.woocommerce.widget_shopping_cart .quantity,\
			.woocommerce.product_list_widget .quantity,\
			.woocommerce.widget_products .amount,\
			.woocommerce.widget_price_filter .price_slider_amount,\
			.woocommerce.widget_recently_viewed_products .amount,\
			.woocommerce.widget_top_rated_products .amount,\
			.woocommerce.widget_recent_reviews .reviewer,\
			.woocommerce-Reviews .woocommerce-review__author {\
				font-size: '+ ashe_typography_calc( val, 6 ) +'px;\
			}\
			.post-categories a,\
			.post-tags a,\
			.widget_recent_entries ul li span,\
			#wp-calendar caption,\
			#wp-calendar tfoot #prev a,\
			#wp-calendar tfoot #next a {\
				font-size: '+ ashe_typography_calc( val, 5 ) +'px;\
			}\
			.related-post-date,\
			.comment-meta,\
			.tagcloud a,\
			.woocommerce .page-content ul.products li.product .button,\
			.page-content .woocommerce ul.products li.product .button,\
			.woocommerce-Reviews .woocommerce-review__published-date {\
				font-size: '+ ashe_typography_calc( val, 4 ) +'px !important;\
			}\
			.woocommerce div.product .woocommerce-tabs .panel > h2,\
			.woocommerce #reviews #comments h2,\
			.woocommerce .cart-collaterals .cross-sells > h2,\
			.woocommerce-page .cart-collaterals .cross-sells > h2,\
			.woocommerce .cart-collaterals .cart_totals > h2,\
			.woocommerce-page .cart-collaterals .cart_totals > h2,\
			.woocommerce-billing-fields > h3,\
			.woocommerce-shipping-fields > h3,\
			#order_review_heading,\
			#customer_login h2,\
			.woocommerce-Address-title h3,\
			.woocommerce-order-details__title,\
			.woocommerce-customer-details h2,\
			.woocommerce-columns--addresses h3 {\
				font-size: '+ ashe_typography_calc( val, 0.48 ) +'px;\
			}\
		';
		asheStyle( 'typography_body_size', css );

	});

	// Body Line Height
	asheLivePreview( 'typography_body_height', function( val ) {
		$( 'body p, .post-content, .post-content li, .comment-text li' ).css( 'line-height', val +'px' );
	});

	// Body Letter Spacing
	asheLivePreview( 'typography_body_spacing', function( val ) {

		var ls1  = parseFloat(val) + 1,
			ls05 = parseFloat(val) + 0.5,
			ls15 = parseFloat(val) + 1.5,
			ls2  = parseFloat(val) + 2;

		var css = '\
			body p,\
			.post-content,\
			.comment-author,\
			.widget_recent_comments li,\
			.widget_meta li,\
			.widget_recent_comments li,\
			.widget_pages > ul > li,\
			.widget_archive li,\
			.widget_categories > ul > li,\
			.widget_recent_entries ul li,\
			.widget_nav_menu li,\
			.related-post-date,\
			.post-media .image-overlay a,\
			.post-meta,\
			.rpwwt-post-title {\
				letter-spacing: '+ val +'px;\
			}\
			.post-author,\
			.post-media .image-overlay span,\
			blockquote p {\
				letter-spacing: '+ ls05 +'px;\
			}\
			#main-nav #searchform input,\
			#featured-links h6,\
		    .ashe_promo_box_widget h6,\
			.instagram-title h2,\
			.ashe-subscribe-text h4,\
			.page-404 p,\
			#wp-calendar caption,\
			.page-content .woocommerce input.button,\
			.page-content .woocommerce a.button,\
			.page-content .woocommerce a.button.alt,\
			.page-content .woocommerce button.button.alt,\
			.page-content .woocommerce input.button.alt,\
			.page-content .woocommerce #respond input#submit.alt,\
			.page-content .woocommerce.widget_price_filter .button,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce .page-content a.button.alt,\
			.woocommerce .page-content button.button.alt,\
			.woocommerce .page-content #respond input#submit,\
			.woocommerce .page-content .woocommerce-message .button,\
			.woocommerce-page .page-content .woocommerce-message .button,\
			.woocommerce form .form-row .required {\
				letter-spacing: '+ ls1 +'px;\
			}\
			.comments-area #submit,\
			.tagcloud a,\
			.mc4wp-form-fields input[type="submit"],\
			.widget_wysija input[type="submit"],\
			.slider-read-more a,\
			.post-categories a,\
			.read-more a,\
			.no-result-found h1,\
			.blog-pagination a,\
			.blog-pagination span,\
			.woocommerce .page-content ul.products li.product .button,\
			.page-content .woocommerce ul.products li.product .button {\
				letter-spacing: '+ ls2 +'px;\
			}\
			.woocommerce div.product .woocommerce-tabs .panel > h2,\
			.woocommerce #reviews #comments h2,\
			.woocommerce .cart-collaterals .cross-sells > h2,\
			.woocommerce-page .cart-collaterals .cross-sells > h2,\
			.woocommerce .cart-collaterals .cart_totals > h2,\
			.woocommerce-page .cart-collaterals .cart_totals > h2,\
			.woocommerce-billing-fields > h3,\
			.woocommerce-shipping-fields > h3,\
			#order_review_heading,\
			#customer_login h2,\
			.woocommerce-Address-title h3,\
			.woocommerce-order-details__title,\
			.woocommerce-customer-details h2,\
			.woocommerce-columns--addresses h3,\
			.upsells.products > h2,\
			.crosssells.products > h2,\
			.related.products > h2 {\
				letter-spacing: '+ ls15 +'px;\
			}\
		';
		asheStyle( 'typography_body_spacing', css );

	});

	// Body Font Weight
	asheLivePreview( 'typography_body_weight', function( val ) {
		$( 'body, .page-404 h2, .no-result-found h1' ).css( 'font-weight', val );
	});

	// Body Italic
	asheLivePreview( 'typography_body_italic', function( val ) {
		if ( val === true ) {
			$( 'body, .page-404 h2, .no-result-found h1' ).css( 'font-style', 'italic' );
		} else {
			$( 'body, .page-404 h2, .no-result-found h1' ).css( 'font-style', 'normal' );
		}
	});

	// Body Uppercase
	asheLivePreview( 'typography_body_uppercase', function( val ) {
		if ( val === true ) {
			$( 'body, .page-404 h2, .no-result-found h1' ).css( 'text-transform', 'uppercase' );
		} else {
			$( 'body, .page-404 h2, .no-result-found h1' ).css( 'text-transform', 'none' );
		}
	});


/*
** Custom Functions
*/
	// Previewer
	function asheLivePreview( control, func ) {
		wp.customize( 'ashe_options['+ control +']', function( value ) {
			value.bind( function( val ) {
				func( val );
			} );
		} );
	}

	// convert hex color to rgba
	function asheHex2Rgba( hex, opacity ) {
		if ( typeof(hex) === 'undefined' ) {
		 return;
		}

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex ),
			rgba = 'rgba( '+ parseInt( result[1], 16 ) +', '+ parseInt( result[2], 16 ) +', '+ parseInt( result[3], 16 ) +', '+ opacity +')';

		// return converted RGB
		return rgba;
	}

	// Style Tag
	function asheStyle( id, css ) {
		if ( $( '#'+ id ).length === 0 ) {
			$('head').append('<style id="'+ id +'"></style>')
		}

		$( '#'+ id ).text( css );
	}

	// Google Fonts
	function asheLoadGoogleFont( control, selector ) {

		asheLivePreview( control, function( val ) {

			var gProtocol = 'http://'
			if ( location.protocol === 'https:' ) {
				gProtocol = 'https://'
			}

			// get font link and CSS font family value
			var font 	= val.split('+').join('_'),
				link 	= '<link id="ashe_enqueue_'+ font +'-css" rel="stylesheet" type="text/css" href="'+ gProtocol +'fonts.googleapis.com/css?family='+ val +':100,200,300,400,500,600,700,800,900">',
				family 	= val.split('+').join(' ');

			// load font if it's not already loaded
			if ( $('head').find( '#ashe_enqueue_'+ font +'-css' ).length === 0 ) {
				$('head').append( link );
			}

			selector.css( 'font-family', '"'+ family +'", "sans-serif"' );

		});

	}

	// Calculate Fonts
	function ashe_typography_calc ( number, percent, depth ) {
		number = number - number / percent;
		return number.toFixed( depth );
	}

} )( jQuery );