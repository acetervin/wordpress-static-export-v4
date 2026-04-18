$(document).ready(function() {
    _load_slick_carousel($(".woocommerce-product-subcategories.slick-carousel"));

    function _load_slick_carousel($element, $move_nav = true) {
        $element.slick({
            arrows: $element.data("nav") ? true : false,
            dots: $element.data("dots") ? true : false,
            draggable: $element.data("draggable") ? false : true,
            infinite: $element.data("infinite") ? false : true,
            autoplay: $element.data("autoplay") ? true : false,
            prevArrow: '<i class="slick-arrow fa fa-angle-left"></i>',
            slidesToScroll: $element.data("slidestoscroll") ? $element.data("columns") : 1,
            nextArrow: '<i class="slick-arrow fa fa-angle-right"></i>',
            slidesToShow: $element.data("columns"),
            asNavFor: $element.data("asnavfor") ? $element.data("asnavfor") : false,
            vertical: $element.data("vertical") ? true : false,
            verticalSwiping: $element.data("verticalswiping") ? $element.data("verticalswiping") : false,
            rtl: ($('body').hasClass("rtl") && !$element.data("vertical")) ? true : false,
            centerMode: $element.data("centermode") ? $element.data("centermode") : false,
            centerPadding: $element.data("centerpadding") ? $element.data("centerpadding") : false,
            focusOnSelect: $element.data("focusonselect") ? $element.data("focusonselect") : false,
            fade: ($element.data("fade") && !$('body').hasClass("rtl")) ? true : false,
            cssEase: 'linear',
            autoplaySpeed: 5000,
            pauseOnHover: true,
            pauseOnFocus: false,
            responsive: [{
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
                        verticalSwiping: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: $element.data("columns4"),
                        slidesToScroll: $element.data("columns4"),
                        vertical: false,
                        verticalSwiping: false,
                    }
                }
            ]
        });
        _move_nav_slick($element);
    }

    function _move_nav_slick($element) {
        if ($(".slick-arrow", $element).length > 0) {
            if ($(".fa-angle-left", $element).length > 0) {
                var $prev = $(".fa-angle-left", $element).clone();
                $(".fa-angle-left", $element).remove();
                if ($element.parent().find(".fa-angle-left").length == 0) {
                    $prev.prependTo($element.parent());
                }
                $prev.on("click", function() {
                    $element.slick('slickPrev');
                });
            }
            if ($(".fa-angle-right", $element).length > 0) {
                var $next = $(".fa-angle-right", $element).clone();
                $(".fa-angle-right", $element).remove();
                if ($element.parent().find(".fa-angle-right").length == 0) {
                    $next.appendTo($element.parent());
                }
                $next.on("click", function() {
                    $element.slick('slickNext');
                });
            }
        }
    }
});
