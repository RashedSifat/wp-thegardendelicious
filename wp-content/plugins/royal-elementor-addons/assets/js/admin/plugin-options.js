jQuery(document).ready(function( $ ) {
	"use strict";

	/*
	** Elements Toggle -------------------------
	*/
	$('.wpr-elements-toggle').find('input').on( 'change', function() {
		if ( $(this).is(':checked') ) {
			$('.wpr-element').find('input').prop( 'checked', true );
		} else {
			$('.wpr-element').find('input').prop( 'checked', false );
		}
	});


	// Condition Selects
	var globalS  = '.global-condition-select',
		archiveS = '.archives-condition-select',
		singleS  = '.singles-condition-select',
		inputIDs = '.condition-input-ids';

	// Condition Popup
	var conditionPupup = $( '.wpr-condition-popup-wrap' );

	// Current Tab
	var currentTab = $('.nav-tab-active').attr( 'data-title' );
		currentTab = currentTab.trim().toLowerCase();


	/*
	** Get Active Filter -------------------------
	*/
	function getActiveFilter() {
		var type = currentTab.replace( /\W+/g, '-' ).toLowerCase();

		if ( $('.template-filters').length > 0 ) {
			type = $('.template-filters .active-filter').last().attr('data-class');
			type = type.substring( 0, type.length - 1);
		}

		return type;
	}

	/*
	** Render User Template -------------------------
	*/
	function renderUserTemplate( type, title, slug, id ) {
		var html = '';

		html += '<div class="wpr-'+ type +' template-grid-item">';
			html += '<div class="wpr-screenshot">';
				html += '<img src="https://wp-royal.com/test/elementor/images/custom.png">';
			html += '</div>';
			html += '<footer>';
				html += '<div class="wpr-title">'+ title +'</div>';
				html += '<div class="wpr-action-buttons">';
					html += '<span class="button wpr-activate" data-slug="'+ slug +'">Activate</span>';
					html += '<a href="post.php?post='+ id +'&action=elementor" class="wpr-edit button">Edit</a>';
					html += '<span class="wpr-reset button" data-slug="'+ slug +'">Delete</span>';
				html += '</div>';
			html += '</footer>';
		html += '</div>';

		// Render
		$( '.template-grid-item.wpr-'+ getActiveFilter() ).first().before( html );

		// Run Functions
		activateTemplate();
		resetTemplate();
	}

	/*
	** Create User Template -------------------------
	*/
	function craeteUserTemplate() {
		// Get Template Library
		var library = 'my-templates' === getActiveFilter() ? 'elementor_library' : 'wpr_templates';

		// Get Template Title
		var title = $('.user-template-title').val();

		// Get Template Slug
		var slug = 'user-'+ getActiveFilter() +'-'+ title.replace( /\W+/g, '-' ).toLowerCase();

		if ( 'elementor_library' === library ) {
			slug = getActiveFilter() +'-'+ title.replace( /\W+/g, '-' ).toLowerCase();
		}

		// AJAX Data
		var data = {
			action: 'wpr_create_template',
			user_template_library: library,
			user_template_title: title,
			user_template_slug: slug,
			user_template_type: getActiveFilter(),
		};

		// Create Template
		$.post(ajaxurl, data, function(response) {
			// Close Popup
			$('.user-template-popup-wrap').fadeOut();

			// Open Conditions
			setTimeout(function() {
				// Get Template ID
				var id = response.substring( 0, response.length - 1 );

				// Redirect User to Editor
				if ( 'my-templates' === currentTab.replace( /\W+/g, '-' ).toLowerCase() ) {
					window.location.href = 'post.php?post='+ id +'&action=elementor';
					return;
				}

				// Set Template Slug & ID
				$( '.save-conditions' ).attr( 'data-slug', slug ).attr( 'data-id', id );

				// Render Template
				renderUserTemplate( getActiveFilter(), $('.user-template-title').val(), slug, id );

				// Open Popup
				openConditionsPopup( slug );
				conditionPupup.addClass( 'editor-redirect' );
			}, 500);
		});
	}

	// Open Popup
	$('.wpr-user-template').on( 'click', function() {
		$('.user-template-title').val('');
		$('.user-template-popup-wrap').fadeIn();
	});

	// Close Popup
	$('.user-template-popup').find('.close-popup').on( 'click', function() {
		$('.user-template-popup-wrap').fadeOut();
	});

	// Create - Click
	$('.create-template').on( 'click', function() {
		craeteUserTemplate();
	});

	// Create - Enter Key
	$('.user-template-title').keypress(function(e) {
		if ( e.which == 13 ) {
			e.preventDefault();
			craeteUserTemplate();
		}
	});


	/*
	** Import Template -------------------------
	*/
	function importTemplate() {
		$( '.wpr-import' ).on( 'click', function() {
			// Buttons
			var importButton = $(this),
				editButton 	 = importButton.parent().find('.wpr-edit'),
				resetButton  = importButton.parent().find('.wpr-reset');

			$('.wrap').children('h1').text('Importing Template, Please be patient...');	
			
			// AJAX Data
			var data = {
				action: 'wpr_import_template',
				wpr_template: $(this).attr('data-slug'),
			};

			// Update via AJAX
			$.post(ajaxurl, data, function(response) {
				$('.wrap').children('h1').text('Howdy Nick! Template has been successfully imported :)');

				// Change Buttons
				importButton.removeClass('wpr-import').addClass('wpr-activate').text('Activate').unbind('click');
				editButton.removeClass('hidden');
				resetButton.removeClass('hidden');

				// Run Activator
				activateTemplate();

				// Edit Template Link
				response = response.split(';');
				editButton.attr( 'href', 'post.php?post='+ response[30].replace('i:', '') +'&action=elementor' );
			});		
		});		
	}

	importTemplate();

	/*
	** Reset Template -------------------------
	*/
	function resetTemplate() {
		$( '.wpr-reset' ).on( 'click', function() {
			// Buttons
			var resetButton  = $(this),
				importButton = resetButton.parent().find('.wpr-activate'),
				editButton 	 = resetButton.parent().find('.wpr-edit');

			// Get Template Library
			var library = 'my-templates' === getActiveFilter() ? 'elementor_library' : 'wpr_templates';

			// Get Template Slug
			var slug = resetButton.attr('data-slug');

			// AJAX Data
			var data = {
				action: 'wpr_reset_template',
				template_slug: slug,
				template_library: library,
			};

			// Update via AJAX
			$.post(ajaxurl, data, function(response) {
				// Change Buttons
				importButton.removeClass('wpr-activate').addClass('wpr-import').text('Import').unbind('click');
				editButton.addClass( 'hidden' );
				resetButton.addClass( 'hidden' );

				// Run Importer
				importTemplate();

				if ( slug.indexOf( 'user-' ) === 0 || resetButton.closest('ul').hasClass('wpr-my-templates-list') ) {
					resetButton.closest('.template-grid-item').remove();
					resetButton.closest('li').remove();
				}
			});
		});
	}

	resetTemplate();

	/*
	** Condition Popup -------------------------
	*/
	// Open Popup
	function activateTemplate() {
		$( '.wpr-activate' ).on( 'click', function() {
			var template = $(this).attr('data-slug');

			// Set Template Slug
			$( '.save-conditions' ).attr( 'data-slug', template );

			// Open Popup
			openConditionsPopup( template );
		});		
	}

	activateTemplate();

	// Close Popup
	conditionPupup.find('.close-popup').on( 'click', function() {
		conditionPupup.fadeOut();
	});


	/*
	** Popup: Clone Conditions -------------------------
	*/
	function popupCloneConditions() {
		// Reset
		$('.delete-conditions, .add-conditions').css('display', 'inline-block');

		// Clone
		$('.wpr-conditions-wrap').append( '<div class="wpr-conditions">'+ $('.wpr-conditions-sample').html() +'</div>' );

		// Add Tab Class
		$('.wpr-conditions').removeClass( 'wpr-tab-'+ currentTab ).addClass( 'wpr-tab-'+ currentTab );
		var clone = $('.wpr-conditions').last();

		// Reset Extra
		clone.find('select').not(':first-child').hide();

		// Entrance Animation
		clone.hide().fadeIn();

		// Hide Extra Options
		var currentFilter = $('.template-filters .active-filter').attr('data-class');

		if ( 'blog-posts' === currentFilter || 'custom-posts' === currentFilter ) {
			clone.find('.singles-condition-select').children(':nth-child(1),:nth-child(2),:nth-child(3)').remove();
			clone.find('.condition-input-ids').val('all').show();
		} else if ( 'woocommerce-products' === currentFilter ) {
			clone.find('.singles-condition-select').children().filter(function() {
				return 'product' !== $(this).val()
			}).remove();
			clone.find('.condition-input-ids').val('all').show();
		} else if ( '404-pages' === currentFilter ) {
			clone.find('.singles-condition-select').children().filter(function() {
				return 'page_404' !== $(this).val()
			}).remove();
			$('.delete-conditions, .add-conditions').hide();
		} else if ( 'blog-archives' === currentFilter || 'custom-archives' === currentFilter ) {
			clone.find('.archives-condition-select').children().filter(function() {
				return 'products' == $(this).val() || 'product_cat' == $(this).val() || 'product_tag' == $(this).val();
			}).remove();
		} else if ( 'woocommerce-archives' === currentFilter ) {
			clone.find('.archives-condition-select').children().filter(function() {
				return 'products' !== $(this).val() && 'product_cat' !== $(this).val() && 'product_tag' !== $(this).val();
			}).remove();
		}
	}

	/*
	** Popup: Add Conditions -------------------------
	*/
	function popupAddConditions() {
		$( '.add-conditions' ).on( 'click', function() {
			// Clone
			popupCloneConditions();

			// Reset
			$('.wpr-conditions').last().find('input').hide();//tmp -maybe remove

			// Run Functions
			popupDeleteConditions();
			popupMainConditionSelect();
			popupSubConditionSelect();
		});
	}

	popupAddConditions();

	/*
	** Popup: Set Conditions -------------------------
	*/
	function popupSetConditions( template ) {
		var conditions = $( '#wpr_'+ currentTab +'_conditions' ).val();
			conditions = '' !== conditions ? JSON.parse(conditions) : {};

		// Reset
		$('.wpr-conditions').remove();

		// Setup Conditions
		if ( conditions[template] != undefined && conditions[template].length > 0 ) {
			// Clone
			for (var i = 0; i < conditions[template].length; i++) {
				popupCloneConditions();
				$( '.wpr-conditions' ).find('select').hide();
			}

			// Set
			if ( $('.wpr-conditions').length ) {
				$('.wpr-conditions').each( function( index ) {
					var path = conditions[template][index].split( '/' );

					for (var s = 0; s < path.length; s++) {
						if ( s === 0 ) {
							$(this).find(globalS).val(path[s]).trigger('change');
							$(this).find('.'+ path[s] +'s-condition-select').show();
						} else if ( s === 1 ) {
							$(this).find('.'+ path[s-1] +'s-condition-select').val(path[s]).trigger('change');
						} else if ( s === 2 ) {
							$(this).find(inputIDs).val(path[s]).trigger('keyup').show();
						}
					}
				});
			}
		} else { // Set Default
			popupCloneConditions();
			$( '.wpr-conditions' ).find('select').hide();
		}
	}


	/*
	** Popup: Open -------------------------
	*/
	function openConditionsPopup( template ) {
		
		// Set Conditions
		popupSetConditions(template);
		popupMainConditionSelect();
		popupSubConditionSelect();
		popupDeleteConditions();

		// Conditions Wrap
		var conditionsWrap = $( '.wpr-conditions' );

		// Show Conditions
		if ( 'single' === currentTab ) {
			conditionsWrap.find(singleS).show();
		} else if ( 'archive' === currentTab ) {
			conditionsWrap.find(archiveS).show();
		} else {
			conditionsWrap.find(globalS).show();
		}

		// Add Current Filter Class
		$('.wpr-conditions-wrap').addClass( $('.template-filters .active-filter').attr('data-class') );

		// Open Popup
		conditionPupup.fadeIn();
	}


	/*
	** Popup: Delete Conditions -------------------------
	*/
	function popupDeleteConditions() {
		$( '.delete-conditions' ).on( 'click', function() {
			var current = $(this).parent(),
				conditions = $( '#wpr_'+ currentTab +'_conditions' ).val();
				conditions = '' !== conditions ? JSON.parse(conditions) : {};

			// Update Conditions
			$('#wpr_'+ currentTab +'_conditions').val( JSON.stringify( removeConditions( conditions, getConditionsPath(current) ) ) );

			// Remove Conditions
			current.fadeOut( 500, function() {
				$(this).remove();
			});

		});
	}


	/*
	** Popup: Condition Selection -------------------------
	*/
	// General Condition Select
	function popupMainConditionSelect() {
		$(globalS).on( 'change', function() {
			var current = $(this).parent();

			// Reset
			current.find(archiveS).hide();
			current.find(singleS).hide();
			current.find(inputIDs).hide();

			// Show
			current.find( '.'+ $(this).val() +'s-condition-select' ).show();

		});
	}

	// Sub Condition Select
	function popupSubConditionSelect() {
		$('.archives-condition-select, .singles-condition-select').on( 'change', function() {
			var current = $(this).parent(),
				selected = $( 'option:selected', this );

			// Show Custom ID input
			if ( selected.hasClass('custom-ids') || selected.hasClass('custom-type-ids') ) {
				current.find(inputIDs).val('all').trigger('keyup').show();
			} else {
				current.find(inputIDs).hide();
			}
		});
	}


	/*
	** Remove Conditions -------------------------
	*/
	function removeConditions( conditions, path ) {
		var data = [];

		// Get Templates
		$('.wpr-activate').each(function() {
			data.push($(this).attr('data-slug'))
		});

		// Loop
		for ( var key in conditions ) {
			if ( conditions.hasOwnProperty(key) ) {
				// Remove Duplicate
				for (var i = 0; i < conditions[key].length; i++) {
					if ( path == conditions[key][i] ) {
						if ( 'popup' !== getActiveFilter() ) {
							conditions[key].splice(i, 1);
						}
					}
				};

				// Clear Database
				if ( data.indexOf(key) === -1 ) {
					delete conditions[key];
				}
			}
		}

		return conditions;
	}

	/*
	** Get Conditions Path -------------------------
	*/
	function getConditionsPath( current ) {
		var path = '';

		// Selects
		var global = 'none' !== current.find(globalS).css('display') ?  current.find(globalS).val() : currentTab,
			archive = current.find(archiveS).val(),
			single = current.find(singleS).val(),
			customIds = current.find(inputIDs);

		if ( 'archive' === global ) {
			if ( 'none' !== customIds.css('display') ) {
				path = global +'/'+ archive +'/'+ customIds.val();
			} else {
				path = global +'/'+ archive;
			}
		} else if ( 'single' === global ) {
			if ( 'none' !== customIds.css('display') ) {
				path = global +'/'+ single +'/'+ customIds.val();
			} else {
				path = global +'/'+ single;
			}
		} else {
			path = 'global';
		}

		return path;
	}


	/*
	** Get Conditions -------------------------
	*/
	function getConditions( template, conditions ) {
		// Conditions
		conditions = ('' === conditions || '[]' === conditions) ? {} : JSON.parse(conditions);
		conditions[template] = [];

		$('.wpr-conditions').each( function() {
			var path = getConditionsPath( $(this) );

			// Remove Duplicates
			conditions = removeConditions( conditions, path );
		
			// Add New Values
			conditions[template].push( path );
		});

		return conditions;
	}


	/*
	** Save Conditions -------------------------
	*/
	function saveConditions() {
		$( '.save-conditions' ).on( 'click', function() {
			// Current Template
			var template = $(this).attr('data-slug'),
				TemplateID = $(this).attr('data-id');

			// Get Conditions
			var conditions = getConditions( template, $( '#wpr_'+ currentTab +'_conditions' ).val() );

			// Set Conditions
			$('#wpr_'+ currentTab +'_conditions').val( JSON.stringify(conditions) );

			// AJAX Data
			var data = {
				action: 'wpr_save_template_conditions'
			};
			data['wpr_'+ currentTab +'_conditions'] = JSON.stringify(conditions);

			// Save Conditions
			$.post(ajaxurl, data, function(response) {
				// Close Popup
				conditionPupup.fadeOut();

				// Redirect User to Editor
				if ( conditionPupup.hasClass('editor-redirect') ) {
					window.location.href = 'post.php?post='+ $('.save-conditions').attr('data-id') +'&action=elementor';
				}
			});
		});		
	}

	saveConditions();


	/*
	** Filters -------------------------
	*/
	$( '.template-filters ul li span' ).on( 'click', function() {
		var filter = $(this).parent();

		// Deny
		if ( 'back' === filter.data('role') ) return;

		// Reset
		filter.parent().find('li').removeClass('active-filter');
		$(this).closest('.templates-grid').find('.column-3-wrap').hide();

		// Active Class
		filter.addClass('active-filter');
		$(this).closest('.templates-grid').find('.column-3-wrap.'+ filter.data('class')).fadeIn();
	});

	// Sub Filters
	$( '.template-filters ul li span' ).on( 'click', function() {
		var filter = $(this).parent(),
			role   = filter.data('role');

		if ( 'parent' === role ) {
			filter.siblings().hide();
			filter.children('span').hide();
			filter.find('.sub-filters').show();
		} else if ( 'back' === role ) {
			filter.closest('ul').parent().siblings().show();
			filter.closest('ul').parent().children('span').show();
			filter.closest('ul').parent().find('.sub-filters').hide();
		}
	});


	/*
	** Settings Tab -------------------------
	*/

	// Lightbox Settings
	jQuery(document).ready(function($){
		$('#wpr_lb_bg_color').wpColorPicker();
		$('#wpr_lb_toolbar_color').wpColorPicker();
		$('#wpr_lb_caption_color').wpColorPicker();
		$('#wpr_lb_gallery_color').wpColorPicker();
		$('#wpr_lb_pb_color').wpColorPicker();
		$('#wpr_lb_ui_color').wpColorPicker();
		$('#wpr_lb_ui_hr_color').wpColorPicker();
		$('#wpr_lb_text_color').wpColorPicker();

		// Fix Color Picker
		if ( $('.wpr-settings').length ) {
			$('.wpr-settings').find('.wp-color-result-text').text('Select Color');
			$('.wpr-settings').find('.wp-picker-clear').text('Clear');
		}
	});


//tmp
// $('.nav-tab-wrapper').after( '<p>'+ $('.nav-tab-wrapper').next('input').val() +'</p>' );

//tmp
$('.resett').on( 'click', function(e) {
	// AJAX Data
	var data = {
		action: 'wpr_save_template_conditions',
	};

	data['wpr_'+ currentTab +'_conditions'] = '';

	// Update via AJAX
	$.post(ajaxurl, data, function(response) {});
});

}); // end dom ready