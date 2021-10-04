/*
** Scripts within the customizer controls window.
*/

(function( $ ) {
	wp.customize.bind( 'ready', function() {

	/*
	** Reusable Functions
	*/
		var optPrefix = '#customize-control-ashe_options-';

		// Label
		function ashe_customizer_label( id, title ) {

			if ( id === 'custom_logo' || id === 'site_icon' || id === 'background_color' ) {
				$( '#customize-control-'+ id ).before('<li class="tab-title customize-control">'+ title +'</li>');
			} else {
				$( optPrefix + id ).before('<li class="tab-title customize-control">'+ title +'</li>');
			}
			
		}

		// Checkbox Label
		function ashe_customizer_checkbox_label( id ) {

			var id = optPrefix + id;
			$( id ).addClass('tab-title');

			// on change
			$( id ).find('input[type="checkbox"]').change(function() {
				if ( $(this).is(':checked') ) {
					$(this).closest('li').parent('ul').find('li').not( '.section-meta,.tab-title'+ id ).find('.control-lock').remove();
				} else {
					$(this).closest('li').parent('ul').find('li').not( '.section-meta,.tab-title'+ id ).append('<div class="control-lock"></div>');
				}
			});

			// on load
			if ( ! $( id ).find('input[type="checkbox"]').is(':checked') ) {
				$( id ).closest('li').parent('ul').find('li').not( '.section-meta,.tab-title'+ id ).append('<div class="control-lock"></div>');
			}

		}

		// Select
		function ashe_customizer_select( select, children, value ) {

			// on change
			$( optPrefix + select ).find('select').change(function() {
				if ( $(this).val() === value ) {
					$(children).show();
				} else {
					$(children).hide();
				}
			});

			// on load
			if ( $( optPrefix + select ).find('select').val() === value ) {
				$(children).show();
			} else {
				$(children).hide();
			}

		}

		// Checkbox
		function ashe_customizer_checkbox( checkbox, children ) {

			// on change
			$( optPrefix + checkbox ).find('input').change(function() {
				if ( $(this).is(':checked') ) {
					$(children).show();
				} else {
					$(children).hide();
				}
			});

			// on load
			if ( $( optPrefix + checkbox ).find('input').is(':checked') ) {
				$(children).show();
			} else {
				$(children).hide();
			}

		}

		// Global Select
		function ashe_customizer_global_select( option, relatedOption, children, values ) {

			// on change
			var option 	  		= optPrefix + option,
				childOptions 	= '',
				relatedOption 	= optPrefix + relatedOption;

			// Get Child Options
			$.each( children, function( index ) {
				childOptions += optPrefix + children[index] +',';
			});
			childOptions = childOptions.slice(0, -1);
				
			// on change
			$( option ).find('select').change(function() {
				if ( values.indexOf( $(this).val() ) > -1 || values.indexOf( $(relatedOption).find('select').val() ) > -1 ) {
					setTimeout(function(){
						$( childOptions ).show();
					}, 100);
				} else {
					$( childOptions ).hide();
				}
			});

			// on load 
			if ( values.indexOf( $(option).find('select').val() ) > -1 || values.indexOf( $(relatedOption).find('select').val() ) > -1 ) {
				setTimeout(function(){
					$( childOptions ).show();
				}, 100);
			} else {
				$( childOptions ).hide();
			}

		}


	/*
	** Skins
	*/

		$('#customize-control-ashe_options-general_boxed_style').find('input').change(function(){
			if ( $(this).prop( "checked" ) ) {
				$('#customize-control-background_color').find('.color-picker-hex').val('#f7f7f7').trigger('keyup');
			} else {
				$('#customize-control-background_color').find('.color-picker-hex').val('#ffffff').trigger('keyup');
			}
		});



	/*
	** Responsive
	*/
		var menuButtonText = $('#customize-control-ashe_options-responsive_mobile_icon_text');

		$('#customize-control-ashe_options-responsive_menu_icon').find('select').change(function(){
			if ( 'text' === $(this).val() ) {
				menuButtonText.show();
			} else {
				menuButtonText.hide();
			}
		});

		// On Load
		if ( 'text' === $('#customize-control-ashe_options-responsive_menu_icon').find('select').val() ) {
			menuButtonText.show();
		} else {
			menuButtonText.hide();
		}

		
	/*
	** Tabs
	*/
		// Colors
		ashe_customizer_label( 'background_color', 'Body' );
		ashe_customizer_label( 'colors_top_bar_bg', 'Top Bar' );
		ashe_customizer_label( 'colors_header_bg', 'Header' );
		ashe_customizer_label( 'colors_main_nav_bg', 'Main Navigation' );
		ashe_customizer_label( 'colors_content_bg', 'Content' );
		ashe_customizer_label( 'colors_button', 'Button' );
		ashe_customizer_label( 'colors_overlay', 'Image Overlay' );
		ashe_customizer_label( 'colors_preloader_anim', 'Preloader' );
		ashe_customizer_label( 'colors_footer_bg', 'Footer' );

		// General Layouts
		ashe_customizer_label( 'general_site_width', 'General' );
		ashe_customizer_label( 'general_home_layout', 'Page Layouts' );
		ashe_customizer_label( 'general_header_width', 'Boxed Controls' );
		ashe_customizer_label( 'general_instagram_position', 'Instagram Widget' );

		// Top Bar
		ashe_customizer_checkbox_label( 'top_bar_label' );

		// Page Header
		ashe_customizer_checkbox_label( 'header_image_label' );

		// Site Identity
		ashe_customizer_label( 'custom_logo', 'Logo Setup' );
		ashe_customizer_label( 'site_icon', 'Favicon' );

		// Main Navigation
		ashe_customizer_checkbox_label( 'main_nav_label' );
		ashe_customizer_label( 'main_nav_mini_logo', 'Mini Logo' );

		// Featured Slider
		ashe_customizer_checkbox_label( 'featured_slider_label' );

		// Featured Links
		ashe_customizer_checkbox_label( 'featured_links_label' );
		ashe_customizer_label( 'featured_links_title_1', 'Featured Link #1' );
		ashe_customizer_label( 'featured_links_title_2', 'Featured Link #2' );
		ashe_customizer_label( 'featured_links_title_3', 'Featured Link #3' );
		ashe_customizer_label( 'featured_links_title_4', 'Featured Link #4' );
		ashe_customizer_label( 'featured_links_title_5', 'Featured Link #5' );
		ashe_customizer_label( 'featured_links_title_6', 'Featured Link #6' );

		// Blog Page
		ashe_customizer_label( 'blog_page_gutter_horz', 'General' );
		ashe_customizer_label( 'blog_page_show_categories', 'Post Elements' );
		ashe_customizer_label( 'blog_page_show_facebook', 'Post Sharing' );
		ashe_customizer_label( 'blog_page_related_title', 'Related Posts' );
		ashe_customizer_label( 'blog_page_show_author_description', 'Author Page' );

		// Single Page
		ashe_customizer_label( 'single_page_show_featured_image', 'Post Elements' );
		ashe_customizer_label( 'single_page_related_title', 'Post Footer' );
		
		// Social Media
		ashe_customizer_label( 'social_media_icon_1', 'Social Icon #1' );
		ashe_customizer_label( 'social_media_icon_2', 'Social Icon #2' );
		ashe_customizer_label( 'social_media_icon_3', 'Social Icon #3' );
		ashe_customizer_label( 'social_media_icon_4', 'Social Icon #4' );
		ashe_customizer_label( 'social_media_icon_5', 'Social Icon #5' );
		ashe_customizer_label( 'social_media_icon_6', 'Social Icon #6' );
		ashe_customizer_label( 'social_media_icon_7', 'Social Icon #7' );
		ashe_customizer_label( 'social_media_icon_8', 'Social Icon #8' );

		// Typography
		ashe_customizer_label( 'typography_logo_family', 'Logo' );
		ashe_customizer_label( 'typography_nav_family', 'Menu' );
		ashe_customizer_label( 'typography_head_family', 'Headings' );
		ashe_customizer_label( 'typography_body_family', 'Body Text' );
		ashe_customizer_label( 'typography_latin_subset', 'Subsets' );

		// Preloader
		ashe_customizer_checkbox_label( 'preloader_label' );

		// Checkbox Conditional Logics
		ashe_customizer_checkbox( 'main_nav_show_sidebar', optPrefix +'main_nav_sidebar_icon' );
		ashe_customizer_checkbox( 'responsive_mini_logo', optPrefix +'responsive_mini_logo_width' );

		// Select Contditional Logics
		ashe_customizer_select( 'featured_slider_display', optPrefix +'featured_slider_category', 'category' );
		ashe_customizer_select( 'blog_page_post_description', optPrefix +'blog_page_excerpt_length,'+ optPrefix +'blog_page_grid_excerpt_length', 'excerpt' );
		ashe_customizer_select( 'header_image_bg_type', optPrefix +'header_image_video_mp4,'+ optPrefix +'header_image_video_webm', 'video' );
		ashe_customizer_select( 'header_image_bg_type', '#customize-control-header_image,'+ optPrefix +'header_image_bg_image_size,'+ optPrefix +'header_image_parallax', 'image' );

		// Contditional Global Logics
		var genGridLayouts = [
			'col2-fullwidth',
			'col2-lsidebar',
			'col2-rsidebar',
			'col2-lrsidebar',
			'col3-fullwidth',
			'col3-lsidebar',
			'col3-rsidebar',
			'col4-fullwidth'
		];
		var genGridLayoutOptions = [
			'blog_page_grid_crop_width',
			'blog_page_grid_crop_height',
			'blog_page_grid_excerpt_length'
		];
		ashe_customizer_global_select( 'general_home_layout', 'general_other_layout', genGridLayoutOptions, genGridLayouts );
		ashe_customizer_global_select( 'general_other_layout', 'general_home_layout', genGridLayoutOptions, genGridLayouts );

		var genListLayouts = [
			'list-lsidebar',
			'list-rsidebar',
			'list-lrsidebar',
			'list-fullwidth'
		];
		var genListLayoutOptions = [
			'blog_page_list_crop_width',
			'blog_page_list_crop_height',
			'blog_page_grid_excerpt_length'
		];
		ashe_customizer_global_select( 'general_home_layout', 'general_other_layout', genListLayoutOptions, genListLayouts );
		ashe_customizer_global_select( 'general_other_layout', 'general_home_layout', genListLayoutOptions, genListLayouts );

		var genOneColLayouts = [
			'col1-fullwidth',
			'col1-lsidebar',
			'col1-rsidebar',
			'col1-lrsidebar',
		];
		ashe_customizer_global_select( 'general_home_layout', 'general_other_layout', ['blog_page_excerpt_length'], genOneColLayouts );
		ashe_customizer_global_select( 'general_other_layout', 'general_home_layout', ['blog_page_excerpt_length'], genOneColLayouts );


		// Header Slider Options
		var sliderControls = optPrefix +'header_image_slider_pagination,'+ optPrefix +'header_image_slider_navigation,'+ optPrefix +'header_image_slider_autoplay';
		// on change
		$( optPrefix +'header_image_bg_type select' ).on( 'change', function() {
			if ( $(this).val() == 'slider' ) {
				$(sliderControls).show();
				$('#customize-control-header_image').show().addClass('header-slider');
			} else {
				$(sliderControls).hide();
				$('#customize-control-header_image').removeClass('header-slider');
			}
		});

		// on load
		if ( $( optPrefix +'header_image_bg_type select' ).val() == 'slider' ) {
			$(sliderControls).show();
				$('#customize-control-header_image').show().addClass('header-slider');
		} else {
			$(sliderControls).hide();
		}

		// Featured Slider Source
		var sliderRepeater = '#customize-control-featured_slider_repeater',
			sliderPostOpts = [
				optPrefix +'featured_slider_display',
				optPrefix +'featured_slider_orderby',
				optPrefix +'featured_slider_amount',
				optPrefix +'featured_slider_categories',
				optPrefix +'featured_slider_title',
				optPrefix +'featured_slider_excerpt',
				optPrefix +'featured_slider_more',
				optPrefix +'featured_slider_date',
			];
		// on change
		$( optPrefix + 'featured_slider_source select' ).change( function() {
			if ( $(this).val() !== 'custom' ) {
				$( sliderPostOpts.join(',') ).show();
				$(sliderRepeater).hide();
			} else {
				$(sliderRepeater).show();
				$( sliderPostOpts.join(',') ).hide();
			}
		});

		// on load
		if ( $( optPrefix + 'featured_slider_source select' ).val()  !== 'custom' ) {
			$( sliderPostOpts.join(',') ).show();
			$(sliderRepeater).hide();
		} else {
			$(sliderRepeater).show();
			$( sliderPostOpts.join(',') ).hide();
		}

		// Featured Slider Options
		var sliderGutter = optPrefix + 'featured_slider_gutter_horz';
		// on change
		$( optPrefix + 'featured_slider_columns input' ).change( function() {
			if ( $(this).val() === '1' ) {
				$(sliderGutter).hide();
			} else {
				$(sliderGutter).show();
			}
		});

		// on load
		if ( $( optPrefix + 'featured_slider_columns input' ).val()  === '1' ) {
			$(sliderGutter).hide();
		} else {
			$(sliderGutter).show();
		}

		// Add bottom space to tabs
		$('.tab-title').prev('li').not('.customize-section-description-container').css( 'padding-bottom', '20px' );


		// Add Hints to Options
		$( optPrefix +'blog_page_grid_crop_width label,'+ optPrefix +'blog_page_grid_crop_height label' ).after('<a href="https://www.youtube.com/watch?v=_cfEaNKIH6E" target="_blank">Watch the Video Guide.</a>');
		$( optPrefix +'blog_page_list_crop_width label,'+ optPrefix +'blog_page_list_crop_height label' ).after('<a href="https://www.youtube.com/watch?v=gEZXm7iM98Q" target="_blank">Watch the Video Guide.</a>');
		$( optPrefix +'featured_slider_crop_width label,'+ optPrefix +'featured_slider_crop_height label' ).after('<a href="https://wp-royal.com/themes/ashe/customizer/pro/featured-slider-crop-video.html" target="_blank">Watch the Video Guide.</a>');
		
	}); // wp.customize ready
})( jQuery );
