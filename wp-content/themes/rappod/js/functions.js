/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	"use strict";
	var _body    = $( 'body' ),
		_window = $( window );
	$(document).ready(function() {
		_filter_ajax_sort_count();
		_sticky_menu();
		_sticky_product();
		_sticky_nextproduct();
		_left_right_submenu();
		_search_toggle();
		_categories_menu_toggle();
		_menu_categories();
		_back_to_top();
		_toggle_categories();
		_event_single_image();
		_load_wpbingo_menu_fullscreen();
		_event_ajax_search();
		_event_circlestime();
		_event_change_variation();
		_event_banner_category();
		_event_accordion_slider();
		_tongle_menu();
		_remove_animation_tab_visua();
		_event_video_product();
		_event_lookbook();
		_come_back();
		_event_single_sticky_grid();
		_load_video_popup();
		_moreverticalMenu();
		_click_button();
		_tab_information_mobile();
		_click_add_to_cart();
		_after_add_to_cart();
		_click_atribute_image();
		_event_variable_thumb();
		_update_total_wishlist();
		_active_form_login();
		_load_event_countdown();
		_load_count_up();
		_load_360_view_product();
		_load_sale_nofication();
		_ajax_cart_header();
		_ajax_cart_page();
		_image_reveal_on_hover();		
		_load_slick_carousel($(".related .slick-carousel"));
		_load_slick_carousel($(".recent-view .slick-carousel"));
		_load_slick_carousel($(".post-related .slick-carousel"));
		_load_slick_carousel($(".upsells .slick-carousel"));
		_load_slick_carousel($(".cross_sell .slick-carousel"));
		_load_slick_carousel($(".woocommerce-product-subcategories.slick-carousel"));
		_load_slick_carousel($(".bestseller-product .slick-carousel"));
		$(".gallery-slider .slick-carousel").each(function(){
			_load_slick_carousel($(this));
		});		
		$(".bwp-single-product .slick-carousel").each(function(){
			_load_slick_carousel($(this));
			$('.video-additional iframe').css("width",$(".image-additional #image").width());
			$('.video-additional iframe').css("height",$(".image-additional #image").height());
			$('.content-thumbnail-scroll .img-thumbnail-video img').css("width",$(".content-thumbnail-scroll .img-thumbnail-scroll img").width());
			$('.content-thumbnail-scroll .img-thumbnail-video img').css("height",$(".content-thumbnail-scroll .img-thumbnail-scroll img").height());
		});
		_click_quickview_button();
		_event_quick_buy();
	});
	$( document.body ).on( 'updated_cart_totals', function(){
		_ajax_cart_page();
	});
	_window.resize(function() {
		_load_canvas_menu();
		_left_right_submenu();
		_tongle_menu();
		_moreverticalMenu();
	});

	function _image_reveal_on_hover() {
		let imageReveal = $('.image-reveal');
		let hoverReveal = $('.hover-reveal .link');
		$(hoverReveal).on('mousemove', function(e) {
			let x = e.pageX - $(this).offset().left;
    		let y = e.pageY - $(this).offset().top;
			imageReveal.css({'transform': `translate3d(${x}px, ${y}px, 0)`,'opacity': 1});
  		});
		$(hoverReveal).on('mouseleave', function(e) {
			imageReveal.css('opacity', 0);
		});
	}

	/* Show/hide NewsLetter Popup */
	_window.load(function() {
		$("#loader").addClass("pre-loading");
		_body.addClass('loaded');		
	});
	function _load_sale_nofication(){
		if($(".sale-nofication").length){
			var $element 		= $('.sale-nofication');
			var time_start 		= 0;
			var start		 	= $element.data('start');
			time_start = start*1000;
			$(".close-notification",$element).on( "click", function() {
				if($element.hasClass('active')){
					$element.removeClass('active');
				}
			});
			setTimeout(function(){
				_sale_nofication_start(); 
			},time_start);
		}
	}
	/* Come Back */
	function _come_back(){
		if( $('.come-back-alert').length > 0 ){
			var title = $(document).attr("title");
			var change_out2,change_out1;
			var content1 = $('.come-back-alert').data('content1');
			var content2 = $('.come-back-alert').data('content2');
			document.addEventListener('visibilitychange', function (event) {
				if (document.hidden) {
					change_out2 = function () {
						$(document).attr("title", content2);
						setTimeout(function() { 
							change_out1();
						}, 500);
					};
					change_out1 = function () {
						$(document).attr("title", content1);
						setTimeout(function() { 
							change_out2();
						}, 500);
					};
					change_out1();
				} else {
					change_out1 = function () {};
					change_out2 = function () {};
					$(document).attr("title", title);
				}
			});
		}
	}

	function _sale_nofication_start(){
		if($(".sale-nofication").length){
			var $element 		= $('.sale-nofication');
			var stay 			= $element.data('stay');
			var user_purchased 	= $element.data('users');
			var list_time 		= $element.data('ranges');
			var list_products 		= $element.data('products');
			var products 		= list_products.split(',');
			var purchased 	= user_purchased.split(',');
			var time 			= list_time.split(',');
			var time_stay = stay*1000;
			var id_product = products[Math.floor(Math.random()*products.length)];
			var item_purchased = purchased[Math.floor(Math.random()*purchased.length)];
			var item_time = time[Math.floor(Math.random()*time.length)];
			$.ajax({
				url: rappod_ajax.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action : "rappod_time_nofication_ajax",
					id_product : id_product,
					security : rappod_ajax.ajax_nonce
				},
				success: function(results) {
					if (results){
						$("#image",$element).attr("src",results[0].image);
						$("a",$element).attr("href",results[0].href);
						$('.product-title a',$element).text(results[0].title);
						$('.notification-purchased .name',$element).text(item_purchased);
						$('.time-suggest',$element).text(item_time);
						$element.addClass('active');
					}
				}
			});
			$(".scroll-notification",$element).css("animation-duration", stay - 1.5+"s");
			setTimeout(function(){
				$element.removeClass('active');
				_load_sale_nofication();
			}, time_stay );
		}
	}	
	function _update_total_wishlist(){	
		$(document).on( 'woosw_change_count', function(event, count){
			var counter = $('.count-wishlist');
			counter.html( count );
		})
	}	
	function _tongle_menu(){
		var wd_width = _window.width();
		var $menu_sidebar = $("#menu-main-menu",".home-sidebar");
		//Menu Left
		var $menu_left = $("#menu-main-menu",".header-v3");
		appendGrower($menu_left);
		//Menu Left Header 8
		var $menu_left_2 = $("#menu-main-menu",".header-v8");
		appendGrower($menu_left_2);
		//Menu Left
		if(wd_width > 991)
		{
			offtogglemegamenu($menu_sidebar);
		}else{
			appendGrower($menu_sidebar);
		}	
	}	
	function _filter_ajax_sort_count(){
		if(!$('.bwp-filter-ajax').length){
			$( ".sort-count" ).on('change', function(){
				var value = $(this).val();
				_setGetParameter('product_count',value);
			});
		}		
	}
	function _toggle_categories(){
		var $root = $(".widget_product_categories");
		if($(".current-cat-parent",$root).length > 0){
			var $current_parent = $(".current-cat-parent",$root);
			$current_parent.addClass('open');
			$("> .children",$current_parent).stop().slideToggle(400);
		}
		var $current = $(".current-cat",$root);
		$current.addClass('open');
		$("> .children",$current).stop().slideToggle(400);
		$( '.cat-parent',$root ).each(function(index) {
				var $element = $(this);
				if($(".children",$element).length > 0){
				$element.prepend('<span class="arrow"></span>');
				$(".arrow",$element).on( 'click', function(e) {
					e.preventDefault();
					$element.toggleClass('open').find( '> .children' ).stop().slideToggle(400);
				});
			}
		});
	}	
	function _back_to_top(){
		_window.scroll(function() {
			if ($(this).scrollTop() > 800) {
				$('.back-top').addClass('button-show');
			}else {
				$('.back-top').removeClass('button-show');
			}
		});
		$('.back-top').on( "click", function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});			
	}
	
	function _categories_menu_toggle(){
		if($('.categories-menu .btn-categories').length){
			$('.categories-menu .btn-categories').on( "click", function(){
				$('.wrapper-categories').toggleClass('bwp-active');
			});
		}
	}
	function _menu_categories(){
		$('.main-menu-category .menu-lines').on( "click", function() {
			if($('.main-category-menu').hasClass('active'))
				$('.main-category-menu').removeClass('active');
			else
				$('.main-category-menu').addClass('active');
				$('.close-menu-category').addClass('active');
			return false;
		});
		$('.close-menu-category').on( "click", function() {
			$('.main-category-menu').removeClass('active');
			$(this).removeClass('active');
		});
		$('.main-category-menu .close-menu').on( "click", function() {
			$('.main-category-menu').removeClass('active');
			$('.close-menu-category').removeClass('active');
		});
	}
	function _search_toggle() {
		var $searchToggle = $('.search-toggle');
		var $searchOverlay = $('.search-overlay');
		var $closeSearch = $('.close-search');
		var $closeOverlay = $('.close-search-overlay');
		var $ajaxSearch = $('form.ajax-search');
		var $resultSearchProductsContent = $('.result-search-products-content');
	  
		$searchToggle.on('click.break', function() {
		  $searchOverlay.toggleClass('search-visible');
		});
	  
		$([ $closeSearch[0], $closeOverlay[0] ]).on('click', function() {
			$searchOverlay.toggleClass('search-visible');
		});
	  
		$ajaxSearch.on('click', '.close-search', function() {
		  $resultSearchProductsContent.hide();
		  $('.result-search-products', $resultSearchProductsContent).hide();
		});
		$( '.close-search-popup','form.ajax-search' ).on( 'click', function( event ) {
			var $parent = $(this).closest('.result-search-products-content');
			$parent.css("display", "none");
			$('.result-search-products',$parent).css("display", "none");
		} );
	}
	  
	
	function _show_homepage_sidebar(){
		var $homepage_sidebar = $('.header-sideward-left-menu');
		$('.btn-sideward-left').on( "click", function() {
			if($homepage_sidebar.hasClass('active')){
				$homepage_sidebar.removeClass('active');
			}
			else{
				$homepage_sidebar.addClass('active');
			}
			return false;
		});			
	}

	_show_homepage_sidebar();
	
	function _wpbingo_menu_left(){
		//Navigation Right
		var $header_wpbingo_menu_left = $('.header-wpbingo-menu-left');
		$('.wpbingo-menu-left .menu-title').on( "click", function() {
			if($header_wpbingo_menu_left.hasClass('active')){
				$header_wpbingo_menu_left.removeClass('active');
			}	
			else{
				$header_wpbingo_menu_left.addClass('active');
			}	
			return false;
		});			
	}
	_wpbingo_menu_left();
	function _show_sticky_sidebar(){
		var $sticky_sidebar = $('.sticky-sidebar');
		$('.btn-sticky').on( "click", function() {
			if($sticky_sidebar.hasClass('active')){
				$sticky_sidebar.removeClass('active');
			}	
			else{
				$sticky_sidebar.addClass('active');
			}	
			return false;
		});			
	}
	_show_sticky_sidebar();	
	
	function _rappod_accordion_menu(){	
		var $elements = $(".categories-vertical-menu.accordion");
		$('.widget-title',$elements).on( "click", function() {
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('.bwp-vertical-navigation >div',$elements).slideUp();	
			}	
			else{
				$(this).addClass('active');
				$('.bwp-vertical-navigation >div',$elements).slideDown();		
			}
		});		
	}
	
	_rappod_accordion_menu();
	
	function _headercategories(){
		//Navigation right
		var $menu_categories = $('.menu-categories');
		$('.navigation-categories').on( "click", function() {
			if($menu_categories.hasClass('active')){
				$menu_categories.removeClass('active');
			}	
			else{
				$menu_categories.addClass('active');
			}	
			return false;
		});		
		$('.rappod-close',$menu_categories).on( "click", function() {
			$menu_categories.removeClass('active');
			return false;
		});		
		//Navigation right			
	}
	 _headercategories();
	function _canvasrightNavigation(){
		//Navigation right
		var $wpbingo_menu_right = $('.wpbingo-menu-right');
		$('.navigation-right').on( "click", function() {
			if($wpbingo_menu_right.hasClass('active')){
				$wpbingo_menu_right.removeClass('active');
			}	
			else{
				$wpbingo_menu_right.addClass('active');
			}	
			return false;
		});		
		$('.rappod-close',$wpbingo_menu_right).on( "click", function() {
			$wpbingo_menu_right.removeClass('active');
			return false;
		});		
		//Navigation right			
	}
	 _canvasrightNavigation();
	function _setGetParameter(paramName, paramValue)
	{
		var url = window.location.href;
		var hash = location.hash;
		url = url.replace(hash, '');
		if (url.indexOf(paramName + "=") >= 0)
		{
			var prefix = url.substring(0, url.indexOf(paramName));
			var suffix = url.substring(url.indexOf(paramName));
			suffix = suffix.substring(suffix.indexOf("=") + 1);
			suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
			url = prefix + paramName + "=" + paramValue + suffix;
		}
		else
		{
		if (url.indexOf("?") < 0)
			url += "?" + paramName + "=" + paramValue;
		else
			url += "&" + paramName + "=" + paramValue;
		}
		window.location.href = url + hash;
	}
	function _sticky_menu(){
		if($(".header-wrapper").data("sticky_header")){
			var current_scroll = 0;
			var height = $('#bwp-header .header-desktop').height();
			var height_mb = $('#bwp-header .header-mobile>.container').height();
			_window.scroll(function() {
				var next_scroll = $(this).scrollTop();
				if($(window).width() > 1199){
					if ( next_scroll > height) {
						$('.bwp-header').addClass('sticky');
						if($('body').hasClass('page-template-homepage')){
							if(!$('.bwp-header').hasClass('header-absolute')){
								$('.bwp-header').css('padding-top',height+'px')
							}
						}else{
							$('.bwp-header').css('padding-top',height+'px')
						}
					} else if ( next_scroll <= height ) {
						$('.bwp-header').removeClass('sticky');
						$('.bwp-header').removeAttr('style');
					}
				}else{
					if ( next_scroll > height_mb) {
						$('.bwp-header').addClass('sticky');
						if($('body').hasClass('page-template-homepage')){
							if(!$('.bwp-header').hasClass('header-absolute')){
								$('.bwp-header .header-desktop').css('padding-top',height_mb+'px')
							}
						}else{
							$('.bwp-header .header-desktop').css('padding-top',height_mb+'px')
						}
					} else if ( next_scroll <= height_mb ) {
						$('.bwp-header').removeClass('sticky');
						$('.bwp-header .header-desktop').removeAttr('style');
					}
				}
				current_scroll = next_scroll;  
			});
		}
	}
	function _sticky_nextproduct(){
		var $parent = $(".single-product");
		if( $(".prev_next_buttons",$parent).length > 0 ){
			var bwp_width = _window.width();
			_window.scroll(function() {
				var scroll_top = _window.scrollTop();
				var offset_top = $(".woocommerce-tabs",$parent).offset().top;
				var distance   = (offset_top - scroll_top);
				if ( distance <= 0) {
					$('.prev_next_buttons',$parent).addClass('active');
				}else{
					$('.prev_next_buttons',$parent).removeClass('active');
				}
			});
		}
	}
	function _sticky_product(){
		var $parent = $(".single-product");
		if( $(".sticky-product",$parent).length > 0 ){
			var bwp_width = _window.width();
			_window.scroll(function() {
				var scroll_top = _window.scrollTop();
				var offset_top = $(".single_add_to_cart_button",$parent).offset().top;
				var distance   = (offset_top - scroll_top);
				if ( distance <= 0) {
					$('.sticky-product',$parent).addClass('sticky');
				}else{
					$('.sticky-product',$parent).removeClass('sticky');
				}
			});
		}
		$('.select-cart-option').on( "click", function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
		});
	}
	function _rappod_top_link(){
		var custom_menu = $('.block-top-link .widget-custom-menu');
		$('.widget-title',custom_menu).on( "click", function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('div',$(this).parent()).slideUp();	
			}
			else{
				$('.widget-title',custom_menu).removeClass('active');
				$('div',custom_menu).slideUp();				
				$(this).addClass('active');
				$('div',$(this).parent()).slideDown();	
			}	
		});
	}
	_rappod_top_link();
	function _load_slick_carousel($element,$move_nav=true){
		$element.slick({
			arrows: $element.data("nav") ? true : false ,
			dots: $element.data("dots") ? true : false ,
			draggable : $element.data("draggable") ? false : true ,
			infinite: $element.data("infinite") ? false : true ,
			autoplay: $element.data("autoplay") ? true : false ,
			prevArrow: '<i class="slick-arrow fa fa-angle-left"></i>',
			slidesToScroll:$element.data("slidestoscroll") ? $element.data("columns") : 1,
			nextArrow: '<i class="slick-arrow fa fa-angle-right"></i>',	
			slidesToShow: $element.data("columns"),
			asNavFor: $element.data("asnavfor") ? $element.data("asnavfor") : false ,
			vertical: $element.data("vertical") ? true : false ,
			verticalSwiping: $element.data("verticalswiping") ? $element.data("verticalswiping") : false ,
			rtl: (_body.hasClass("rtl") && !$element.data("vertical")) ? true : false ,
			centerMode: $element.data("centermode") ? $element.data("centermode") : false ,
			centerPadding: $element.data("centerpadding") ? $element.data("centerpadding") : false ,
			focusOnSelect: $element.data("focusonselect") ? $element.data("focusonselect") : false ,
			fade: ($element.data("fade") && !_body.hasClass("rtl")) ? true : false ,
			cssEase: 'linear',
			autoplaySpeed: 5000,
			pauseOnHover:true,
			pauseOnFocus: false,
			responsive: [
				{
				  breakpoint: 1441,
				  settings: {
					slidesToShow: $element.data("columns1440") ? $element.data("columns1440") : $element.data("columns"),
					slidesToScroll: $element.data("columns1440") ? $element.data("columns1440") : $element.data("columns"),
				  }
				},
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: $element.data("columns1"),
					slidesToScroll: $element.data("columns1"),
				  }
				},				
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: $element.data("columns2"),
					slidesToScroll: $element.data("columns2"),
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: $element.data("columns3"),
					slidesToScroll: $element.data("columns3"),
					vertical: false,
					verticalSwiping : false,
				  }
				},
				{
				  breakpoint: 480,			  
				  settings: {
					slidesToShow: $element.data("columns4"),
					slidesToScroll: $element.data("columns4"),
					vertical: false,
					verticalSwiping : false,
				  }
				}
			]	
		});
		var $single_product = $(".bwp-single-product");
		$element.on('afterChange', function(event, slick, currentSlide, nextSlide){
			_move_nav_slick($element);
			if($single_product.length > 0  && $single_product.hasClass("zoom") ){
				var _data = $single_product.data();
				if(_data.product_layout_thumb != "one_column" && _data.product_layout_thumb != "grid" && _data.product_layout_thumb != "two_column" && _data.product_layout_thumb != "grid_sticky" ){
					$('.zoomContainer').remove();
					var _data = $single_product.data();
					var $image_thumbnail = $(".img-thumbnail.slick-current",".main-single-product .image-additional");
					if (($(window).width()) >= 768 ){
						_load_zoom_single_inner($("img",$image_thumbnail),_data);
					}
				}
			}
		});
		_move_nav_slick($element);
		if($single_product.length > 0  && $single_product.hasClass("zoom") ){
			var _data = $single_product.data();
			var $image_thumbnail = $(".img-thumbnail.slick-current",".image-additional");
			if (($(window).width()) >= 768 ){
				_load_zoom_single_inner($("img",$image_thumbnail),_data);
			}
		}
	}	
	function _move_nav_slick($element){
		if($(".slick-arrow",$element).length > 0){
			if( $(".fa-angle-left",$element).length > 0 ){
				var $prev = $(".fa-angle-left",$element).clone();
				$(".fa-angle-left",$element).remove();
				if($element.parent().find(".fa-angle-left").length == 0){
					$prev.prependTo($element.parent());
				}
				$prev.on( "click", function() {
					$element.slick('slickPrev');
				});				
			}
			if( $(".fa-angle-right",$element).length > 0 ){
				var $next =  $(".fa-angle-right",$element).clone();
				$(".fa-angle-right",$element).remove();
				if($element.parent().find(".fa-angle-right").length == 0){
					$next.appendTo($element.parent());
				}
				$next.on( "click", function() {
					$element.slick('slickNext');
				});
			}
		}	
	}
	//Dropdown Menu
	function _dropdown_menu(){
		$( ".pwb-dropdown" ).each(function(){
			var $dropdown = $(this);
			var active_text = $dropdown.find('li.active').text();
			if(active_text){
				$(".pwb-dropdown-toggle",$dropdown).html(active_text);
			}
			$("li",$dropdown).on( "click", function() {
				$("li",$dropdown).removeClass("active");
				$(this).addClass('active');
				var this_text = $(this).text();
				$(".pwb-dropdown-toggle",$dropdown).html(this_text);
				$dropdown.removeClass("open");
				if($dropdown.hasClass('select_category')){
					var this_value = $(this).data("value");
					$( ".product-cat",".select_category" ).val(this_value);
				}				
			});
		});		
	}
	_dropdown_menu();
	function _click_toggle_filter(){
		$(".button-filter-toggle").on( "click", function() {
			if($(this).hasClass('active')){
				$(".button-filter-toggle").removeClass('active');
				$(".filter_sideout").removeClass('active');
				$(".sidebar-product-filter").removeClass('active');
				$(".main-archive-product").removeClass('active');
				$(".remove-sidebar").removeClass('active');
				$(".sidebar-product-filter").slideUp();
			}else{
				$(".button-filter-toggle").addClass('active');
				$(".filter_sideout").addClass('active');
				$(".sidebar-product-filter").addClass('active');
				$(".main-archive-product").addClass('active');
				$(".remove-sidebar").addClass('active');
				$(".sidebar-product-filter").slideDown();
			}
		});	
		$(".remove-sidebar").on( "click", function() {
			$(this).removeClass('active');
			$(".main-archive-product").removeClass('active');
			$(".sidebar-product-filter").removeClass('active');
			$(".button-filter-toggle").removeClass('active');
		});
	}
	_click_toggle_filter();
	//Menu CanVas
	function _click_button_canvas_menu(){
		$('#show-megamenu').on( "click", function() {
			if($('.content-mobile-menu').hasClass('active'))
				$('.content-mobile-menu').removeClass('active');
			else
				$('.content-mobile-menu').addClass('active');
			return false;
		});

		$('#show-megamenu').on( "click", function() {
			if($('.remove-mobile-menu').hasClass('active'))
				$('.remove-mobile-menu').removeClass('active');
			else
				$('.remove-mobile-menu').addClass('active');
			return false;
		});

		$('.remove-mobile-menu').on( "click", function() {
			$(this).removeClass('active');
			$('.content-mobile-menu').removeClass('active');
			$('.bwp-canvas-vertical').removeClass('active');
		});

		$('#show-verticalmenu').on( "click", function() {
			if( $(".bwp-canvas-vertical").hasClass('active')){
				$(".bwp-canvas-vertical").removeClass('active');
			}	
			else{
				$(".bwp-canvas-vertical").addClass('active');
				$(".remove-mobile-menu").addClass('active');
			}	
			return false;
		});
	}
	_click_button_canvas_menu();
	function _load_canvas_menu(){
		var wd_width = _window.width(); 
		var $main_menu = $(".menu","#main-navigation");
		if(wd_width <= 1199){
			if($("#canvas-main-menu").length < 1 && $main_menu.length > 0){
				var $menu = $main_menu.parent().clone();
				$menu.attr( "id", "canvas-main-menu");
				$($menu).find(".menu").removeAttr('id');
				$('.content-mobile-menu').prepend('<div  class="bwp-canvas-navigation"><span id="remove-megamenu" class="remove-megamenu icon-remove">'+$('.bwp-navigation').data('text_close')+'</span></div>');		
				$('.bwp-canvas-navigation').append($menu);
				$menu.mmenu({
					offCanvas: false,
					"navbar": {
					"title": false
					}
				});
				_remove_canvas_menu();
			}
			//Vertical Menu
			if($("#canvas-vertical-menu").length < 1){
				var $vertical = $(".bwp-vertical-navigation >div").clone();
				$vertical.attr( "id", "canvas-vertical-menu");
				$($vertical).find(".menu").removeAttr('id');
				$('#page').append('<div  class="bwp-canvas-vertical"><span id="remove-verticalmenu" class="remove-verticalmenu icon-remove">'+$('.bwp-navigation').data('text_close')+'</span></div>');			
				$('.bwp-canvas-vertical').append($vertical);
				$vertical.mmenu({
					offCanvas: false,
					"navbar": {
					"title": false
					}
				});
				_remove_canvas_menu();
			}			
		}else{
			$(".bwp-canvas-navigation").remove();
			$(".bwp-canvas-vertical").remove();
		}		
	}
	_load_canvas_menu();
	function _remove_canvas_menu(){
		$('#remove-megamenu').on( "click", function() {
			$('.content-mobile-menu').removeClass('active');
			$('.remove-mobile-menu').removeClass('active');
			return false;
		});
		$('#remove-verticalmenu').on( "click", function() {
			$(".bwp-canvas-vertical").removeClass('active');
			$(".remove-mobile-menu").removeClass('active');
			return false;
		});
	}
	function _event_single_image(){
		if($(".bwp-single-product").length){
			var $element = $(".bwp-single-product");
			var _data = $element.data();
			if($element.hasClass("zoom")){
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$('.zoomContainer .zoomWindowContainer .zoomWindow').css('background-image', 'url(' + $('#image').attr('src') + ')');
					$('.zoomContainer .zoomLens').css('background-image', 'url(' + $('#image').attr('src') + ')');
				});
				if(_data.product_layout_thumb == "one_column" || _data.product_layout_thumb == "grid" || _data.product_layout_thumb == "two_column" || _data.product_layout_thumb == "grid_sticky"  ){
					_load_zoom_single_image(_data);
				}
			}
			if(_data.product_layout_thumb != "one_column" && _data.product_layout_thumb != "grid" && _data.product_layout_thumb != "two_column" && _data.product_layout_thumb != "grid_sticky" ){
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$('.image-additional').slick('slickGoTo',0);
				});
			}
			if(_data.product_layout_thumb == "one_column" || _data.product_layout_thumb == "grid" || _data.product_layout_thumb == "two_column" || _data.product_layout_thumb == "grid_sticky" ){
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$(window).scrollTop( 300 );
				});
			}	
		}
	}
	function _load_zoom_single_image(_data){
		var $element = $(".image-additional");
		if (($(window).width()) >= 768){
			$(".img-thumbnail",$element).each(function(){
				var $parent_img = $("a",$(this));
				_load_zoom_single_inner($("img",$parent_img),_data);
			});
		}
	}
	function _load_zoom_single_inner($element,_data){
		if( $(".image-thumbnail").length > 0 ){
			var $gallery = "image-thumbnail";
		}else{
			var $gallery = false;
		}		
		$element.elevateZoom({
				zoomType : _data.zoomtype,
				scrollZoom  : _data.zoom_scroll,
				lensSize    : _data.lenssize,
				lensShape    : _data.lensshape,
				containLensZoom  : _data.zoom_contain_lens,
				gallery: $gallery,
				cursor: 'crosshair',
				galleryActiveClass: "active",
				lensBorder: _data.lensborder,
				borderSize : _data.bordersize,
				borderColour : _data.bordercolour,
		});	
	}

	//Menu Fullscreen
	function _load_wpbingo_menu_fullscreen(){
		var $menu = $(".wpbingo-menu-fullscreen");
		wrapGrower($menu);
		appendGrower($menu);
	}
	function wrapGrower($menu){
		$("li.menu-item-has-children > a", $menu).each(function() {
			if ($(this).find('.parent-menu').length <= 0) {
				$(this).wrap('<div class="parent-menu close"></div>');
			}
		});
	}
	function appendGrower($menu){
		if($("li.menu-item-has-children .parent-menu",$menu).find('.open_child_menu').length <= 0){
			$("li.menu-item-has-children .parent-menu",$menu).append('<span class="open_child_menu"><i class="icon-arrow-right"></i></span>');
			clickGrower($menu);
		}	
	}
	
	function clickGrower($menu) {
		$($menu).on("click", "li.menu-item-has-children .parent-menu .open_child_menu", function() {
			var parent = $(this).closest(".parent-menu");
			var subMenu = parent.parent().find(".sub-menu").first();
			if (parent.hasClass("close")) {
				parent.addClass("open").removeClass("close");
				subMenu.slideDown();
			} else {
				parent.addClass("close").removeClass("open");
				subMenu.slideUp();
			}
		});
	}
	  
	function offtogglemegamenu($menu){
		$('li.menu-item-has-children .sub-menu',$menu).css('display','');	
		$menu.removeClass('active');
		$("li.menu-item-has-children .parent-menu .open_child_menu",$menu).removeClass('open').addClass('close');	
	}	

	function _moreverticalMenu(){
		var $element = $(".categories-vertical-menu");
		var max_number_1530 = $element.data("max_number_1530") ? $element.data("max_number_1530") : "15";	
		var max_number_1200 = $element.data("max_number_1200") ? $element.data("max_number_1200") : "8";
		var max_number_991 = $element.data("max_number_991") ? $element.data("max_number_991") : "6";
		if($(window).width() >= 1530){
			_appendMoreCategories($element,max_number_1530);
		}else if($(window).width() >= 1200){
			_appendMoreCategories($element,max_number_1200);
		}else if($(window).width() >= 992){
			_appendMoreCategories($element,max_number_991);
		}
	}
	function _appendMoreCategories($element,limit){
		var textmore = $element.data("textmore") ? $element.data("textmore") : "Load More";
		var closemore = $element.data("textclose") ? $element.data("textclose") : "Close";
		
		if($( "ul.menu >li",$element).length > limit && $element.find(".more-wrap").length <= 0){		
			$("ul.menu",$element).append('<div class="more-wrap"><span class="more-view">'+textmore+'</span></div>');
		}
		
		$(".more-wrap",$element).unbind( "click" );
		$(".more-wrap",$element).on( "click", function(){
			var this_more = $(this);
			if($(this).hasClass('open')){
				$("ul.menu >li",$element).each(function(i){
					if(i>limit-1){
						$(this).slideUp();
					}
				});
				$(this).removeClass('open');
				$(this_more).html('<span class="more-view">'+textmore+'</span>');
			}else{
				$('ul.menu >li',$element).each(function(i){
					if(i>limit-1){
						$(this).slideDown();
					}
				});
				$(this).addClass('open');
				$(this_more).html('<span class="more-view">'+closemore+'</span>');
			}
		});
		
		$("ul.menu >li",$element).css('display', 'block');
		$("ul.menu >li",$element).each(function(i){
			if(i> (limit -1)){ 
				$(this).css('display', 'none');
			}		
		});
	}
	/*Search JS*/
	function _event_ajax_search(){
		var $element = $(".ajax-search");
		$(".input-search",$element).on("keydown", function() {
			setTimeout(function($e){	
			var character = $e.val();
			var limit = $element.data("limit") ? $element.data("limit") : 5;
			var $category_search = $(".category-search",$element);
			var category = $("li.active",$category_search).data("value");
			if(character.length >= 2){
				$( ".result-search-products",$element ).empty();
				$( ".result-search-products",$element ).addClass("loading");
				$( ".result-search-products",$element ).show();
				$( ".result-search-products-content",$element ).show();
				$.ajax({
					url: rappod_ajax.ajaxurl,
					dataType: 'json',
					data: {
						action : "rappod_search_products_ajax",
						character : character,
						limit : limit,
						category : category,
						security : rappod_ajax.ajax_nonce
					},
					success: function(json) {
						var html = '';
						if (json.length) {
							for (var i = 0; i < json.length; i++) {
								if (!json[i]['category']) {
									html += '<li class="item-search">';
									html += '	<a class="item-image" href="' + json[i]['link'] + '"><img class="pull-left" src="' + json[i]['image'] + '"></a>';
									character = (character).toLowerCase(character);
									character = (character).replace("%20"," ");
									json[i]['name'] = (json[i]['name']).toLowerCase(json[i]['name']);
									json[i]['name'] = (json[i]['name']).replace(character, '<b>'+character+'</b>');
									html += '<div class="item-content">';
									html += '<a href="' + json[i]['link'] + '" title="' + json[i]['name'] + '"><span>'	+ json[i]['name'] + '</span></a>';
									if(json[i]['price']){
										html += '<div class="price">'+json[i]['price']+'</div>';
									}
									html += '</div></li>';
								}
							}
						}else{	
							html = '<li class="no-result-item">'+$element.data("noresult")+'</li>';
						}
						$( ".result-search-products",$element ).removeClass("loading");
						$( ".result-search-products",$element ).html(html);
					}
				});
			}else{
				$( ".result-search-products",$element ).removeClass("loading");
				$( ".result-search-products",$element ).empty();
				$( ".result-search-products",$element ).hide();
				$( ".result-search-products-content",$element ).hide();
			}				
		  }, 200, $(this));
		});	
	}
	function _event_circlestime(){
		$( ".time-circles" ).each(function(){
			var $circles = $(this);
			$circles.TimeCircles({
					circle_bg_color: $circles.data("bg_color"),
					fg_width: $circles.data("fg_width"),
					bg_width: $circles.data("bg_width"),
					time: {
						Days: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_day")
						},
						Hours: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_hour")	
						},
						Minutes: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_min")
						},
						Seconds: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_sec")
						}
					}
			});
		});
	}
	function _left_right_submenu(){
		$( ".menu-item-has-children.level-1" ).each(function() {
			var _item_menu = $(this);
			var spacing_item_menu = _item_menu.outerWidth();
			var spacing_item_menu_left = _item_menu.offset().left;
			var spacing_item_menu_right = _window.width() - (spacing_item_menu+spacing_item_menu_left);
			if(spacing_item_menu_right <= 225){
				_item_menu.addClass("sub-menu-left");
			}else{
				_item_menu.removeClass("sub-menu-left");
			}	
		});
	}
	function _event_banner_category(){
		var activeIndex = -1;
		$('.item-title:first').addClass('active');
		$('.item-category_image:first').addClass('active');
		$('.item-title').on('mouseenter', function() {
			$('.item-title:first').removeClass('active');
			$('.item-category_image:first').removeClass('active');
			$(this).addClass('active');
			var index = $('.item-title').index(this);
			$('.item-category_image').eq(index).addClass('active');
		});
		$('.item-title').on('mouseenter', function() {
			var index = $('.item-title').index(this);
			if (activeIndex !== -1) {
				$('.item-title').eq(activeIndex).removeClass('active');
				$('.item-category_image').eq(activeIndex).removeClass('active');
			}
			$(this).addClass('active');
			$('.item-title').eq(index).addClass('active');
			$('.item-category_image').eq(index).addClass('active');
			activeIndex = index;
		});
	}
	function _event_accordion_slider(){
		$( ".bwp-slider .accordion" ).each(function(){
			var $accordion = $(this);
			$("li",$accordion).first().addClass("active");
			$("li",$accordion).on('hover', function(){
				$("li",$accordion).removeClass('active');
				$(this).addClass("active");
			});		
		});
	}
	function _remove_animation_tab_visua(){
		if(jQuery.fn.vcAccordion){
			var _isAnimated = jQuery.fn.vcAccordion.Constructor.prototype.isAnimated;
			jQuery.fn.vcAccordion.Constructor.prototype.isAnimated = function() {
				return 0;
			}
		}
	}
	function _event_video_product(){
		if($(".video-additional").length > 0){
			if($(".img-thumbnail",$element).length <= 0){
				$(".video-additional").addClass("active");
			}
			var $element = $("#image-thumbnail");
			$(".img-thumbnail-video",$element).on( "click", function(){
				$(".image-additional").removeClass("active");
				$(".img-thumbnail").removeClass("active");
				if(!$(".video-additional").hasClass("active")){
					$(".video-additional").addClass("active");
				}
				if(!$(this).hasClass("active")){
					$(this).addClass('active');
				}
			});
			$(".img-thumbnail",$element).on( "click", function(){
				$(".video-additional").removeClass("active");
				$(".img-thumbnail-video").removeClass("active");
				if(!$(".image-additional").hasClass("active")){
					$(".image-additional").addClass("active");
				}
			});	
		}
	}
	function _event_lookbook(){
		$(".close-lookbook").on( "click", function() {
			var $parent = $(this).closest('.bwp-lookbook');
			if($('.content-lookbook',$parent).hasClass("active")){
				$('.content-lookbook',$parent).removeClass("active");
				$('.item-lookbook',$parent).removeClass("active");
				$(this).removeClass("active");
			}
		});
		$(".item-lookbook").on( "click", function() {
			var $parent = $(this).closest('.bwp-lookbook');
			var $id = $(this).data("tager_lookbook");
			var y = $('.item-lookbook[data-tager_lookbook="'+$id+'"]',$parent).offset().left - $parent.offset().left;
			var x = $('.item-lookbook[data-tager_lookbook="'+$id+'"]',$parent).position().top;
			$(".content-lookbook[data-lookbook="+$id+"]",$parent).css({"top": x, "left": y});
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$('.close-lookbook',$parent).removeClass("active");
				$(".content-lookbook[data-lookbook="+$id+"]",$parent).removeClass("active");
			}else{
				$(this).addClass("active");
				$('.close-lookbook',$parent).addClass("active");
				$(".content-lookbook[data-lookbook="+$id+"]",$parent).addClass("active");
			}
		});
		$(".close-lookbook-mobile").on( "click", function() {
			var $parent = $(this).closest('.bwp-lookbook');
			if($('.content-lookbook',$parent).hasClass("active")){
				$('.content-lookbook',$parent).removeClass("active");
				$('.item-lookbook',$parent).removeClass("active");
				$('.close-lookbook',$parent).removeClass("active");
				$(this).removeClass("active");
			}
		});
	}
	function _event_single_sticky_grid(){
		if ($(window).width() > 992 && $('.bwp-single-product.grid_sticky').length > 0) {
			var $element = $('.bwp-single-product.grid_sticky');
			var eventElemArray = [];
			var _count = 0;
			var _countFix = 0;
			var $image_array = $('.image-additional .img-thumbnail',$element);
			$('.content-thumbnail-scroll .img-thumbnail',$element).on( "click", function() {
				var $thumb = $(this).data('media-id'),
					$image = $('.image-additional .img-thumbnail[data-media-id='+ $thumb +']',$element);
				$( 'html, body' ).animate({ scrollTop: $image.offset().top }, '300' );
				$(this).addClass('slick-current');
			});
			$(window).on('load scroll resize',function(){
				eventElemArray = [];
				_count = 0;
				$image_array.each(function(i,pager){
					eventElemArray.push( $(pager).offset().top );
				});
				for(var i = 0;i < eventElemArray.length; i++){
					if( $(window).scrollTop() + ($(window).height() * 0.5) > eventElemArray[i] ){
						_count++;
					}
				}
				if(_count !== _countFix){
					_countFix = _count;
					$('.content-thumbnail-scroll .img-thumbnail',$element).removeClass('slick-current');
					$('.content-thumbnail-scroll .img-thumbnail',$element).eq(_count-1).addClass('slick-current');
				}
			});
			// sticky thumb
			var $content = $('.image-additional',$element);
			var thumb_left = $('.content-thumbnail-scroll',$element).offset.left;
			var thumb_width = $('.content-thumbnail-scroll',$element).width() + 'px';
			var thumb_ToTop = $('.content-thumbnail-scroll',$element).offset().top;
			if( $content.height() > $('.content-thumbnail-scroll',$element).height() ){
				$(window).scroll(function() {
					var windowToTop = $(window).scrollTop();
					var thumb_height = $('.content-thumbnail-scroll',$element).height() + 'px';
					var stopsticky = ( $content.height() + $content.offset().top ) - windowToTop;
					if (windowToTop + 10 > thumb_ToTop) {
						$('.content-thumbnail-scroll',$element).css({
							'position': 'fixed',
							'top': '15px',
							'left': thumb_left,
							'width': thumb_width,
							'height': thumb_height
						});
					} else {
						$('.content-thumbnail-scroll',$element).removeAttr('style');
						$('.js-product-media-group .js-product-media',$element).removeAttr('style');
					}
					if(stopsticky < $('.content-thumbnail-scroll',$element).height()) {
						$('.content-thumbnail-scroll',$element).css({
							'position': 'absolute',
							'top': ($content.height() - $('.content-thumbnail-scroll',$element).height()) + 'px',
							'left': thumb_left,
							'width': thumb_width,
							'height': thumb_height
						});
					}
				});
			}
			// sticky info
			var info_image =  $('.image-additional .img-thumbnail',$element).height() + $('.image-additional .img-thumbnail',$element).height()*0.5;
			var info_left = $('.bwp-single-info .entry-summary',$element).offset.left;
			var info_width = $('.bwp-single-info .entry-summary',$element).width() + 'px';
			var info_ToTop = $('.bwp-single-info .entry-summary',$element).offset().top;
			if( $content.height() > ( $('.bwp-single-info .entry-summary',$element).height() + info_image )){
				$(window).scroll(function() {
					var windowToTop = $(window).scrollTop();
					var info_height = $('.bwp-single-info .entry-summary',$element).height() + 'px';
					var stopsticky = ( $content.height() + $content.offset().top ) - windowToTop;
					if (windowToTop + 10 > info_ToTop) {
						$('.bwp-single-info .entry-summary',$element).css({
							'position': 'fixed',
							'top': '15px',
							'left': info_left,
							'width': info_width,
							'height': info_height
						});
					} else {
						$('.bwp-single-info .entry-summary',$element).removeAttr('style');
					}
					if(stopsticky < ( $('.bwp-single-info .entry-summary',$element).height() + info_image )) {
						$('.bwp-single-info .entry-summary',$element).css({
							'position': 'absolute',
							'top': ($content.height() - $('.bwp-single-info .entry-summary',$element).height() - info_image ) + 'px',
							'left': info_left,
							'width': info_width,
							'height': info_height
						});
					}
				});
			}
		}else{
			_load_slick_carousel($(".bwp-single-product.grid_sticky .image-additional"));
			_load_slick_carousel($(".bwp-single-product.grid_sticky .content-thumbnail-scroll .image-thumbnail"));
		}
	}
	function _load_video_popup() {
		const $url_video = $('.bwp-video').data("src");
		const $contentVideo = $(".content-video.modal");
		const $bwpWidgetVideoDialog = $('.bwp-widget-video .modal-dialog');
		const $videoAdditionalIframe = $('.video-additional iframe');
		const $imageAdditionalImageWidth = $(".image-additional #image").width();
		const $imageAdditionalImageHeight = $(".image-additional #image").height();
	  
		$(".remove-show-modal").add(".close-video").on("click", function () {
			if ($contentVideo.hasClass('show')) {
				$contentVideo.removeClass('show');
				$contentVideo.css('display','none');
				$bwpWidgetVideoDialog.removeClass('width height');
			}
			$("#video").attr('src', $url_video);
		});
		
		$(".bwp-video.modal").on("click", function () {
			if (!$contentVideo.hasClass('show')) {
				$contentVideo.addClass('show');
				$contentVideo.css('display','block');
			}
		
			const wd_width = _window.width();
			const wd_height = _window.height();
			wd_width <= (wd_height + 500) ? $bwpWidgetVideoDialog.addClass('width') : $bwpWidgetVideoDialog.addClass('height');
		});
	  
		$videoAdditionalIframe.css({ width: $imageAdditionalImageWidth, height: $imageAdditionalImageHeight });
	}
	  
	function _load_count_up(){
		var a = 0;
		if($('.bwp-cta').length > 0 ){
			_window.scroll(function() {
				var oTop = $('.bwp-cta').offset().top - window.innerHeight;
				if(a == 0 && _window.scrollTop() > oTop){
					$('.count-cta').each(function () {
						$(this).prop('Counter',0).animate({
							Counter: $(this).text()
						}, {
							duration: 2000,
							easing: 'swing',
							step: function (now) {
								$(this).text(Math.ceil(now));
							}
						});
					});
					a = 1;
				}
			});
		}
	}	
	function _load_360_view_product(){
		$('.product-360-view').TreeSixtyImageRotate({
			totalFrames: $('.product-360-view').data("count"),
			endFrame: $('.product-360-view').data("count"),
			imagePlaceholderClass: "images-placeholder"
		}).initTreeSixty();
		$(".rappod-360-button").on( "click", function() {
			if($('.content-product-360-view').hasClass('active')){
				$('.content-product-360-view').removeClass('active');	
			}else{
				$('.content-product-360-view').addClass('active');
			}
		});
		$(".overlay-360-view").on( "click", function() {
			$('.content-product-360-view').removeClass('active');
		});
	}
	function _click_button(){
		$(".menu-fullscreen .open-menu").on( "click", function() {
			if($(this).hasClass('active')){
				$(this).removeClass('active');	
			}else{
				$(this).addClass('active');		
			}
			if($('.menu-fullscreen__content').hasClass('active')){
				$('.menu-fullscreen__content').removeClass('active');	
			}else{
				$('.menu-fullscreen__content').addClass('active');	
			}
		});
		$(".menu-fullscreen .close-fullscreen").on( "click", function() {
			$('.menu-fullscreen__content').removeClass('active');
		});
		$('.size-guide .size-guide__click').on( "click", function() {
			if($('.size-guide').hasClass('active')){
				$('.size-guide').removeClass('active');	
			}else{
				$('.size-guide').addClass('active');
			}
		});
		$('.product-notify').on( "click", function() {
			if($('.single-product-notify-me-form').hasClass('active')){
				$('.product-notify').removeClass('active');
				$('.single-product-notify-me-form').removeClass('active');	
			}else{
				$('.product-notify').addClass('active');
				$('.single-product-notify-me-form').addClass('active');
			}
		});
		$('.notify-me-form-close').on( "click", function() {
			$('.single-product-notify-me-form').removeClass('active');	
		});
		$('.close-back_notify_me-form').on( "click", function() {
			$('.single-product-notify-me-form').removeClass('active');	
		});
		$(".showlogin").on( "click", function() {
			if($('.woocommerce-form-login').hasClass('active')){
				$('.woocommerce-form-login').removeClass('active');
				$('.woocommerce-form-login').slideUp();
			}else{
				$('.woocommerce-form-login').addClass('active');
				$('.woocommerce-form-login').slideDown();		
			}
		});
		$(".button-next-reregister").on( "click", function() {
			if($('.form-login').hasClass('active')){
				$('.form-login').removeClass('active');
				$('.form-register').addClass('active');
				$('.form-login-register .title-sign').addClass('hidden');
				$('.form-login-register .title-register').removeClass('hidden');
			}
		});
		$(".button-next-login").on( "click", function() {
			if($('.form-register').hasClass('active')){
				$('.form-register').removeClass('active');
				$('.form-login').addClass('active');
				$('.form-login-register .title-sign').removeClass('hidden');
				$('.form-login-register .title-register').addClass('hidden');
			}
		});
		$('#reviews .button-reviews').on( "click", function() {
			if($('#review_form_wrapper').hasClass('open')){
				$('#review_form_wrapper').removeClass('open');
			}else{
				$('#review_form_wrapper').addClass('open');
				$('.close-reviews-form').addClass('open');
				$('.close-btn').addClass('open');
				$('.modal').addClass('open');
			}
		});
		$('#reviews .close-reviews-form').on( "click", function() {
			if($('#review_form_wrapper').hasClass('open')){
				$('#review_form_wrapper').removeClass('open');
				$(this).removeClass('open');
				$('.modal').removeClass('open');		
			}
		});
		$('#review_form_wrapper .close-btn').on( "click", function() {
			if($('#review_form_wrapper').hasClass('open')){
				$('#review_form_wrapper').removeClass('open');
				$('.close-reviews-form').removeClass('open');
				$(this).removeClass('open');
				$('.modal').removeClass('open');		
			}
		});
	}
	function _tab_information_mobile(){
		if(_window.width() <= 991 && $('.main-single-product .woocommerce-tabs:not(.description-style-accordion)').length > 0){
			var $parent = $('.main-single-product .woocommerce-tabs:not(.description-style-accordion)');
			$('.woocommerce-Tabs-panel',$parent).css("display","none");
			$('.tab-title',$parent).on('click', function() {
				var id = $(this).data('id');
				$('.woocommerce-Tabs-panel',$parent).slideUp();
				if($(this).hasClass('active')){
					$('#'+id+'',$parent).slideUp();
					$('.tab-title',$parent).removeClass('active');
				}else{
					$('#'+id+'',$parent).slideDown();
					$('.tab-title',$parent).removeClass('active');
					$(this).addClass('active');
				}
			});
		}
	}
	function _after_add_to_cart(){ 
		var wd_width = _window.width();
		$( _body ).on( 'added_to_cart', function(){
			if(wd_width >= 1199){
				var $element = $(".rappod-topcart-desktop");
			}else{
				var $element = $(".rappod-topcart-mobile");
			}
			if( $element.hasClass("popup") ){
				$('.remove-cart-shadow').addClass('show');
				setTimeout(function(){$element.addClass('show');}, 200);
				_body.addClass("not-scroll");
			}else{
				$.ajax({
					url: rappod_ajax.ajaxurl,
					data: {
						"action" : "rappod_cartajax",
						"security" : rappod_ajax.ajax_nonce
					},
					success: function(results){
						$('.content-cart-popup').empty().html(results);
						if( !$(".content-cart-popup").hasClass("active") ){
							$(".content-cart-popup").addClass("active");
						}
						_ajax_cart_popup();
						_close_cart_popup();
					},
					error: function(errorThrown) { console.log(errorThrown); },
				});				
			}
			_click_add_to_cart();
		});
	}
	function _ajax_cart_popup(){
		var woocommerce_form = $( '.woocommerce-cart-page-popup form' );
		woocommerce_form.on('change', '.qty', function(){
			$('.woocommerce-cart-page-popup').addClass("loadings");
			_post_ajax_cart_popup($(this));
		});
		woocommerce_form.on('click', '.remove', function(e){
			e.preventDefault();
			$(this).closest(".cart_item").addClass("hidden");
			$('.woocommerce-cart-page-popup').addClass("loadings");
			$(this).closest(".content-cart-right").find(".qty").val(0);
			_post_ajax_cart_popup($(this));
		});
	}
	function _post_ajax_cart_popup($element){
		var form = $element.closest('form');
		var formData = form.serialize();			
		$.post( form.attr('action'), formData, function() {
			$.ajax({
				url: rappod_ajax.ajaxurl,
				data: {
					"action" : "rappod_cartajax",
					"security" : rappod_ajax.ajax_nonce
				},
				success: function(results){
					$('.content-cart-popup').empty().html(results);
					$('.woocommerce-cart-page-popup').removeClass("loadings");
					$(document.body).trigger('wc_fragment_refresh');
					_ajax_cart_popup();
					_close_cart_popup();
				},
				error: function(errorThrown) { console.log(errorThrown); },
			});
		});	
	}
	function _close_cart_popup(){
		$(".close-cart-popup").on( "click", function() {
			$('.content-cart-popup').empty().removeClass("active");
		});
	}
	function _ajax_cart_page(){
		var timeout;
		var cart_form = $( '.woocommerce-cart-form' );
		cart_form.on('change', '.qty', function(){
			if (timeout != undefined) clearTimeout(timeout);
			if ($(this).val() == '') return;
			timeout = setTimeout(function() {
				$('[name="update_cart"]',cart_form).trigger('click');
			}, 1000 );	
		});
	}	
	function _ajax_cart_header(){
		var wd_width = _window.width();
		if(wd_width >= 1199){
			var topcart_form = $(".rappod-topcart-desktop");
		}else{
			var topcart_form = $(".rappod-topcart-mobile");
		}
		topcart_form.on('change', '.qty', function(){
			$('.cart-popup').addClass("loadings");
			var form = $(this).closest("form");
			var formData = form.serialize();		
			$.post( form.attr('action'), formData, function() {
				$(document.body).trigger('wc_fragment_refresh');
				setTimeout(function() {
					$('.cart-popup').removeClass("loadings");
				}, 500);
				topcart_form.addClass('show');
			});			
		});
	}
	function _click_add_to_cart(){
		var topcart_form = $(".rappod-topcart-mobile,.rappod-topcart-desktop");
		topcart_form.on('click', '.cart-icon', function(e){
			e.preventDefault();
			if(!topcart_form.hasClass('show')){
				topcart_form.addClass('show');
				$('.remove-cart-shadow').addClass('show');
			}
			if( !_body.hasClass("not-scroll") && $(".rappod-topcart").hasClass("popup") ){
				_body.addClass("not-scroll");
			}			
		});
		topcart_form.on('click', '.cart-remove', function(e){
			e.stopPropagation();
			e.preventDefault();
			if( topcart_form.hasClass("show") ){
				topcart_form.removeClass("show");
				$(".remove-cart-shadow").removeClass("show");
			}
			if( _body.hasClass("not-scroll") ){
				_body.removeClass("not-scroll");
			}
		});
		$(".remove-cart-shadow").on( "click", function() {
			if( _body.hasClass("not-scroll") ){
				_body.removeClass("not-scroll");
			}			
			topcart_form.removeClass("show");
			$(".remove-cart-shadow").removeClass("show");
		});
	}
	function _click_atribute_image(){
		$(".image-attribute",".product-attribute").on( "click", function() {
			if(!$(this).hasClass("active")){
				$(".image-attribute",".product-attribute").removeClass("active");
				$(this).addClass("active");
				var $parent = $(this).closest(".products-entry");
				var $thumb = $(".product-thumb-hover", $parent);
				var $image = $(this).data("image");
				$("img",$thumb).last().attr("src", $image);
			}
		});
	}
	function _event_variable_thumb(){
		if($('.product-wapper').hasClass('quick-shop')){
			var _load_click_attribute_card;
			$( ".product-wapper.quick-shop").each(function(){
				var $element 			= $(this);
				var attribute 			= '';
				var count 				= $(".attribute-card",$element).length;
				var $thumb 				= $(".products-thumb", $element);
				var $old_image 			= $("img",$thumb).last().attr("src");
				var $old_price 			= $('span.price',$element).html();
				var $str_attr1			= '';
				var $attr				= '';
				var $str_attr2			= '';
				var $str_all_dis		= '';
				var $str_attr_dis		= '';
				var $str_all_attr 		= [];
				var $arr_attr_dis 		= [];
				var diff_attr 			= [];
				var $arr_all_attr_dis 	= [];
				var $arr_list_attr_dis 	= [];
				var $arr_list_attr_dis_check = [];
				$("input.variation_id",$element).each(function(){
					$str_attr1 = $str_attr1 + ',' + $(this).data('attributes').toString();
				});
				var $arr_attrs 			= $str_attr1.split(',');
				var $arr_attr 			= new Set($arr_attrs);
				var arr_attr = [...$arr_attr];
				var _load_attribute_card;
				_load_attribute_card = function ($element,$variation_id,$disabled) {
					$(".attribute-card",$element).each(function(){
						var $this = $(this);
						$('.list-attribute',$this).on( "click", function(e) {
							if(!$(this).hasClass('disabled')){
								$str_all_attr = [];
								$attr = $(this).data('title').toString();
								if($(this).hasClass('active')){
									$('.list-attribute',$this).removeClass('active');
									if($(this).hasClass('color')){
										$("img",$thumb).last().attr("src", $old_image);
										$('.select-option-mobile',$element).addClass('disabled');
									}
									$(".list-attribute.active",$element).each(function(index){
										$str_attr_dis = $(this).data('title').toString();
										$arr_all_attr_dis 	= [];
										$("input.variation_id",$variation_id).each(function(){
											$str_all_dis = $(this).data('attributes');
											$arr_attr_dis 			= $str_all_dis.split(',');
											if ($.inArray($str_attr_dis, $arr_attr_dis) !== -1) {
												$arr_all_attr_dis = $.merge($arr_all_attr_dis, $arr_attr_dis);
											}
										});
										if(index==0){
											$arr_list_attr_dis_check = $arr_all_attr_dis;
										}
										$arr_list_attr_dis = $.grep($arr_all_attr_dis, function(value) {
											return $.inArray(value, $arr_list_attr_dis_check) !== -1;
										});
										$arr_list_attr_dis_check = $arr_list_attr_dis;
									});
									$arr_list_attr_dis 			= new Set($arr_list_attr_dis);
									var arr_all_attr_dis = [...$arr_list_attr_dis];
									if( arr_all_attr_dis ){
										$.each(arr_all_attr_dis, function(index, value) {
											if( $('.list-attribute[data-title="'+value+'"]',$element).hasClass('disabled') ){
												$('.list-attribute[data-title="'+value+'"]',$element).removeClass('disabled');
											}
										});
									}
									if( $('.list-attribute.active',$element).length == 1 ){
										var $dis_parent = $('.list-attribute.active',$element).closest('.attribute-card');
										$(".list-attribute:not(.default)",$dis_parent).removeClass('disabled');
									}
									if( $('.list-attribute.active',$element).length == 0 ){
										$("input.variation_id",$variation_id).each(function(){
											$str_attr1 = $str_attr1 + ',' + $(this).data('attributes');
										});
										var $arr_attrs 			= $str_attr1.split(',');
										var $arr_attr 			= new Set($arr_attrs);
										const arr_attr1 = [...$arr_attr];
										arr_attr = arr_attr1;
										$.each(arr_attr1, function(index, value) {
											if( $('.list-attribute[data-title="'+value+'"]',$element).hasClass('disabled') ){
												$('.list-attribute[data-title="'+value+'"]',$element).removeClass('disabled');
											}
										});
									}
								}else{
									$('.list-attribute',$this).removeClass('active');
									$(this).addClass('active');
									if($(".list-attribute.active",$element).length == 1){
										$.each(arr_attr, function(index, value) {
											$('.list-attribute[data-title="'+value+'"]',$element).removeClass('disabled');
										});
									}
									var $image = $(this).data('image');
									if($image){
										$("img",$thumb).last().attr("src", $image);
									}
									if($(this).hasClass('color')){
										$('.select-option-mobile',$element).removeClass('disabled');
									}
									$("input.variation_id",$variation_id).each(function(){
										$str_attr2 = $(this).data('attributes').toString();
										var $str_attr2 			= $str_attr2.split(',');
										if ($.inArray($attr, $str_attr2) !== -1) {
											$str_all_attr = $.merge($str_all_attr, $str_attr2);
										}
									});
									$str_all_attr 			= new Set($str_all_attr);
									var arr_all_attr = [...$str_all_attr]; 
									diff_attr = $.grep(arr_attr, function(elem) {
										return $.inArray(elem, arr_all_attr) === -1;
									});
									$.each(diff_attr, function(index, value) {
										if( !$('.list-attribute[data-title="'+value+'"]',$element).hasClass('disabled') ){
											$('.list-attribute[data-title="'+value+'"]',$element).addClass('disabled');
										}
									});
									if($(".list-attribute.active",$element).length == 1 ){
										$(".list-attribute:not(.default)",$this).removeClass('disabled');
									}
								}
								if( $('.list-attribute.active',$element).length == count ){
									$('.attribute-mobile-content').removeClass('show-content');
									setTimeout(function() { 
										$('.attribute-mobile-content').removeClass('active');
									}, 300);
									$(".attribute-card",$element).each(function(index){
										var $parent = $('.attribute-card.option-'+index,$element);
										if(index==0){
											attribute = $('.list-attribute.active',$parent).data('title').toString();
										}else{
											attribute = attribute + ',' + $('.list-attribute.active',$parent).data('title').toString();
										}
									});
									if( $('input[data-attributes="'+attribute+'"]',$variation_id).length ){
										var $price = $('input[data-attributes="'+attribute+'"]',$variation_id).data('price');
										$('.single_add_to_cart_button',$variation_id).removeClass('disabled');
										$('.variable-atc',$variation_id).removeClass('disabled');
										$('.form-attribute .title',$element).removeClass('disabled');
										$('span.price',$variation_id).empty();
										$('span.price',$variation_id).html($price);
									}else{
										$('.single_add_to_cart_button',$variation_id).addClass('disabled');
										$('.variable-atc',$variation_id).addClass('disabled');
										$('.form-attribute .title',$element).addClass('disabled');
										$('span.price',$variation_id).empty();
										$('span.price',$variation_id).append($old_price);
									}
								}else{
									$('.single_add_to_cart_button',$variation_id).addClass('disabled');
									$('.variable-atc',$variation_id).addClass('disabled');
									$('.form-attribute .title',$element).addClass('disabled');
									$('span.price',$variation_id).empty();
									$('span.price',$variation_id).append($old_price);
								}
							}
						});
					});
				};
				_load_attribute_card($element,$element,true);
				if($(window).width() < 1200 && $(window).width() > 767){
					$('.select-option-mobile',$element).on( "click", function(e) {
						if($('.content-form-attribute',$element).hasClass('active')){
							$('.content-form-attribute',$element).removeClass('active');
							$element.removeClass('active');
						}else{
							$('.content-form-attribute',$element).addClass('active');
							$element.addClass('active');
						}
					});
					$(window).on("click.Bst", function(event){
						if ( $element.has(event.target).length == 0 && !$element.is(event.target) ) {
							if($('.content-form-attribute',$element).hasClass('active')){
								$('.content-form-attribute',$element).removeClass('active');
								$('.single_add_to_cart_button',$element).addClass('disabled');
								$element.removeClass('active');
							}
						}
					});
				}
				if($(window).width() < 767){
					$('.select-option-mobile',$element).on( "click", function(e) {
						$('.attribute-mobile-content').empty();
						if(!$(this).hasClass('disabled')){
							var $parent = $(this).closest('.quick-shop');
							var $product_id = $parent.data('product_id');
							var $html_attr = $('.content-form-attribute',$element).html();
							var $html_color = $('.content-form-attribute-color',$element).html();
							var $element_mobile = $('.attribute-mobile-content');
							var $variation_id_mobile = $('.quick-shop[data-product_id="'+$product_id+'"]');
							$('.attribute-mobile-content').append($html_attr);
							$('.attribute-mobile-content').append($html_color);
							_load_attribute_card($element_mobile,$variation_id_mobile,false);
							$('.attribute-mobile-content').addClass('active');
							setTimeout(function() { 
								$('.attribute-mobile-content').addClass('show-content');
							}, 300);
						}
					});
					$(window).on("click.Bst", function(event){
						var $box = $('.attribute-mobile-content .form-attribute');
						var $box2 = $('.select-option-mobile');
						if ( $box.has(event.target).length == 0 && !$box.is(event.target) && $box2.has(event.target).length == 0 && !$box2.is(event.target) ) {
							if($('.attribute-mobile-content').hasClass('active')){
								$('.attribute-mobile-content').removeClass('show-content');
								setTimeout(function() { 
									$('.attribute-mobile-content').removeClass('active');
								}, 300);
							}
						}
					});
				}
			});
			_load_click_attribute_card = function ($element,$thisbutton) {
				var attribute = '';
				$(".attribute-card",$element).each(function(index){
					var $parent;
					$parent = $('.attribute-card.option-'+index,$element);
					if(index==0){
						attribute = $('.list-attribute.active',$parent).data('title');
					}else{
						attribute = attribute + ',' + $('.list-attribute.active',$parent).data('title');
					}
				});
				var $form = $thisbutton.closest('form.cart'),
					id = $thisbutton.val(),
					product_qty = $form.find('input[name=quantity]').val() || 1,
					product_id = $form.find('input[name=product_id]').val() || id,
					variation_id = $form.find('input[data-attributes="'+attribute+'"]').val() || 0;
				var data = {
					action: 'rappod_ajax_add_to_cart',
					product_id: product_id,
					product_sku: '',
					quantity: product_qty,
					variation_id: variation_id,
					security : rappod_ajax.ajax_nonce
				};
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: rappod_ajax.ajaxurl,
					data: data,
					complete: function (results) {
						$(document.body).trigger('wc_fragment_refresh');
						$thisbutton.removeClass('active');
						$('.product-wapper .single_add_to_cart_button').removeClass('active');
						var wd_width = _window.width();
						if(wd_width >= 1199){
							var $element = $(".rappod-topcart-desktop");
						}else{
							var $element = $(".rappod-topcart-mobile");
						}
						if( $element.hasClass("popup") ){
							$('.remove-cart-shadow').addClass('show');
							setTimeout(function(){$element.addClass('show');}, 200);
							_body.addClass("not-scroll");
						}else{
							$.ajax({
								url: rappod_ajax.ajaxurl,
								data: {
									"action" : "rappod_cartajax",
									"security" : rappod_ajax.ajax_nonce
								},
								success: function(results){
									$('.content-cart-popup').empty().html(results);
									if( !$(".content-cart-popup").hasClass("active") ){
										$(".content-cart-popup").addClass("active");
									}
									_ajax_cart_popup();
									_close_cart_popup();
								},
								error: function(errorThrown) { console.log(errorThrown); },
							});				
						}
						if(wd_width < 767){
							var $parent = $thisbutton.closest('.quick-shop.product-wapper');
							$('.attribute-mobile-content').empty();
							if($('.attribute-card.color',$parent).length > 0 ){
								$('.select-option-mobile',$parent).addClass('disabled');
							}
							$('.variable-atc').addClass('disabled');
							$('.single_add_to_cart_button').addClass('disabled');
							$('.list-attribute').removeClass('active');
						}
					},
				});
			};
			$('.single_add_to_cart_button',$('.form-variable')).on( "click", function(e) {
				e.preventDefault();
				if(! $(this).hasClass('disabled')){
					var $thisbutton = $(this);
					$thisbutton.addClass('active');
					if($(window).width() >= 767){
						var $element = $thisbutton.closest('.product-wapper.quick-shop');
						_load_click_attribute_card($element,$thisbutton);
					}else{
						var $parent = $thisbutton.closest('.product-wapper.quick-shop');
						if($('.attribute-card',$parent).length == 1 && $('.attribute-card',$parent).hasClass('color') ){
							var $element = $thisbutton.closest('.product-wapper.quick-shop');
						}else{
							var $element = $('.attribute-mobile-content');
						}
						_load_click_attribute_card($element,$thisbutton);
					}
				}
			});	
		}
	}
	function _click_login_ajax($element){
		$('form[data-login-ajax]',$element).on('submit', function(e){
			e.preventDefault();
			$('form[data-login-ajax] .button-login',$element).addClass("active");
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: rappod_ajax.ajaxurl,
				data: { 
					'action': 'rappod_login_ajax',
					'username': $('form[data-login-ajax] [data-username]',$element).val(), 
					'password': $('form[data-login-ajax] [data-password]',$element).val(),
					'security': $('form[data-login-ajax] #security',$element).val()
				},
				success: function(data){
					$('form[data-login-ajax] .button-login',$element).removeClass("active");
					if (data.loggedin == true){
						$('form[data-login-ajax] p.status',$element).html('<div class="woocommerce-message" role="alert">'+data.message+'</div>');
						document.location.href = rappod_ajax.redirecturl;
					}else{
						$('form[data-login-ajax] p.status',$element).addClass("error");
						$('form[data-login-ajax] p.status',$element).html('<ul class="woocommerce-error" role="alert"><li>'+data.message+'</li></ul>');
					}
				}
			});
		});
	}
	function _active_form_login(){
		$(".active-login").on( "click", function(e) {
			e.preventDefault();
			var $parent = $(this).closest('.login-header');
			if($('.form-login-register',$parent).hasClass('active')){
				$('.form-login-register',$parent).removeClass('active');
			}else{
				$('.form-login-register',$parent).addClass('active');	
			}
			_click_login_ajax($parent);
		});
		$(".overlay_form-login-register").on( "click", function() {
			if($('.form-login-register').hasClass('active')){
				$('.form-login-register').removeClass('active');
			}
		});
	}
	function _load_event_countdown(){
		$('.product-countdown').each(function(event){
			var $this = $(this);
			_event_countdown( $(this) );
		});	
	}
	function _click_quickview_button(){
		$('.quickview-button').on( "click", function(e) {
			e.preventDefault();
			var product_id  = $(this).data('product_id');
			$(".quickview-"+product_id).addClass("loading");
			$.ajax({
				url: rappod_ajax.ajaxurl,
				data: {
					"action" : "rappod_quickviewproduct",
					'product_id' : product_id,
					"security" : rappod_ajax.ajax_nonce
				},
				success: function(results) {
					$('.container-quickview .bwp-quick-view').empty().html(results);
					$(".quickview-"+product_id).removeClass("loading");
					if($(window).width() < 991){
						$("body").addClass("not-scroll");
					}
					$("#quickview-slick-carousel .slick-carousel").each(function(){
						_load_slick_carousel($(this));
					});
					if( typeof jQuery.fn.tawcvs_variation_swatches_form != 'undefined' ) {
						$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
							$('#quickview-slick-carousel .slick-carousel').slick('slickGoTo',0);
						});
					}
					if( $(".product-countdown",".bwp-quick-view").length >0 )
					_event_countdown( $(".product-countdown",".bwp-quick-view") );
					_event_quick_buy();
					_close_quickview();
					_event_change_variation();
					$('.container-quickview').addClass('show');
					setTimeout(function(){
						$('.container-quickview').addClass('show-content');
					}, 300);
				},
				error: function(errorThrown) { console.log(errorThrown); },
			});
		});
	}
	function _close_quickview(){
		$('.quickview-close').on( "click", function(e) {
			e.preventDefault();
			$('.container-quickview').removeClass("transition");
			$("body").removeClass("not-scroll");
			setTimeout(function(){
				$('.container-quickview').removeClass("show-content");
			}, 400);
			setTimeout(function(){
				$('.container-quickview').removeClass("show");
				$('.container-quickview .bwp-quick-view').empty();
			}, 700);
		});
		$('.quickview-overlay').on( "click", function(e) {
			e.preventDefault();
			$('.container-quickview').removeClass("transition");
			$("body").removeClass("not-scroll");
			setTimeout(function(){
				$('.container-quickview').removeClass("show-content");
			}, 400);
			setTimeout(function(){
				$('.container-quickview').removeClass("show");
				$('.container-quickview .bwp-quick-view').empty();
			}, 700);
		});
	}
	function _event_countdown($element){
		var $this = $element;
		var $id = $(this).data("id");		
		var $current_time 	= new Date().getTime();
		var $sttime 	= $(this).data('sttime');
		var $countdown_time = $this.data('cdtime');
		var $day = $this.data('day') ? $this.data('day') : "D";
		var $hour = $this.data('hour') ? $this.data('hour') : "H";
		var $min = $this.data('min') ? $this.data('min') : "M";
		var $sec = $this.data('sec') ? $this.data('sec') : "S";			
		var $austDay 	= new Date();
		$austDay 		= new Date( $countdown_time * 1000 );	
		if( $sttime > $current_time  ){
			$this.remove();
			return ;
		}
		if( $countdown_time.length > 0 && $current_time > $countdown_time ){
			$this.remove();
			return ;
		}
		if( $countdown_time.length <= 0 ){
			$this.remove();
			return ;
		}
		$this.countdown($austDay, function(event) {
			$(this).html(
				event.strftime(`
				  <span class="countdown-content">
					<span class="days">
						<span class="countdown-amount">%D</span>
					  	<span class="countdown-text">${$day}</span>
					</span>
					<span class="countdown-section hours">
						<span class="countdown-amount">%H</span>
					  	<span class="countdown-text">${$hour}</span>
					</span>
					<span class="countdown-section mins">
						<span class="countdown-amount">%M</span>
					  	<span class="countdown-text">${$min}</span>
					</span>
					<span class="countdown-section secs">
						<span class="countdown-amount">%S</span>
					  	<span class="countdown-text">${$sec}</span>
					</span>
				  </span>`
				)
			);
		}).on('finish.countdown', function(event){
			$this.remove();
			$id = $this.data( 'id' );
			$target = this;
			$this.hide('slow', function(){ $(this).remove(); });	
			$price = $this.data( 'price' );
			$('#' + $id + ' .item-price > span').hide('slow', function(){ $('#' + $id + ' .item-price > span').remove(); });					
			$('#' + $id + ' .item-price' ).append( '<span><span class="amount">' + $price + '</span></span>' );
		});	
	}
	function _drag_slider($element){
		var $wrap  = $element.parent();
		if(_window.width() >= 1200){
			var $width = Math.ceil($element.width()/($element.data("columns")));
		}else if( _window.width() < 1200 && _window.width() >= 998 ){
			var $width = Math.ceil($element.width()/($element.data("columns1")));
		}else if( _window.width() < 998 && _window.width() >= 768 ){
			var $width = Math.ceil($element.width()/($element.data("columns2")));
		}else{
			var $width = Math.ceil($element.width()/($element.data("columns3")));
		}
		$element.find('.item-product').css("width",$width);
		$element.find('.item-product-cat-content').css("width",$width);
		$element.find('.testimonial-content ').css("width",$width);
		var options = {
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
			prevPage: $wrap.find('.prev'),
			nextPage: $wrap.find('.next'),
			disabledClass: 'disabled'
		};
		$element.sly(options);
	}
	function _event_quick_buy(){
		var $form_cart = $('form.cart');
        if ($('.quick-buy',$form_cart).length <=0){
            return;
        }
        var $variations = $('.variations_form');
        $variations.on('show_variation', function (event,variation,allow){
            event.preventDefault();
            if (allow){
                $variations.find('.quick-buy').removeClass('disabled');
            }else{
                $variations.find('.quick-buy').addClass('disabled');
            }
        });		
        $variations.on('hide_variation', function (event){
            event.preventDefault();
            $variations.find('.quick-buy').addClass('disabled');
        });
		$('.quick-buy',$form_cart).on( "click", function(event){
			event.preventDefault();
            var $disabled = $(this).is(':disabled');
            if (!$disabled){
				$form_cart.append('<input type="hidden" name="quick_buy" value="1" />');
                $(this).parent().find('.single_add_to_cart_button').trigger('click');
            }
		});
	}
	function _event_change_variation(){
		if ( $('.bwp-single-info .variations').length > 0 ){
			var $element = $('.bwp-single-info .variations');
			$("select", $element).each(function(event){
				var val_active =$("option:selected", this).val();
				if(val_active){
					var txt =$("option:selected", this).text();
					var $parent =$(this).closest('.type_attribute');
					$(".label span",$parent).html(txt);
				}
			});
			$('select',$element).on('change', function(){
				var val =$("option:selected", this).val();
				if(val){
					var txt =$("option:selected", this).text();
				}else{
					var txt ='';
				}
				var $parent =$(this).closest('.type_attribute');
				$(".label span",$parent).html(txt);
			});
		}
	}
	function _event_countdown_product($element){
		$('.product-countdown',$element).each(function(event){
			var $this = $(this);
			var $id = $(this).data("id");		
			var $current_time 	= new Date().getTime();
			var $sttime 	= $(this).data('sttime');
			var $countdown_time = $this.data('cdtime');
			var $day = $this.data('day') ? $this.data('day') : "D";
			var $hour = $this.data('hour') ? $this.data('hour') : "H";
			var $min = $this.data('min') ? $this.data('min') : "M";
			var $sec = $this.data('sec') ? $this.data('sec') : "S";			
			var $austDay 	= new Date();
			$austDay 		= new Date( $countdown_time * 1000 );	
			if( $sttime > $current_time  ){
				$this.remove();
				return ;
			}
			if( $countdown_time.length > 0 && $current_time > $countdown_time ){
				$this.remove();
				return ;
			}
			if( $countdown_time.length <= 0 ){
				$this.remove();
				return ;
			}
			$this.countdown($austDay, function(event) {
				$(this).html(
					event.strftime('<span class="countdown-content"><span class="days"><span class="countdown-amount">%D</span><span class="countdown-text">'+$day+'</span></span><span class="countdown-section hours"><span class="countdown-amount">%H</span><span class="countdown-text">'+$hour+'</span></span><span class="countdown-section mins"><span class="countdown-amount">%M</span><span class="countdown-text">'+$min+'</span></span><span class="countdown-section secs"><span class="countdown-amount">%S</span><span class="countdown-text">'+$sec+'</span></span></span>')
				);
			}).on('finish.countdown', function(event){
				$this.remove();
				$id = $this.data( 'id' );
				$target = this;
				$this.hide('slow', function(){ $(this).remove(); });	
				$price = $this.data( 'price' );
				$('#' + $id + ' .item-price > span').hide('slow', function(){ $('#' + $id + ' .item-price > span').remove(); });			
				$('#' + $id + ' .item-price' ).append( '<span><span class="amount">' + $price + '</span></span>' );
			});			
		});
	}
	function _check_nav_slick($element){
		if($(".slick-arrow",$element).length > 0){
			var $prev = $(".fa-angle-left",$element).clone();
			$(".fa-angle-left",$element).remove();
			if($element.parent().find(".fa-angle-left").length == 0){
				$prev.prependTo($element.parent());
			}
			$prev.on('click', function(){
				$element.slick('slickPrev');
			});
			
			var $next =  $(".fa-angle-right",$element).clone();
			$(".fa-angle-right",$element).remove();
			if($element.parent().find(".fa-angle-right").length == 0){
				$next.appendTo($element.parent());
			}
			$next.on('click', function(){
				$element.slick('slickNext');
			}); 
		}else{
			$(".fa-angle-left",$element.parent()).remove();
			$(".fa-angle-right",$element.parent()).remove();			
		}	
	}
	class Elementor_Js_Rappod {
		static getInstance() {
			if (!Elementor_Js_Rappod.instance) {
				Elementor_Js_Rappod.instance = new Elementor_Js_Rappod();
			}
			return Elementor_Js_Rappod.instance;
		}
		constructor() {
			$(window).on('elementor/frontend/init', () => {
				this.init();
			});
		}
		init() {
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_product_categories.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
				let scrollElement     = $scope.find('.scroll-list');
				_drag_slider($(".list-categories",scrollElement));
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_product_template.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_product_list.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
				let scrollElement     = $scope.find('.scroll-list');
				_drag_slider($(".list-product",scrollElement));
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_filter_homepage.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
				let scrollElement     = $scope.find('.scroll-list');
				_drag_slider($(".list-product",scrollElement));
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_testimonial.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				slickElement.each(function(){
					_load_slick_carousel($(this));
				});
				let scrollElement     = $scope.find('.scroll-list');
				_drag_slider($(".list-testimonial",scrollElement));
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_brand.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_recent_post.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_countdown_product.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_ourteam.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_slider.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_lookbook.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_lookbook_slider.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_instagram.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_slider_homepage.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				_load_slick_carousel(slickElement);
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_image.default', ($scope) => {
				let slickElement     = $scope.find('.slick-carousel');
				slickElement.each(function(){
					_load_slick_carousel($(this));
				});
			});
		}
	}
	Elementor_Js_Rappod.getInstance();	

	//Filter Js//
	$.fn.binFilterProduct = function(opts) {
		/* default configuration */	
		var config = $.extend({}, {
			widget_id : null,
			taxonomy : null,
			id_taxonomy:null,
			base_url: null,
			attribute:null,
			showcount:null,
			show_price:null,
			relation:null,
			show_only_sale:null,
			show_in_stock:null,
			layout_shop:null,
			show_brand:null,
			array_value_url : null,
			canbeloaded : true,
			shop_paging:null,
		}, opts);
		$(document).ready(function(){
			_event_dropdown_filter();
			_event_filter_product();
			_event_click_pagination();
			if( $( "nav.woocommerce-pagination").hasClass("shop-loadmore") ){
				_event_click_load_more();
			}			
			if( $( "nav.woocommerce-pagination").hasClass("shop-infinity") ){
				_event_load_infinity();
			}
			_event_filter_clear();
			_event_click_taxonomies();
			_event_click_sub_categories();
			_event_replace_page_url();
			_toggle_categories_filter(true);
			$("li",".woocommerce-sort-count").on('click', function(){
				$("li",".woocommerce-sort-count").removeClass("active");
				$(this).addClass("active");
				_eventFilter();
				return false;
			});		

			$("li",".woocommerce-ordering").on('click', function(){
				_eventFilter();
				return false;
			});			

			var view_products = $(".display",".bwp-top-bar");
			$("a",view_products).on('click', function(e){
				e.preventDefault();
				if(!$(this).hasClass("active")){
					$("a",view_products).removeClass('active');
					var this_class	= $("ul.products").data("col");
					$(this).addClass('active');								
					_eventFilter();
				}
				return false;
			});

			$(".back-to-shop").on('click', function(){
				var $text = $(this).text();
				$(".text-title-heading").text($text);
				$("li",".woocommerce-product-subcategories").removeClass("active");
				$(".item-taxonomy",".filter_taxonomy_product").removeClass("active");
				$("input",config.widget_id).attr('checked', false);
				$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
				$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				config.id_taxonomy = 0;
				config.taxonomy = "product_cat";			
				_eventFilter(1,true,true,true);
				return false;
			});
			if($(".woocommerce-product-subcategorie-content").length > 0){
				$(".woocommerce-product-subcategorie-content").addClass('active');
			}
		});		
		function _toggle_categories_filter($arrow){
			var $root = $(".bwp-filter-category");
			var $current = $(".item-category.active.cat-parent",$root);
			var $active = $(".item-category.active",$root).closest('.item-category');
			if(!$current.hasClass('open')){
				$current.addClass('open');
				$("> .children",$current).slideToggle();
			}
			$(".cat-parent:not(.open) > .children",$root).slideUp();
			$(".open:not(.current-cat) > .children",$root).slideUp();
			$(".open:not(.current-cat)",$root).removeClass('open');
			$current.parent(".item-category").addClass('open');
			$("> .children",$current.parent(".item-category")).slideToggle();
			$( '.cat-parent',$root ).each(function(){
				var $element = $(this);
				if($(".children",$element).length > 0){
					if($arrow){
						$element.prepend('<label class="arrow"></label>');
						$(".arrow",$element).on( 'click', function(e) {
							e.preventDefault();
							$element.toggleClass('open').find( '> .children' ).stop().slideToggle();
						});			
					}
				}
			});
			if( $active.length > 0){
				$( $active.closest('.cat-parent') ).addClass('open');
				$( $active.closest('.children') ).slideDown('open');
			}
		}
		function _event_click_sub_categories(){
			var $subcategories = $(".woocommerce-product-subcategories");
			$("li",$subcategories).on('click', function(e){
				e.preventDefault();
				if($(this).hasClass("active")){
					return;
				}				
				$("li",$subcategories).removeClass("active");
				$(this).addClass("active");
				config.id_taxonomy = $(this).data("id_category");
				config.taxonomy = "product_cat";
				var $text = $(".woocommerce-loop-category__title a",$(this)).text();
				$(".text-title-heading").text($text);
				if( $(".filter_taxonomy_product").length > 0){
					var $parent = $(".filter_taxonomy_product");
					$(".item-taxonomy",$parent).removeClass("active");
					$(".item-taxonomy",$parent).removeClass("current-cat");
					$(".item-taxonomy",$parent).removeClass('open');
					$(".children",$parent).stop().slideUp(400);
					$(".item-category[data-id_item="+$(this).data("id_category")+"]",".filter_category_product").addClass('active').addClass('current-cat');
				}		
				$("input",config.widget_id).attr('checked', false);
				$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
				$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				_toggle_categories_filter();
				_eventFilter(1,true,true);
				return false;
			});
		}
		function _event_click_taxonomies(){
			var $taxonomies = $(".filter_taxonomy_product");
			$(".item-taxonomy a",$taxonomies).on('click', function(e){
				e.preventDefault();
				var $taxonomy = $(this).closest(".item-taxonomy");
				var $children = $taxonomy.parent(".children");
				
				if($taxonomy.hasClass("active")){
					return;
				}
				var $parent = $(this).closest(".filter_taxonomy_product");
				$(".item-taxonomy",".filter_taxonomy_product").removeClass("active");
				if(!$taxonomy.hasClass("open") && $children.length <= 0){
					$(".item-taxonomy",".filter_taxonomy_product").removeClass('open');
				}
				$(".cat-parent",$parent).removeClass('current-cat');
				$taxonomy.addClass("active");

				$($('.item-taxonomy.active').closest(".cat-parent")).addClass("current-cat");
				if($children.length > 0){
					$(".children",$children).stop().slideUp();
					_toggle_categories_filter();				
				}else if($taxonomy.hasClass("cat-parent")){
					$(".children",$parent).stop();
					_toggle_categories_filter();
				}else{
					$(".children",$parent).stop().slideUp();
					_toggle_categories_filter();
				}
				var $id_taxonomy = $taxonomy.data("id_item");
				var $text = $(".name",$(this)).text();
				$(".text-title-heading").text($text);
				if( $(".woocommerce-product-subcategories").length > 0){
					$("li",".woocommerce-product-subcategories").removeClass("active");
					$("li[data-id_category="+$id_taxonomy+"]",".woocommerce-product-subcategories").addClass('active');
				}
				config.taxonomy = $parent.data("taxonomy");
				config.id_taxonomy = $id_taxonomy;
				$("input",config.widget_id).attr('checked', false);
				$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
				$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				_eventFilter(1,true,true);
				return false;
			});
		}
		
		function _event_dropdown_filter(){
			var $form_filter = $(".bwp-woocommerce-filter-product",".filter_dropdown");
			var $form_filter2 = $("#bwp_form_filter_product",".filter_popup");
			$("h3",$form_filter).on('click', function(){
				if($(this).parent().hasClass("active")){
					$(this).parent().removeClass("active");
				}else{
					$(this).parent().addClass("active");
				}
			});
			$("h3",$form_filter2).on('click', function(){
				if($(this).parent().hasClass("active")){
					$(this).parent().removeClass("active");
				}else{
					$(this).parent().addClass("active");
				}
			});	
		}	
		
		function _event_filter_clear(){
			$(".filter_clear_all",".woocommerce-filter-title").on('click', function(){
				$("input",config.widget_id).attr('checked', false);
				$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
				$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				_eventFilter();
			});
			$("facet-remove").on('click', function(){
				if($(this).hasClass("facet-remove-price")){
					$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
					$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				}else{
					$("input",$(this).closest(".content_filter")).attr('checked', false);
				}
				_eventFilter();
			});			
		}

		function _event_replace_page_url(){
			$("a.page-numbers").each(function() {
				var href = $(this).attr('href');
				var url = (href).replace("page/","page=");
				$(this).attr('href',url);
			});		
		}
		
		function _event_click_pagination(){
			$( "nav.woocommerce-pagination a.page-numbers").on('click', function(e){
					e.preventDefault();
					$('ul.products','.main-archive-product').scrollTop(300);
					var status_id = $(this).attr('href').split('=');
					var paged = (status_id[1]) ? status_id[1] : 1;
					_eventFilter(paged);
				return false;
			});		
		}
		
		function _event_click_load_more(){
			$( "nav.woocommerce-pagination .woocommerce-load-more").on('click', function(e){
				$(this).addClass("active");
				e.preventDefault();
				var paged = $(this).data('paged') + 1;
				_eventFilter(paged,false,false,false,true);
				return false;
			});		
		}
		
		function _event_load_infinity(){
			$(window).on('scroll', function(){
				if ( $(document).scrollTop() > ( $(document).height() - 2000 ) && config.canbeloaded == true && $(".woocommerce-load-more").length > 0 ){
					$( "nav.woocommerce-pagination").addClass("active");
					var paged = $(".woocommerce-load-more").data('paged') + 1;
					_eventFilter(paged,false,false,false,true);
					return false;
				}
			});
		}
		
		function _event_filter_product(){
			var min_price = $("#price-filter-min-text",config.widget_id).val();
			var max_price =  $("#price-filter-max-text",config.widget_id).val();
			$("#bwp_slider_price").slider({
				range:true,
				min: $("#bwp_slider_price",config.widget_id).data('min'),
				max: $("#bwp_slider_price",config.widget_id).data('max'),		
				values: [min_price,max_price],
				slide : function( event, ui ) {
					$("#text-price-filter-min-text",config.widget_id).html(
						accounting.formatMoney( ui.values[0], {
							symbol:    $("#bwp_slider_price",config.widget_id).data('symbol'),
						})
					);
					$("#text-price-filter-max-text",config.widget_id).html(
						accounting.formatMoney( ui.values[1], {
							symbol:    $("#bwp_slider_price",config.widget_id).data('symbol'),
						})
					);
					$("#price-filter-min-text",config.widget_id).val(ui.values[0]);
					$("#price-filter-max-text",config.widget_id).val(ui.values[1]);		
				},
				change: function( event, ui ) {
					_eventFilter();	
					return false;
				}		   			
			});	

			$( "#button-price-slider",config.widget_id ).on('click', function(e){
				e.preventDefault();
				_eventFilter();
				return false;
			});	
			
			$("input:checkbox",config.widget_id ).on('click', function(){
				_eventFilter();	
				return false;
			});			
			
			$("li",config.widget_id ).on('click', function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$("input",$(this)).attr("checked", false);
				}else{
					$(this).addClass('active');
					$("input",$(this)).attr("checked", true);
				}	
				_eventFilter();	
				return false;
			});
			
			$("span",".woocommerce-filter-title" ).on('click', function(){
				if( $(this).hasClass("text-price") ){
					$("#price-filter-min-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('min'));
					$("#price-filter-max-text",config.widget_id).val($("#bwp_slider_price",config.widget_id).data('max'));
				}else{
					var $name = $(this).data("name");
					var $value = $(this).data("value");
					$("input[value="+$value+"]","#"+$name+"").attr("checked", false);
				}
				_eventFilter();
				return false;
			});			
		}	
		
		function _eventFilter(paged=1,load=true,direction=false,back=false,loadmore=false){
				if(load){
					$('html, body').animate({
						scrollTop: 300
					}, 300);		
					$('.content-products-list','.main-archive-product').addClass('active');
					$('.content-products-list','.main-archive-product').append( '<div class="loading loading-filter"></div>' );	
				}
				var $filter = new Object();			
				$filter.orderby 		=	$('.woocommerce-ordering').find('li.active').data("value");
				$filter.product_count 	=	$('.woocommerce-sort-count').find('li.active').data("value");	
				$filter.views			= 	($('.view-grid.active').length > 0) ?  'grid' : 'list';	
				$filter.data 			= 	$("#bwp_form_filter_product",config.widget_id).serializeArray();
				if( direction === false ){
					$filter.default_min_price 	= $("#bwp_slider_price",config.widget_id).data("min");
					$filter.default_max_price 	= $("#bwp_slider_price",config.widget_id).data("max");	
					$filter.min_price 			= $("#price-filter-min-text",config.widget_id).val();	
					$filter.max_price 			= $("#price-filter-max-text",config.widget_id).val();
				}
				$filter.paged				= paged;
				$filter.loadmore			= loadmore ? 1 : 0;
				$filter.shop_paging			= $('.woocommerce-pagination').data("shop_paging") ? $('.woocommerce-pagination').data("shop_paging") : 'shop-pagination';
				jQuery.ajax({
					type: "POST", 
					url: rappod_ajax.ajaxurl,
					dataType: 'json',
					data: {
						filter 			: $filter,
						action 			: "bwp_filter_products_callback",
						taxonomy		: config.taxonomy,
						id_taxonomy 	: config.id_taxonomy,
						base_url 		: config.base_url,
						attribute 		: config.attribute,
						relation 		: config.relation,
						show_price 		: config.show_price,
						showcount 		: config.showcount,
						show_only_sale 	: config.show_only_sale,
						show_in_stock 	: config.show_in_stock,
						show_brand 		: config.show_brand,
						show_type 		: config.show_type,
						layout_shop 	: config.layout_shop,
						show_category 	: config.show_category,
						shop_paging 	: config.shop_paging,
						array_value_url : config.array_value_url
					},
					beforeSend: function( xhr ){
						config.canbeloaded = false;
					},					
					success: function (result) {
						config.canbeloaded = true;
						if (result.products){
							if(loadmore){
								$('.content-products-list .products-list','.main-archive-product').append(result.products);
							}else{
								$('.content-products-list','.main-archive-product').html(result.products);
							}
							_click_quickview_button();
							_event_countdown_product( $('ul.products','.main-archive-product') );
							_click_atribute_image();
							_event_variable_thumb();
						}else{
							$('.content-products-list','.main-archive-product').html('');
						}
						
						if( config.taxonomy == 'product_cat'){
							if( config.id_taxonomy > 0){
								$(".back-to-shop").addClass("active");
							}else{
								$(".back-to-shop").removeClass("active");
							}					
						}
						
						if(direction){
							if ($(".page-title").data("bg_default")){
								if(result.result_background){
									$(".page-title").css("background-image", "url(" + result.result_background + ")");
								}else{
									$(".page-title").css("background-image", "url(" + $(".page-title").data("bg_default") + ")");
								}
							}
						}
						_event_after_sucsess_ajax(result,config);
						if(load){
							setTimeout(function() {
								$('.content-products-list','.main-archive-product').removeClass('active');
								$( '.loading','.main-archive-product' ).remove();
							}, 400);
						}
					},
					error:function(jqXHR, textStatus, errorThrown) {
						console.log("error " + textStatus);
						console.log("incoming Text " + jqXHR.responseText);
					}
				});
			return false;	
		}
		function _event_after_sucsess_ajax(result,config){
			if (result.pagination){
				if( $('nav.woocommerce-pagination').length > 0 ){
					$('nav.woocommerce-pagination').replaceWith(result.pagination);
				}else{
					$('.bwp-top-bar.bottom').append(result.pagination);
				}
			}else{
				$('nav.woocommerce-pagination').html('');
			}
			if (result.result_count) 
				$('.woocommerce-result-count').replaceWith(result.result_count);
			else
				$('.woocommerce-result-count').html('');
			if (result.total_html) 
				$('.woocommerce-found-posts').replaceWith(result.total_html);
			else
				$('.woocommerce-found-posts').html('');
			if (result.result_breadcrumb){
				$('.breadcrumb').html(result.result_breadcrumb);
			}
			$('.woocommerce-filter-title').html(result.result_title);
			$('.bwp-filter-ajax',config.widget_id).replaceWith(result.left_nav);
			if(($("#price-filter-min-text",config.widget_id).val() != $("#bwp_slider_price",config.widget_id).data("min")) || ($("#price-filter-max-text",config.widget_id).val() != $("#bwp_slider_price",config.widget_id).data("max")))
				var check_price = true;
			else
				var check_price = false;
			_event_dropdown_filter();
			_event_filter_product();
			_addClassProductList();
			_event_filter_clear();
			_event_click_pagination();
			if( $( "nav.woocommerce-pagination").hasClass("shop-loadmore") ){
				_event_click_load_more();
			}
			if( $( "nav.woocommerce-pagination").hasClass("shop-infinity") ){
				_event_load_infinity();
			}
			if (result.base_url != '') 
				history.pushState({}, "", result.base_url.replace(/&amp;/g, '&').replace(/%2C/g, ','));
		}
		function _addClassProductList(){
			var class_product_default = $("ul.products-list").data("col") ? $("ul.products-list").data("col") : "";
			var class_product_item = $('.view-grid.active').data('col') ? $('.view-grid.active').data('col') : class_product_default;
			if(class_product_item){
				var list_class 	= "col-lg-12 col-md-12 col-xs-12";	
				if($('.view-grid').hasClass('active')){
					$("ul.products-list").removeClass('list').addClass('grid');
					$("ul.products-list li").removeClass(list_class).addClass(class_product_item);
				}	
				if($('.view-list').hasClass('active')){
					$("ul.products-list").removeClass('grid').addClass('list');
					$("ul.products-list li").removeClass(class_product_item).addClass(list_class);
				}	
			}
		}
		return false;
	};
	
	//Element Filter Homepage Js//
	class Elementor_Js_Wpbingo {
		static getInstance() {
			if (!Elementor_Js_Wpbingo.instance) {
				Elementor_Js_Wpbingo.instance = new Elementor_Js_Wpbingo();
			}
			return Elementor_Js_Wpbingo.instance;
		}
		constructor() {
			$(window).on('elementor/frontend/init', () => {
				this.init();
			});
		}
		init() {
			elementorFrontend.hooks.addAction('frontend/element_ready/bwp_filter_homepage.default', ($scope) => {
				let bwpFilterHomepageElem     = $scope.find('.bwp-filter-homepage');
				bwpFilterHomepageElem.each(function() {
					var $element = $(this);
					$(".bwp-filter-toggle",$element).on('click', function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active');
							$(".bwp-filter-attribute",$element).slideUp();
						}else{
							$(this).addClass('active');	
							$(".bwp-filter-attribute",$element).slideDown();
						}	
					});	
					
					$("li[data-value]",$element).on('click', function(){
						var $parent = $(this).parent();
						if($parent.hasClass('filter-orderby')){
							var order_text = $(this).text();
							$('.text-orderby').html(order_text);
						}

						if($parent.hasClass('filter-category') || $parent.hasClass('filter-orderby'))
							$("li",$parent).removeClass('active');
						else
							$(this).removeClass('active');
						
						if($(this).hasClass('active')){
							$(this).removeClass('active');
						}else{
							$(this).addClass('active');
						}
						
						var count_loadmore = $(".count_loadmore",$element).data("default");
						$(".count_loadmore",$element).val(parseInt(count_loadmore));
						if($element.hasClass("tab-category") || $element.hasClass("tab-product") || $element.hasClass("tab-product-loadmore")){
							var $value = $(this).data("value");
							if( $(".content-products-"+$value,$element).length > 0 ){
								$('.content-product-list',$element).addClass("hidden");
								$(".content-products-"+$value,$element).removeClass("hidden");
							}else{
								_eventFilterHomePage($element);
							}
						}else{
							_eventFilterHomePage($element);
						}
					});	
					
					$(".loadmore",$element).on('click', function(){
						_eventFilterHomePage($element,true);
					});	
					
					
					$('.clear_all',$element).on('click', function(e){
						var $content_filter 	= $(".bwp-filter-attribute",$element);
						var bwp_slider_price 	= $(".bwp_slider_price",$element);
						$("li",$content_filter).removeClass('active'); 
						$(".price-filter-min-text",$element).val(bwp_slider_price.data("min"));
						$(".price-filter-max-text",$element).val(bwp_slider_price.data("max"));
						$(".text-price-filter-min-text",$element).html(bwp_slider_price.data("min"));
						$(".text-price-filter-max-text",$element).html(bwp_slider_price.data("max"));
						$(".ui-slider-range",bwp_slider_price).css({"left": "0px", "width": "100%"});
						$("span",bwp_slider_price).first().css("left","0px");
						$("span",bwp_slider_price).last().css("left","100%");
						_eventFilterHomePage($element); 
					});		
					
					var min_price = $(".price-filter-min-text",$element).val();
					var max_price =  $(".price-filter-max-text",$element).val();
					$(".bwp_slider_price",$element).slider({
					range:true,
					min: $(".bwp_slider_price",$element).data('min'),
					max: $(".bwp_slider_price",$element).data('max'),		
					values: [min_price,max_price],
					slide : function( event, ui ) {
							$(".text-price-filter-min-text",$element).html(ui.values[0]);
							$(".text-price-filter-max-text",$element).html(ui.values[1]);
							$(".price-filter-min-text",$element).val(ui.values[0]);		
							$(".price-filter-max-text",$element).val(ui.values[1]);		
						},
					change: function( event, ui ) {
						_eventFilterHomePage($element);		
					}
					
					});	
				});				
			});			
		}
	}
	Elementor_Js_Wpbingo.getInstance();

	function _eventFilterHomePage($element,loadmore = false){
			if(loadmore){
				$('.loadmore',$element).addClass('loading');
			}else{
				$('.bwp-filter-content',$element).addClass('active');
				$('.bwp-filter-content',$element).append('<div class="loading loading-filter"></div>');
			}
			var $filter = new Object();
			$filter.content_product = 	$element.data("content_product") ? $element.data("content_product") : "",
			$filter.category 		=	$(".filter-category li.active",$element).data("value");		
			$filter.orderby 		=	$(".filter-orderby li.active",$element).data("value");	
			$filter.min_price 		= 	$(".price-filter-min-text",$element).val();	
			$filter.max_price 		= 	$(".price-filter-max-text",$element).val();
			$filter.class_col 		= 	(!$element.hasClass("slider")) ? $element.data("class_col") : "";
			$filter.loadmore 		= 	(loadmore) ? 1 : 0;
			$filter.item_row 		= 	$(".products-list",$element).data("item_row") ? $(".products-list",$element).data("item_row") : 1;
			if(loadmore){
				$filter.paged 			= 	$(".count_loadmore",$element).val();
				$filter.product_count 	= 	$element.data("showmore");				
			}else{
				$filter.paged			=	1;
				$filter.product_count 	= 	$element.data("numberposts");
			}
			
			var atributes			=	$element.data("atributes");
			if(atributes){
				var atributes		=	atributes.split(',');	
				for(var i=0;i<atributes.length;i++){
					var atr = [];
					$("."+atributes[i]+" li.active",$element).each(function(index){
						atr[index] = $(this).data("value");
					});					
					$filter[atributes[i]] = atr;
				}						
			}	
		
			var brands  = [];
			$(".filter-brand li.active",$element).each(function(index){
				brands[index] = $(this).data("value");
			});
			
			$filter.brand = brands; 
			
			jQuery.ajax({
				type: "POST", 
				url: rappod_ajax.ajaxurl,
				dataType: 'json',
				data: {
					filter 			: $filter,
					action 			: "bwp_filter_homepage_callback",
				},
				success: function (result) {	
					if(loadmore){
						if (result.products)
							$('.products-list',$element).append(result.products);
						var count_loadmore = $(".count_loadmore",$element).val();
							$(".count_loadmore",$element).val(parseInt(count_loadmore) + 1);
					}else{
						if($element.hasClass("tab-category") || $element.hasClass("tab-product") || $element.hasClass("tab-category-loadmore") ){
							if($element.hasClass("tab-category") || $element.hasClass("tab-category-loadmore")){
								var $value = $filter.category;
							}else{
								var $value = $filter.orderby;
							}
							if($element.hasClass("scroll-list")){
								var $content_parent = $('.content-product-list',$element).first();
								var $content_child = $content_parent.children().clone();
								if (result.products){
									var $product_list = $('.products-list',$content_parent).clone().html(result.products);
								}else{
									var $product_list = $('.products-list',$content_parent).clone().html('');
								}
								$('.products-list',$content_child).replaceWith($product_list);
								$('.content-product-list',$element).addClass("hidden");
								$( ".content-product-list",$element).last().after( '<div class="content-product-list content-products-'+$value+'"></div>' );
								$(".content-products-"+$value,$element).html($content_child);
								var $parent = $(".content-products-"+$value,$element);
								$(".products-list",$parent).removeAttr("style");
								$(".handle",$parent).removeAttr("style");
								_drag_slider($(".list-product",$parent));
							}else{
								var $child_product = $('.content-product-list',$element).first();
								if (result.products){
									var $product_list = $('.products-list',$child_product).clone().html(result.products);
								}else{
									var $product_list = $('.products-list',$child_product).clone().html('');
								}
								$('.content-product-list',$element).addClass("hidden");
								$( ".content-product-list",$element).last().after( '<div class="content-product-list content-products-'+$value+'"></div>' );
								$(".content-products-"+$value,$element).html($product_list);
								var $parent = $(".content-products-"+$value,$element);
								if($element.hasClass("slider")){
									$(".products-list",$parent).removeClass("slick-slider slick-initialized");
									_load_slick_carousel($(".products-list",$parent));
									$(".products-list",$parent).slick('resize');
								}
							}
							_event_countdown_product($(".products-list",$parent));
						}else{
							if (result.products){
								$('.products-list',$element).html(result.products);
							}else{
								$('.products-list',$element).html('');
							}
							_event_countdown_product($(".products-list",$element));
							if($element.hasClass("slider")){
								$('.products-list',$element).removeClass("slick-slider slick-initialized");
								_load_slick_carousel($('.products-list',$element));
								_check_nav_slick($('.products-list',$element));
							}								
						}
						_click_atribute_image();
						_click_add_to_cart();
						_event_variable_thumb();
						_click_quickview_button();
					}
					
					if (result.loadmore && result.loadmore == 1)
						$(".products_loadmore",$element).show();
					else
						$(".products_loadmore",$element).hide();
					
					if(loadmore){
						$('.loadmore',$element).removeClass('loading');	
					}else{
						$('.bwp-filter-content',$element).removeClass('active');
						$('.loading',$element).remove();
					}
					var $content_filter = $(".bwp-filter-attribute",$element);

					if($("li.active",$content_filter).length > 0 || ($(".price-filter-min-text",$element).val() != $(".bwp_slider_price",$element).data("min"))  || ($(".price-filter-max-text",$element).val() != $(".bwp_slider_price",$element).data("max")))
						$(".clear_all",$element).show();
					else
						$(".clear_all",$element).hide();	
				},
				error:function(jqXHR, textStatus, errorThrown) {
					console.log("error " + textStatus);
					console.log("incoming Text " + jqXHR.responseText);
				}
			});
			
		return false;	
	}
	//Load more Product
	$( ".bwp_product_list.load_more" ).each(function() {
		var $element = $(this);
		$(".loadmore",$element).on('click', function(e) {
			e.preventDefault();
			var paged = $(".count_loadmore", $element).val();
			$.ajax({
				type: "POST", 
				url: $element.data("url"),
				dataType: 'json',
				data: {
					action 		: "bwp_load_more_callback",
					category 	:  $element.data("category"),			
					orderby 	:  $element.data("orderby"),
					order 		:  $element.data("order"),
					numberposts :  $element.data("numberposts"),
					source 		:  $element.data("source"),
					attributes 	:  $element.data("attributes"),
					total 		:  $element.data("total"),
					content_product : 	$element.data("content_product") ? $element.data("content_product") : "",
					paged 		: 	paged,
				},
				beforeSend: function() {
	                $('.loadmore',$element).addClass('loading');
	            },				
				success: function (result) {	
					if (result.products){
						$('.products-list',$element).append(result.products);
						paged = parseInt(paged) + 1;
						$('.count_loadmore',$element).val(paged);
						_event_countdown_product($(".products-list",$element));
					}
					if(result.check_loadmore == 1)
						$('.products_loadmore',$element).hide();
					 	$('.loadmore',$element).removeClass('loading');
				}
			});
		});	
	});
} )( jQuery );