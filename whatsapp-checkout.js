/**
 * Technical WhatsApp Checkout for Rappod Child Theme
 * Bridges the theme's native checkout form to WhatsApp.
 */

const whatsappCheckout = {
    phone: '254728708806',
    
    sendOrder() {
        // 1. Get Customer Details from Theme's Native Checkout Form
        const name = document.getElementById('billing_first_name')?.value || '';
        const email = document.getElementById('billing_email')?.value || '';
        const phone = document.getElementById('billing_phone')?.value || '';
        const address = document.getElementById('billing_address_1')?.value || '';
        const city = document.getElementById('billing_city')?.value || '';
        const notes = document.getElementById('order_comments')?.value || '';

        // 2. Get Cart Items from cartManager
        const cart = cartManager.getCart();
        if (cart.length === 0) return alert('Your cart is empty');

        // 3. Format Message
        let message = `*NEW ORDER - STATIONARYCENTRALDEPOT*%0A%0A`;
        message += `*Customer Details:*%0A`;
        message += `Name: ${name}%0A`;
        message += `Email: ${email}%0A`;
        message += `Phone: ${phone}%0A`;
        message += `Address: ${address}, ${city}%0A%0A`;

        message += `*Order Summary:*%0A`;
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}): KSh ${(item.price * item.quantity).toLocaleString('en-KE')}%0A`;
        });

        const total = cartManager.getTotal();
        message += `%0A*Total Amount: KSh ${total.toLocaleString('en-KE')}*%0A%0A`;
        
        if (notes) message += `*Notes:* ${notes}%0A`;
        message += `%0APlease confirm my order. Thank you!`;

        // 4. Redirect to WhatsApp
        const url = `https://wa.me/${this.phone}?text=${message}`;
        window.open(url, '_blank');
    }
};

// Hook into theme's "Place Order" button if on checkout page
document.addEventListener('DOMContentLoaded', () => {
    const placeOrderBtn = document.getElementById('place_order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            whatsappCheckout.sendOrder();
        });
    }
});
