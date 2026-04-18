( function( $ ) {
	wp.customize.section( 'bwp-menu_mobile', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				$('[data-device]').removeClass('active');
				$('.wp-full-overlay').addClass('preview-mobile');
				$('[data-device = "mobile"]').addClass('active');
				$('.preview-mobile .wp-full-overlay-main').css({"margin": "auto 0 auto -187.5px", "width": "375px", "height": "80vh"});
			}
		} );
	} );
	wp.customize.section( 'bwp-menu_mobile', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( ! isExpanded ) {
				$('[data-device]').removeClass('active');
				$('[data-device = "desktop"]').addClass('active');
				$(".preview-mobile .wp-full-overlay-main").removeAttr("style");
				$('.wp-full-overlay').removeClass('preview-mobile');
			}
		} );
	} );
	wp.customize.section( 'bwp-icon_on_hover', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				wp.customize.previewer.previewUrl.set(shopUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-icon_on_hover', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( !isExpanded ) {
				wp.customize.previewer.previewUrl.set(homeUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-qv_button', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				wp.customize.previewer.previewUrl.set(shopUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-qv_button', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( !isExpanded ) {
				wp.customize.previewer.previewUrl.set(homeUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-icon_wishlist', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				wp.customize.previewer.previewUrl.set(shopUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-icon_wishlist', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( !isExpanded ) {
				wp.customize.previewer.previewUrl.set(homeUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-atc_button', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				wp.customize.previewer.previewUrl.set(shopUrl);
			}
		} );
	} );
	wp.customize.section( 'bwp-atc_button', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( !isExpanded ) {
				wp.customize.previewer.previewUrl.set(homeUrl);
			}
		} );
	} );
	wp.customize.panel( 'main_single_section', function( panel ) {
		panel.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				wp.customize.previewer.previewUrl.set(productUrl);
			}
		} );
	} );
	wp.customize.panel( 'main_single_section', function( panel ) {
		panel.expanded.bind( function( isExpanded ) {
			if ( !isExpanded ) {
				wp.customize.previewer.previewUrl.set(homeUrl);
			}
		} );
	} );
	wp.customize.bind('ready', function() {
		_click_icon_add();
		_click_icon_show();
		_delete_drop_content();
		$('.bwp-input-color').wpColorPicker({
			change: function(event, ui) {
				var colorValue = $(this).wpColorPicker('color');
				$(this).val( colorValue ).trigger('change');
			}
		});
		$(".wp-picker-clear").on( "click", function() {
			var $parent = $(this).closest('.drag-option');
			$('.bwp-input-color',$parent).val('').trigger('change');
		});
		$('.bwp-drag-drop-container').sortable({
			placeholder: "bwp-state-highlight",
			update: function(event, ui) {
				var items = $(this).find('.bwp-drag-drop-items');
				var values = [];
				items.each(function() {
					values.push( $(this).data('value') );
				});
				$(this).parent().find('input.bwp-drag-drop-input').val( values.join('-') ).trigger('change');
			}
		});
		$( ".bwp-drag-drop-container" ).disableSelection();
		$(".add-drop-content").on( "click", function(e) {
			e.preventDefault();
			var $parent = $(this).closest('.bwp-drop-control');
			if( $(this).hasClass('active') ){
				$('.add-drop-content-container',$parent).removeClass('active');
				$(this).removeClass('active');
			}else{
				$('.add-drop-content-container',$parent).addClass('active');
				$(this).addClass('active');
			}
		});
		$(window).on("click.Bst", function(event){
			if ( $('.add-drop-content-container').has(event.target).length == 0 && !$('.add-drop-content-container').is(event.target) && $('.add-drop-content').has(event.target).length == 0 && !$('.add-drop-content').is(event.target) ) {
				if( $('.add-drop-content-container').hasClass('active') ){
					$('.add-drop-content-container').removeClass('active');
					$(".add-drop-content").removeClass('active');
				}
			}
		});
		$('.bwp-select-image').click(function() {
			var $parent = $(this).closest('.drag-option')
			wp.media.editor.send.attachment = function(props, attachment) {
				$('.bwp-input-image',$parent).val(attachment.url).trigger('change');
				$('.bwp-select-image',$parent).addClass('have-image');
				$('.bwp-remove-image',$parent).removeClass('hidden');
				$('.container-image img',$parent).remove();
				$('.container-image',$parent).append('<img src='+attachment.url+' />');
			};
			wp.media.editor.open();
			return false;
		});
		$('.bwp-remove-image').click(function() {
			var $parent = $(this).closest('.bwp-drag-drop-content .drag-option')
			$('.bwp-input-image',$parent).val('').trigger('change');
			$('.bwp-select-image',$parent).removeClass('have-image');
			$('.bwp-remove-image',$parent).addClass('hidden');
			$('.container-image img',$parent).remove();
		});
		function _click_icon_show(){
			$(".icon-show").on( "click", function() {
				var $parent = $(this).closest('.bwp-drop-control');
				var $parent2 = $(this).closest('.bwp-drag-drop-items');
				var $position = $(this).closest('.bwp-drop-2');
				var $value = $parent2.data('value');
				if( $('.bwp-drag-drop-item',$parent2).hasClass('active') ){
					$('.bwp-drag-drop-content[data-value='+$value+']',$parent).slideUp();
					$('.bwp-drag-drop-item',$parent2).removeClass('active');
					return ;
				}
				$('.bwp-drag-drop-content',$parent).slideUp();
				$('.bwp-drag-drop-item',$parent).removeClass('active');
				$('.bwp-drag-drop-content[data-value='+$value+']',$parent).slideDown();
				$('.bwp-drag-drop-item',$parent2).addClass('active');
				var $top = $('.bwp-drag-drop-item',$parent2).position().top + 45;
				$('.bwp-drag-dropdown_content',$position).addClass('active').css('top',$top+'px');
			});
		}
		function _click_icon_show2($element){
			$(".icon-show").on( "click", function() {
				var $parent = $(this).closest('.bwp-drop-control');
				var $parent2 = $(this).closest('.bwp-drag-drop-items');
				var $position = $(this).closest('.bwp-drop-2');
				var $value = $parent2.data('value');
				if( $element == $value ){
					if( $('.bwp-drag-drop-item',$parent2).hasClass('active') ){
						$('.bwp-drag-drop-content[data-value='+$value+']',$parent).slideUp();
						$('.bwp-drag-drop-item',$parent2).removeClass('active');
						return ;
					}
					$('.bwp-drag-drop-content',$parent).slideUp();
					$('.bwp-drag-drop-item',$parent).removeClass('active');
					$('.bwp-drag-drop-content[data-value='+$value+']',$parent).slideDown();
					$('.bwp-drag-drop-item',$parent2).addClass('active');
					var $top = $('.bwp-drag-drop-item',$parent2).position().top + 45;
					$('.bwp-drag-dropdown_content',$position).addClass('active').css('top',$top+'px');
				}
			});
		}
		function _delete_drop_content($element){
			$(".delete-drop-content").on( "click", function(e) {
				e.preventDefault();
				var $parent2 = $(this).closest('.bwp-drop-control');
				var $parent = $(this).closest('.bwp-drag-drop-content');
				var $value = $parent.data('value');
				$parent.slideUp();
				$('.bwp-drag-drop-items[data-value='+$value+']',$parent2).remove();
				var values = [];
				$('.bwp-drag-drop-items',$parent2).each(function() {
					values.push( $(this).data('value') );
				});
				$('input.bwp-drag-drop-input',$parent2).val( values.join('-') ).trigger('change');
				$('.add-drop-content-container',$parent2).append('<div class="add-drop-content-item" data-value="'+$value+'"><div class="icon-add"><i class="feather-plus"></i></div>'+$value+'</div>');
				_click_icon_add2($value);
				if( $('.bwp-drag-drop-items',$parent2).length == 0 ){
					$('.bwp-drag-drop-container',$parent2).append('<div class="bwp-drag-drop-empty"><div class="bwp-drag-drop-item">default content</div></div>');
				}
				$('.add-drop-content',$parent2).removeAttr('disabled', 'disabled').removeClass('disabled');
			});
		}
		function _click_icon_add(){
			$(".icon-add").on( "click", function(e) {
				var $parent2 = $(this).closest('.bwp-drop-control');
				var $parent = $(this).closest('.add-drop-content-item');
				var $value = $parent.data('value');
				$('.bwp-drag-drop-container',$parent2).append('<div class="bwp-drag-drop-items bwp-drag-drop-toggle ui-sortable-handle" data-value="'+$value+'"><div class="bwp-drag-drop-item">'+$value+'<div class="icon-show"><i class="feather-chevron-down"></i></div></div></div>');
				$parent.remove();
				var values = [];
				$('.bwp-drag-drop-items',$parent2).each(function() {
					values.push( $(this).data('value') );
				});
				$('input.bwp-drag-drop-input',$parent2).val( values.join('-') ).trigger('change');
				_click_icon_show2($value);
				$('.bwp-drag-drop-empty',$parent2).remove();
				if( $('.add-drop-content-item',$parent2).length == 0 ){
					$('.add-drop-content',$parent2).attr('disabled', 'disabled').addClass('disabled');
				}
			});
		}
		function _click_icon_add2($element){
			$(".icon-add").on( "click", function(e) {
				var $parent2 = $(this).closest('.bwp-drop-control');
				var $parent = $(this).closest('.add-drop-content-item');
				var $value = $parent.data('value');
				if( $element == $value ){
					$('.bwp-drag-drop-container',$parent2).append('<div class="bwp-drag-drop-items bwp-drag-drop-toggle ui-sortable-handle" data-value="'+$value+'"><div class="bwp-drag-drop-item">'+$value+'<div class="icon-show"><i class="feather-chevron-down"></i></div></div></div>');
					$parent.remove();
					var values = [];
					$('.bwp-drag-drop-items',$parent2).each(function() {
						values.push( $(this).data('value') );
					});
					$('input.bwp-drag-drop-input',$parent2).val( values.join('-') ).trigger('change');
					_click_icon_show2($value);
					if( $('.add-drop-content-item',$parent2).length == 0 ){
						$('.add-drop-content',$parent2).attr('disabled', 'disabled').addClass('disabled');
					}
				}
			});
		}
	} );
} )( jQuery );