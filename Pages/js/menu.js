document.addEventListener("DOMContentLoaded", () => {
    const orderButtons = document.querySelectorAll(".order-btn");

    orderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const menuItem = button.closest(".menu-item");
            const name = menuItem.getAttribute("data-name");
            const price = parseFloat(menuItem.getAttribute("data-price"));

            const orderData = {
                name,
                price,
                quantity: 1
            };

            const existingOrder = JSON.parse(localStorage.getItem("order")) || [];
            existingOrder.push(orderData);
            localStorage.setItem("order", JSON.stringify(existingOrder));

            window.location.href = "order.html";
        });
    });
});
