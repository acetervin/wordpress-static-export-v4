( function( $ ) {
	//TITLE
	wp.customize('scroll_title_color', function(value) {
        value.bind(function(value) {
            $('.single-product .product_title').css('color',value);
        });
    });
	wp.customize('scroll_title_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .product_title').css('font-size',value +'px');
			$('.single-product .product_title').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_title_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .product_title').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_title_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .product_title').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_title_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .product_title').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_title_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .product_title').css('margin-left',value +'px');
        });
    });

    //BRAND
    wp.customize('scroll_brand_color', function(value) {
        value.bind(function(value) {
            $('.single-product .brands-single ul li a').css('color',value);
        });
    });
	wp.customize('scroll_brand_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 5;
            $('.single-product .brands-single').css('font-size',value +'px');
			$('.single-product .brands-single').css('line-height',line_height +'px');
			$('.single-product .brands-single .title-brand').css('font-size',value +'px');
        });
    });
	wp.customize('scroll_brand_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .brands-single').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_brand_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .brands-single').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_brand_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .brands-single').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_brand_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .brands-single').css('margin-left',value +'px');
        });
    });
	
	//PRICE
	wp.customize('scroll_price_color', function(value) {
        value.bind(function(value) {
            $('.single-product .entry-summary .price').css('color',value);
        });
    });
	wp.customize('scroll_price_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .entry-summary .price').css('font-size',value +'px');
			$('.single-product .entry-summary .price').css('line-height',line_height +'px');
			$('.single-product .entry-summary .price del').css('font-size',(value - 5) +'px');
			$('.single-product .entry-summary .price del').css('line-height',(Number(value)) +'px');
        });
    });
	wp.customize('scroll_price_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .entry-summary .price-single').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_price_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .entry-summary .price-single').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_price_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .entry-summary .price-single').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_price_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .entry-summary .price-single').css('margin-left',value +'px');
        });
    });
	
	//COUNT VIEW
	wp.customize('scroll_countview_color', function(value) {
        value.bind(function(value) {
            $('.single-product .product-count-view').css('color',value);
        });
    });
	wp.customize('scroll_countview_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .product-count-view').css('font-size',value +'px');
			$('.single-product .product-count-view').css('line-height',line_height +'px');
			$('.single-product .product-count-view .feather-eye').css('font-size',(Number(value) - 10 )+'px');
        });
    });
	wp.customize('scroll_countview_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .product-count-view').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_countview_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .product-count-view').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_countview_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .product-count-view').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_countview_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .product-count-view').css('margin-left',value +'px');
        });
    });
	
	//DESCRIPTION
	wp.customize('scroll_description_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .description').css('color',value);
        });
    });
	wp.customize('scroll_description_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .bwp-single-info .description').css('font-size',value +'px');
			$('.single-product .bwp-single-info .description').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_description_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .description').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_description_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .description').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_description_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .description').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_description_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .description').css('margin-left',value +'px');
        });
    });
	
	//COUNTDOWN
	wp.customize('scroll_countdown_color', function(value) {
        value.bind(function(value) {
			$('.single-product .countdown-single .title-countdown').css('color',value);
        });
    });
	wp.customize('scroll_countdown_color_time', function(value) {
        value.bind(function(value) {
            $('.single-product .countdown-single .product-countdown .countdown-content > span').css('color',value);
			$('.single-product .countdown-single .icon svg').css('fill',value);
        });
    });
	wp.customize('scroll_countdown_size', function(value) {
        value.bind(function(value) {
			$('.single-product .countdown-single .title-countdown').css('font-size',(Number(value)) +'px');
			$('.single-product .countdown-single .title-countdown').css('line-height',(Number(line_height) + 8) +'px');
        });
    });
	wp.customize('scroll_countdown_size_time', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .countdown-single .product-countdown .countdown-content > span').css('font-size',value +'px');
			$('.single-product .countdown-single .product-countdown .countdown-content > span').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_countdown_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .countdown-single').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .countdown-single').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .countdown-single').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .countdown-single').css('margin-left',value +'px');
        });
    });
	
	//STOCK
	wp.customize('scroll_stock_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock .quantity_stock').css('color',value);
        });
    });
	wp.customize('scroll_stock_stock_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock .quantity_stock span').css('color',value);
			$('.single-product .bwp-single-info .percent_quantity_stock .percent .content').css('background',value);
        });
    });
	wp.customize('scroll_stock_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .bwp-single-info .percent_quantity_stock').css('font-size',value +'px');
			$('.single-product .bwp-single-info .percent_quantity_stock').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_countdown_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_countdown_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .percent_quantity_stock').css('margin-left',value +'px');
        });
    });
	
	//ADD TO CART
	wp.customize('scroll_atc_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .single_add_to_cart_button.button').css('color',value);
        });
    });
	wp.customize('scroll_atc_bg', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .single_add_to_cart_button.button').css('background',value);
        });
    });
	wp.customize('scroll_atc_buynow_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .button.quick-buy').css('color',value);
        });
    });
	wp.customize('scroll_atc_buynow_bg', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .button.quick-buy').css('background',value);
			 $('.single-product .bwp-single-info .button.quick-buy').css('border-color',value);
        });
    });
	wp.customize('scroll_atc_size', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .button.quick-buy').css('font-size',value +'px');
			$('.single-product .bwp-single-info .single_add_to_cart_button.button').css('font-size',value +'px');
        });
    });
	wp.customize('scroll_atc_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .cart').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_atc_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .cart').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_atc_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .cart').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_atc_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .cart').css('margin-left',value +'px');
        });
    });
	
	//IMAGE CHECKOUT
	wp.customize('scroll_imagecheckout_bg', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout').css('background',value);
        });
    });
	wp.customize('scroll_imagecheckout_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout .title-safe-checkout').css('color',value);
        });
    });
	wp.customize('scroll_imagecheckout_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .bwp-single-info .safe-checkout .title-safe-checkout').css('font-size',value +'px');
			$('.single-product .bwp-single-info .safe-checkout .title-safe-checkout').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_imagecheckout_width', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout .title-safe-checkout').css('max-width',value +'px');
        });
    });
	wp.customize('scroll_imagecheckout_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_imagecheckout_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_imagecheckout_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_imagecheckout_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .safe-checkout').css('margin-left',value +'px');
        });
    });
	
	//DELIVERY
	wp.customize('scroll_delivers_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers').css('color',value);
			$('.single-product .bwp-single-info .product-shipping-delivers a').css('color',value);
			$('.single-product .bwp-single-info .product-shipping-delivers svg').css('fill',value);
			$('.single-product .bwp-single-info .product-shipping-delivers svg path').css('fill',value);
        });
    });
	wp.customize('scroll_delivers_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .bwp-single-info .product-shipping-delivers').css('font-size',value +'px');
			$('.single-product .bwp-single-info .product-shipping-delivers').css('line-height',line_height +'px');
        });
    });
	wp.customize('scroll_delivers_icon_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers li .content-info').css('background',value);
        });
    });
	wp.customize('scroll_delivers_icon_size', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers svg').css('font-size',value +'px');
        });
    });
	wp.customize('scroll_delivers_margin_top', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers').css('margin-top',value +'px');
        });
    });
	wp.customize('scroll_delivers_margin_right', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers').css('margin-right',value +'px');
        });
    });
	wp.customize('scroll_delivers_margin_bottom', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers').css('margin-bottom',value +'px');
        });
    });
	wp.customize('scroll_delivers_margin_left', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product-shipping-delivers').css('margin-left',value +'px');
        });
    });
	
	//INFORMATION
	wp.customize('scroll_infomation_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product_meta >span span').css('color',value);
			$('.single-product .bwp-single-info .product_meta >span a').css('color',value);
			$('.single-product .social-icon .social-share>a').css('color',value);
        });
    });
	wp.customize('scroll_infomation_label_color', function(value) {
        value.bind(function(value) {
            $('.single-product .bwp-single-info .product_meta >span').css('color',value);
			$('.single-product .social-icon label').css('color',value);
        });
    });
	wp.customize('scroll_infomation_size', function(value) {
        value.bind(function(value) {
			var line_height = Number(value) + 8;
            $('.single-product .bwp-single-info .product_meta').css('font-size',value +'px');
			$('.single-product .bwp-single-info .product_meta').css('line-height',line_height +'px');
			$('.single-product .social-icon').css('font-size',value +'px');
			$('.single-product .social-icon').css('line-height',line_height +'px');
        });
    });
} )( jQuery );