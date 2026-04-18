function renderPagination(current, total, category) {
    const navs = document.querySelectorAll('.woocommerce-pagination');
    const catParam = category ? `&category=${encodeURIComponent(category)}` : '';
    
    let html = '<ul class="page-numbers">';
    
    if (current > 1) {
        html += `<li><a class="prev page-numbers" href="shop.html?paged=${current - 1}${catParam}">Prev</a></li>`;
    }

    for (let i = 1; i <= total; i++) {
        if (i === current) {
            html += `<li><span class="page-numbers current">${i}</span></li>`;
        } else if (i <= 3 || i >= total - 2 || (i >= current - 1 && i <= current + 1)) {
            html += `<li><a class="page-numbers" href="shop.html?paged=${i}${catParam}">${i}</a></li>`;
        } else if (i === 4 || i === total - 3) {
            html += `<li><span class="page-numbers dots">...</span></li>`;
        }
    }

    if (current < total) {
        html += `<li><a class="next page-numbers" href="shop.html?paged=${current + 1}${catParam}">Next</a></li>`;
    }
    
    html += '</ul>';
    
    navs.forEach(nav => nav.innerHTML = html);
}
