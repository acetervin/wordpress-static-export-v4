$(document).ready(function() {
    var min_price = $("#price-filter-min-text").val();
    var max_price = $("#price-filter-max-text").val();
    $("#bwp_slider_price").slider({
        range: true,
        min: $("#bwp_slider_price").data('min'),
        max: $("#bwp_slider_price").data('max'),
        values: [min_price, max_price],
        slide: function(event, ui) {
            $("#text-price-filter-min-text").html(
                accounting.formatMoney(ui.values[0], {
                    symbol: $("#bwp_slider_price").data('symbol'),
                })
            );
            $("#text-price-filter-max-text").html(
                accounting.formatMoney(ui.values[1], {
                    symbol: $("#bwp_slider_price").data('symbol'),
                })
            );
            $("#price-filter-min-text").val(ui.values[0]);
            $("#price-filter-max-text").val(ui.values[1]);
        },
        change: function(event, ui) {
            // Trigger filter event here if needed
            console.log("Price changed:", ui.values);
        }
    });
});
