( function( $ ) {
	wp.customize('background_top_bar_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 #bwp-topbar').css('background',value);
        });
    });
	wp.customize('color_top_bar_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 #bwp-topbar').css('color',value);
        });
    });
	wp.customize('color_link_top_bar_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 #bwp-topbar a').css('color',value);
        });
    });
	wp.customize('padding_topbar_top_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 #bwp-topbar').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_topbar_right_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 #bwp-topbar').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_topbar_bottom_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 #bwp-topbar').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_topbar_left_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 #bwp-topbar').css('padding-left',value + 'px');
        });
    });
	wp.customize('header_color_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-wrapper').css('background',value);
        });
    });
	wp.customize('text_color_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-page-link .search-box .search-toggle').css('color',value);
			$('.bwp-header.header-v1 .block-top-link>.widget .widget-custom-menu .widget-title').css('color',value);
			$('.bwp-header.header-v1 .header-page-link .account > a').css('color',value);
			$('.bwp-header.header-v1 .header-page-link .wishlist-box a').css('color',value);
			$('.bwp-header.header-v1 .header-page-link .mini-cart .cart-icon').css('color',value);
        });
    });
    wp.customize('text_size_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-page-link div>a').css('font-size',value +'px');
            $('.bwp-header.header-v1 .header-page-link .search-box .search-toggle').css('font-size',value +'px');
            $('.bwp-header.header-v1 .header-page-link .mini-cart .cart-icon .icons-cart .text-cart').css('font-size',value +'px');
        });
    });
    wp.customize('search_color_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-page-link #searchsubmit2').css('background',value);
		});
    });
	wp.customize('menu_color_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .bwp-navigation ul>li.level-0>a').css('color',value);
        });
    });
	wp.customize('menu_size_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .bwp-navigation ul>li.level-0>a').css('font-size',value +'px');
        });
    });
	wp.customize('width_logo_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .wpbingoLogo img').css('max-width',value + 'px');
        });
    });
    wp.customize('spacing_logo_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .wpbingoLogo').css('margin-right',value + 'px');
        });
    });
    wp.customize('logo_pos_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-logo').removeClass('text-left');
            $('.bwp-header.header-v1 .header-logo').removeClass('text-right');
            $('.bwp-header.header-v1 .header-logo').removeClass('text-center');
            $('.bwp-header.header-v1 .header-logo').addClass(value);
        });
    });
	wp.customize('menu_pos_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-menu').removeClass('menu-left');
			$('.bwp-header.header-v1 .header-menu').removeClass('menu-right');
			$('.bwp-header.header-v1 .header-menu').removeClass('menu-center');
            $('.bwp-header.header-v1 .header-menu').addClass(value);
        });
    });
    wp.customize('menu_pos_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-container').removeClass('menu-left');
			$('.bwp-header.header-v1 .header-container').removeClass('menu-right');
			$('.bwp-header.header-v1 .header-container').removeClass('menu-center');
            $('.bwp-header.header-v1 .header-container').addClass(value);
        });
    });
    wp.customize('icon_pos_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-icon').removeClass('text-left');
            $('.bwp-header.header-v1 .header-icon').removeClass('text-right');
            $('.bwp-header.header-v1 .header-icon').removeClass('text-center');
            $('.bwp-header.header-v1 .header-icon').addClass(value);
        });
    });
    wp.customize('icon_pos_1', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v1 .header-page-link').removeClass('text-left');
            $('.bwp-header.header-v1 .header-page-link').removeClass('text-right');
            $('.bwp-header.header-v1 .header-page-link').removeClass('text-center');
            $('.bwp-header.header-v1 .header-page-link').addClass(value);
        });
    });
	wp.customize('padding_top_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-wrapper').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_right_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-wrapper').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_bottom_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-wrapper').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_left_1', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v1 .header-wrapper').css('padding-left',value + 'px');
        });
    });
	
	// HEADER 2
	wp.customize('background_top_bar_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 #bwp-topbar').css('background',value);
        });
    });
	wp.customize('color_top_bar_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 #bwp-topbar').css('color',value);
        });
    });
	wp.customize('color_link_top_bar_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 #bwp-topbar a').css('color',value);
        });
    });
	wp.customize('padding_topbar_top_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 #bwp-topbar').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_topbar_right_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 #bwp-topbar').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_topbar_bottom_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 #bwp-topbar').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_topbar_left_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 #bwp-topbar').css('padding-left',value + 'px');
        });
    });
	wp.customize('header_color_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .header-wrapper').css('background',value);
        });
    });
	wp.customize('icon_color_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .header-page-link #searchsubmit2').css('color',value);
			$('.bwp-header.header-v2 .block-top-link>.widget .widget-custom-menu .widget-title').css('color',value);
			$('.bwp-header.header-v2 .bwp-header .header-page-link .login-header>a').css('color',value);
			$('.bwp-header.header-v2 .header-page-link .wishlist-box a').css('color',value);
			$('.bwp-header.header-v2 .header-page-link .mini-cart .cart-icon').css('color',value);
        });
    });
    wp.customize('search_color_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .header-page-link #searchsubmit2').css('background',value);
		});
    });
	wp.customize('menu_color_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .bwp-navigation ul>li.level-0>a').css('color',value);
        });
    });
    wp.customize('menu_size_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .bwp-navigation ul>li.level-0>a').css('font-size',value +'px');
        });
    });
	wp.customize('width_logo_2', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v2 .wpbingoLogo img').css('max-width',value + 'px');
        });
    });
    wp.customize('menu_pos_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 .header-menu').removeClass('menu-left');
			$('.bwp-header.header-v2 .header-menu').removeClass('menu-right');
			$('.bwp-header.header-v2 .header-menu').removeClass('menu-center');
            $('.bwp-header.header-v2 .header-menu').addClass(value);
        });
    });
	wp.customize('padding_top_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 .header-wrapper').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_right_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 .header-wrapper').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_bottom_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 .header-wrapper').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_left_2', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v2 .header-wrapper').css('padding-left',value + 'px');
        });
    });
	
	
	// HEADER 3
	wp.customize('background_top_bar_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 #bwp-topbar').css('background',value);
        });
    });
	wp.customize('color_top_bar_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 #bwp-topbar').css('color',value);
        });
    });
	wp.customize('color_link_top_bar_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 #bwp-topbar a').css('color',value);
        });
    });
    wp.customize('color_icon_top_bar_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 #bwp-topbar a i').css('color',value);
        });
    });
	wp.customize('padding_topbar_top_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 #bwp-topbar').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_topbar_right_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 #bwp-topbar').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_topbar_bottom_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 #bwp-topbar').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_topbar_left_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 #bwp-topbar').css('padding-left',value + 'px');
        });
    });
	wp.customize('header_color_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .header-wrapper').css('background',value);
        });
    });
	wp.customize('icon_color_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .header-page-link .search-box .search-toggle').css('color',value);
			$('.bwp-header.header-v3 .block-top-link>.widget .widget-custom-menu .widget-title').css('color',value);
			$('.bwp-header.header-v3 .bwp-header .header-page-link .login-header>a').css('color',value);
			$('.bwp-header.header-v3 .header-page-link .wishlist-box a').css('color',value);
			$('.bwp-header.header-v3 .header-page-link .mini-cart .cart-icon').css('color',value);
        });
    });
	wp.customize('menu_color_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .bwp-navigation ul>li.level-0>a').css('color',value);
        });
    });
    wp.customize('menu_size_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .bwp-navigation ul>li.level-0>a').css('font-size',value +'px');
        });
    });
	wp.customize('width_logo_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .wpbingoLogo img').css('max-width',value + 'px');
        });
    });
    wp.customize('search_pos_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .header-left').removeClass('text-left');
            $('.bwp-header.header-v3 .header-left').removeClass('text-right');
            $('.bwp-header.header-v3 .header-left').removeClass('text-center');
            $('.bwp-header.header-v3 .header-left').addClass(value);
        });
    });
    wp.customize('menu_pos_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-menu').removeClass('menu-left');
			$('.bwp-header.header-v3 .header-menu').removeClass('menu-right');
			$('.bwp-header.header-v3 .header-menu').removeClass('menu-center');
            $('.bwp-header.header-v3 .header-menu').addClass(value);
        });
    });
    wp.customize('logo_pos_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-logo').removeClass('text-left');
			$('.bwp-header.header-v3 .header-logo').removeClass('text-right');
			$('.bwp-header.header-v3 .header-logo').removeClass('text-center');
            $('.bwp-header.header-v3 .header-logo').addClass(value);
        });
    });
    wp.customize('icon_pos_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .header-phone_icon').removeClass('text-left');
            $('.bwp-header.header-v3 .header-phone_icon').removeClass('text-right');
            $('.bwp-header.header-v3 .header-phone_icon').removeClass('text-center');
            $('.bwp-header.header-v3 .header-phone_icon').addClass(value);
        });
    });
    wp.customize('icon_pos_3', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v3 .header-page-link').removeClass('text-left');
            $('.bwp-header.header-v3 .header-page-link').removeClass('text-right');
            $('.bwp-header.header-v3 .header-page-link').removeClass('text-center');
            $('.bwp-header.header-v3 .header-page-link').addClass(value);
        });
    });
	wp.customize('padding_top_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-wrapper').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_right_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-wrapper').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_bottom_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-wrapper').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_left_3', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v3 .header-wrapper').css('padding-left',value + 'px');
        });
    });

	
	// HEADER 4
	wp.customize('background_top_bar_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 #bwp-topbar').css('background',value);
        });
    });
	wp.customize('color_top_bar_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 #bwp-topbar').css('color',value);
        });
    });
	wp.customize('color_link_top_bar_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 #bwp-topbar a').css('color',value);
        });
    });
	wp.customize('padding_topbar_top_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 #bwp-topbar').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_topbar_right_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 #bwp-topbar').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_topbar_bottom_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 #bwp-topbar').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_topbar_left_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 #bwp-topbar').css('padding-left',value + 'px');
        });
    });
	wp.customize('header_color_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .header-wrapper').css('background',value);
        });
    });
	wp.customize('icon_color_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .header-page-link .search-box .search-toggle').css('color',value);
			$('.bwp-header.header-v4 .block-top-link>.widget .widget-custom-menu .widget-title').css('color',value);
			$('.bwp-header.header-v4 .bwp-header .header-page-link .login-header>a').css('color',value);
			$('.bwp-header.header-v4 .header-page-link .wishlist-box a').css('color',value);
			$('.bwp-header.header-v4 .header-page-link .mini-cart .cart-icon').css('color',value);
        });
    });
	wp.customize('menu_color_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .bwp-navigation ul>li.level-0>a').css('color',value);
        });
    });
    wp.customize('menu_size_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .bwp-navigation ul>li.level-0>a').css('font-size',value +'px');
        });
    });
	wp.customize('width_logo_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .wpbingoLogo img').css('max-width',value + 'px');
        });
    });
    wp.customize('spacing_logo_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .wpbingoLogo').css('margin-right',value + 'px');
        });
    });
    wp.customize('menu_pos_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-menu').removeClass('menu-left');
			$('.bwp-header.header-v4 .header-menu').removeClass('menu-right');
			$('.bwp-header.header-v4 .header-menu').removeClass('menu-center');
            $('.bwp-header.header-v4 .header-menu').addClass(value);
        });
    });
    wp.customize('logo_pos_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-logo').removeClass('text-left');
			$('.bwp-header.header-v4 .header-logo').removeClass('text-right');
			$('.bwp-header.header-v4 .header-logo').removeClass('text-center');
            $('.bwp-header.header-v4 .header-logo').addClass(value);
        });
    });
    wp.customize('icon_pos_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .header-icon').removeClass('text-left');
            $('.bwp-header.header-v4 .header-icon').removeClass('text-right');
            $('.bwp-header.header-v4 .header-icon').removeClass('text-center');
            $('.bwp-header.header-v4 .header-icon').addClass(value);
        });
    });
    wp.customize('icon_pos_4', function(value) {
        value.bind(function(value) {
            $('.bwp-header.header-v4 .header-page-link').removeClass('text-left');
            $('.bwp-header.header-v4 .header-page-link').removeClass('text-right');
            $('.bwp-header.header-v4 .header-page-link').removeClass('text-center');
            $('.bwp-header.header-v4 .header-page-link').addClass(value);
        });
    });
	wp.customize('padding_top_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-wrapper').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_right_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-wrapper').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_bottom_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-wrapper').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_left_4', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-v4 .header-wrapper').css('padding-left',value + 'px');
        });
    });
	
	// MENU MOBILE
	wp.customize('background_menu_top', function(value) {
        value.bind(function(value) {
			$('.bwp-header.header-white .header-mobile').css('background',value );
            $('.bwp-header .header-mobile').css('background',value );
			$('.bwp-header.header-white.sticky .header-mobile > .container').css('background',value );
            $('.bwp-header.sticky .header-mobile > .container').css('background',value );
        });
    });
    wp.customize('width_logo_moble', function(value) {
        value.bind(function(value) {
            $('.bwp-header .header-mobile .wpbingoLogo img').css('max-width',value + 'px');
        });
    });
	wp.customize('color_menu_top', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile .navbar-toggle').css('color',value );
			$('.bwp-header .header-mobile .mini-cart .cart-icon').css('color',value );
        });
    });
    wp.customize('padding_top_moble', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile').css('padding-top',value + 'px');
        });
    });
	wp.customize('padding_right_moble', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile').css('padding-right',value + 'px');
        });
    });
	wp.customize('padding_bottom_moble', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile').css('padding-bottom',value + 'px');
        });
    });
	wp.customize('padding_left_moble', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile').css('padding-left',value + 'px');
        });
    });
	wp.customize('background_menu_bottom', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile .header-mobile-fixed').css('background',value );
        });
    });
	wp.customize('color_menu_bottom', function(value) {
        value.bind(function(value) {
			$('.bwp-header .header-mobile .header-mobile-fixed a').css('color',value );
			$('.bwp-header .header-mobile .header-mobile-fixed .search-toggle').css('color',value );
			$('.bwp-header .header-mobile .header-mobile-fixed .wishlist-box a').css('color',value );
        });
    });
	wp.customize('background_menu_mobile', function(value) {
        value.bind(function(value) {
			$('.content-mobile-menu').addClass('active');
			$('.content-mobile-menu .bwp-canvas-navigation .mm-menu').css('background',value );
			$('.content-mobile-menu').css('background',value );
			$('.content-mobile-menu .bwp-canvas-navigation .mm-menu div').css('background',value );
			$('.content-mobile-menu .content').css('background',value );
        });
    });
	wp.customize('color_menu_mobile', function(value) {
        value.bind(function(value) {
			$('.content-mobile-menu').addClass('active');
			$('.content-mobile-menu .bwp-canvas-navigation .mm-menu .sub-menu li > a:not(.mm-next)').css('color',value );
			$('.content-mobile-menu .bwp-canvas-navigation .mm-menu ul > li.level-0 > a:not(.mm-next)').css('color',value );
        });
    });
} )( jQuery );