$(document).ready(function() {
    var view_products = $(".display");
    $("a", view_products).on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass("active")) {
            $("a", view_products).removeClass('active');
            $(this).addClass('active');
            
            var class_product_item = $(this).data('col');
            var products_list = $("ul.products");
            
            if ($(this).hasClass('view-grid')) {
                products_list.removeClass('list').addClass('grid');
                // Assuming we want to update the column classes on the list items
                $("li", products_list).removeClass(function(index, className) {
                    return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
                }).addClass(class_product_item);
            } else if ($(this).hasClass('view-list')) {
                products_list.removeClass('grid').addClass('list');
                $("li", products_list).removeClass(function(index, className) {
                    return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
                }).addClass("col-lg-12 col-md-12 col-xs-12");
            }
        }
    });
});
