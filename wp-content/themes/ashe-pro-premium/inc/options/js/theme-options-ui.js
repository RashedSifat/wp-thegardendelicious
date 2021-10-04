jQuery(document).ready(function($) {
    "use strict";

/*
***************************************************************
* Demo Data Import
***************************************************************
*/

    $('.royal-import').on('click', function() {

        var currentBTN = $(this);

        if ( ! confirm('Are you sure you want to Import Demo Content?\n\nIMPORTANT!\nPlease disable all 3rd party plugins before importing demo content.\n\nRECOMENDED!\nMake this action on a fresh installation of Wordpress, otherwise Demo Content will be added to your current website content.') ) {
            return;
        }

        if ( $('.import-message').length === 0 ) {
            $(this).after('<br><br><div class="updated import-message"></div>');
        }

        $('.import-message').html('<p><span class="dashicons dashicons-update rf-spin"></span>&nbsp;&nbsp;Importing Demo Content... Please be patient while content is being imported! It may take several minutes.</p>');
        $('.import-message').css('border-color', '#ffba00');
        currentBTN.val('Importing Demo Content ...');
        $(window).scrollTop(0);

        var data = {
            action: 'royal_import'
        };

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'royal_import'
            },
            success: function(data, textStatus, XMLHttpRequest){
                $('.import-message').html('<p><span class="dashicons dashicons-yes"></span>&nbsp;&nbsp;Import Was Sucessfull, Have Fun!</p>');
                $('.import-message').css('border-color', '#7ad03a');
                currentBTN.val('Demo Content was Imported!');
                $(window).scrollTop(0);
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                setTimeout(function(){
                    $('.import-message').html('<p><span class="dashicons dashicons-yes"></span>&nbsp;&nbsp;Import Was Sucessfull, Have Fun!</p>');
                    $('.import-message').css('border-color', '#7ad03a');
                    currentBTN.val('Import Demo Content');
                    $(window).scrollTop(0);                    
                }, 15000);
            }
        });

    });


/*
** Theme Style Activation =====
*/

    var styleSelect = $( 'select#ashe_active_style' );

    $('.ashe-style-activate[data-style="'+ styleSelect.val() +'"]').closest('.column-wdith-4').find('.active-style').show();

    $( '.ashe-style-activate' ).on( 'click', function() {

        var currentStyle = $(this).attr( 'data-style' );

        if ( $(this).hasClass( 'disabled' ) ) {
            alert('This Style is already active!')
            return;
        }

        if ( ! confirm( 'Are you sure you want to activate this style?\n\nWARNING!\nAll the changes made in the Theme Customizer will be lost and overwritten by this Style. Please note, that this will only change settings in the Theme Customizer and will NOT affect your website content (pages, posts, menus, media, widgets, etc..).\n\nNOTE!\nIf you are activating this style on the fresh installation of WordPress (i.e. you have no content) it\'s recommended to import the Demo Content.') ) {
            return;
        }

        styleSelect.val( currentStyle );

        var data = {
            action: 'ashe_style_activation',
            ashe_active_style: currentStyle
        };

        // run ajax callback
        $.post(ajaxurl, data, function(response) {

            // reset defaults
            $( '.column-wdith-4' ).find('.active-style').hide();

            // activate
            $( '.ashe-style-activate[data-style='+ currentStyle +']' ).closest('.column-wdith-4').find('.active-style').show();
        });

    });


}); // end dom ready