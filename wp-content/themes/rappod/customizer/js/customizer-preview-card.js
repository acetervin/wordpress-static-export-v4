( function( $ ) {
	wp.customize('color_title_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content h3.product-title a').css('color',value);
        });
    });
	wp.customize('size_title_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content h3.product-title').css('font-size',value +'px');
        });
    });
	wp.customize('color_price_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content .price').css('color',value);
			$('.products-list.grid .product-wapper.content-product1 .products-content .price ins').css('color',value);
        });
    });
	wp.customize('color_price_sale_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content .price del').css('color',value);
        });
    });
	wp.customize('color_price_sale_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content .price del').css('color',value);
        });
    });
	wp.customize('size_price_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product1 .products-content .price').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product1 .products-content .price ins').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product1 .products-content .price del').css('font-size',(value - 2) +'px');
        });
    });
	wp.customize('color_sale_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product1 .product-lable .onsale').css('color',value);
        });
    });
	wp.customize('background_sale_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product1 .product-lable .onsale').css('background',value);
        });
    });
	wp.customize('color_hot_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product1 .product-lable .hot').css('color',value);
        });
    });
	wp.customize('background_hot_1', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product1 .product-lable .hot').css('background',value);
        });
    });
	
	// CARD 2
	wp.customize('color_qv_button_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .products-thumb .btn-quickview .product-quickview > a').css('color',value);
        });
    });
	wp.customize('background_qv_button_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .products-thumb .btn-quickview .product-quickview > a').css('background',value);
        });
    });
	wp.customize('color_title_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content h3.product-title a').css('color',value);
        });
    });
	wp.customize('size_title_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content h3.product-title').css('font-size',value +'px');
        });
    });
	wp.customize('color_price_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content .price').css('color',value);
			$('.products-list.grid .product-wapper.content-product2 .products-content .price ins').css('color',value);
        });
    });
	wp.customize('color_price_sale_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content .price del').css('color',value);
        });
    });
	wp.customize('color_price_sale_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content .price del').css('color',value);
        });
    });
	wp.customize('size_price_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product2 .products-content .price').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product2 .products-content .price ins').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product2 .products-content .price del').css('font-size',(value - 2) +'px');
        });
    });
	wp.customize('color_sale_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .product-lable .onsale').css('color',value);
        });
    });
	wp.customize('background_sale_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .product-lable .onsale').css('background',value);
        });
    });
	wp.customize('color_hot_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .product-lable .hot').css('color',value);
        });
    });
	wp.customize('background_hot_2', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product2 .product-lable .hot').css('background',value);
        });
    });
	
	// CARD 3
	wp.customize('color_title_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content h3.product-title a').css('color',value);
        });
    });
	wp.customize('size_title_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content h3.product-title').css('font-size',value +'px');
        });
    });
	wp.customize('color_price_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content .price').css('color',value);
			$('.products-list.grid .product-wapper.content-product4 .products-content .price ins').css('color',value);
        });
    });
	wp.customize('color_price_sale_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content .price del').css('color',value);
        });
    });
	wp.customize('color_price_sale_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content .price del').css('color',value);
        });
    });
	wp.customize('size_price_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product4 .products-content .price').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product4 .products-content .price ins').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product4 .products-content .price del').css('font-size',(value - 2) +'px');
        });
    });
	wp.customize('color_sale_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product4 .product-lable .onsale').css('color',value);
        });
    });
	wp.customize('background_sale_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product4 .product-lable .onsale').css('background',value);
        });
    });
	wp.customize('color_hot_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product4 .product-lable .hot').css('color',value);
        });
    });
	wp.customize('background_hot_3', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product4 .product-lable .hot').css('background',value);
        });
    });
	
	// CARD 4
	wp.customize('color_title_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content h3.product-title a').css('color',value);
        });
    });
	wp.customize('size_title_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content h3.product-title').css('font-size',value +'px');
        });
    });
	wp.customize('color_price_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content .price').css('color',value);
			$('.products-list.grid .product-wapper.content-product3 .products-content .price ins').css('color',value);
        });
    });
	wp.customize('color_price_sale_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content .price del').css('color',value);
        });
    });
	wp.customize('color_price_sale_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content .price del').css('color',value);
        });
    });
	wp.customize('size_price_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product3 .products-content .price').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product3 .products-content .price ins').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product3 .products-content .price del').css('font-size',(value - 2) +'px');
        });
    });
	wp.customize('color_sale_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product3 .product-lable .onsale').css('color',value);
        });
    });
	wp.customize('background_sale_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product3 .product-lable .onsale').css('background',value);
        });
    });
	wp.customize('color_hot_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product3 .product-lable .hot').css('color',value);
        });
    });
	wp.customize('background_hot_4', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product3 .product-lable .hot').css('background',value);
        });
    });

    // CARD 5
    wp.customize('color_title_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content h3.product-title a').css('color',value);
        });
    });
	wp.customize('size_title_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content h3.product-title').css('font-size',value +'px');
        });
    });
	wp.customize('color_price_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content .price').css('color',value);
			$('.products-list.grid .product-wapper.content-product5 .products-content .price ins').css('color',value);
        });
    });
	wp.customize('color_price_sale_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content .price del').css('color',value);
        });
    });
	wp.customize('color_price_sale_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content .price del').css('color',value);
        });
    });
	wp.customize('size_price_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .product-wapper.content-product5 .products-content .price').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product5 .products-content .price ins').css('font-size',value +'px');
			$('.products-list.grid .product-wapper.content-product5 .products-content .price del').css('font-size',(value - 2) +'px');
        });
    });
	wp.customize('color_sale_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product5 .product-lable .onsale').css('color',value);
        });
    });
	wp.customize('background_sale_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product5 .product-lable .onsale').css('background',value);
        });
    });
	wp.customize('color_hot_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product5 .product-lable .hot').css('color',value);
        });
    });
	wp.customize('background_hot_5', function(value) {
        value.bind(function(value) {
            $('.products-list.grid .content-product5 .product-lable .hot').css('background',value);
        });
    });
} )( jQuery );