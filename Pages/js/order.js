document.addEventListener("DOMContentLoaded", () => {
    const orderDetails = document.getElementById("order-details");
    const totalCostElement = document.getElementById("total-cost");
    const addMoreButton = document.getElementById("add-more");

    let orders = JSON.parse(localStorage.getItem("order")) || [];

    // Function to render the orders
    function renderOrders() {
        orderDetails.innerHTML = ""; // Clear previous orders
        let totalCost = 0;

        orders.forEach((order, index) => {
            const item = document.createElement("div");
            item.classList.add("order-item");

            item.innerHTML = `
                <h3>${order.name}</h3>
                <p>Price: PHP ${order.price}</p>
                <p>Quantity: 
                    <input type="number" min="1" value="${order.quantity}" data-index="${index}" class="quantity-input" />
                </p>
                <p>Subtotal: PHP ${order.price * order.quantity}</p>
                <button class="cancel-btn" data-index="${index}">X</button>
            `;
            orderDetails.appendChild(item);

            totalCost += order.price * order.quantity;
        });

        totalCostElement.textContent = totalCost.toFixed(2);
    }

    // Event listener to update quantity
    orderDetails.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            const newQuantity = parseInt(event.target.value);
            orders[index].quantity = newQuantity;
            localStorage.setItem("order", JSON.stringify(orders));
            renderOrders();
        }
    });

    // Event listener to cancel the order
    orderDetails.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel-btn")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            orders.splice(index, 1); // Remove the item from orders array
            localStorage.setItem("order", JSON.stringify(orders)); // Update localStorage
            renderOrders(); // Re-render the orders
        }
    });

    // Event listener for the "Add More" button
    addMoreButton.addEventListener("click", () => {
        window.location.href = "menu.html"; // Redirect to the menu page
    });

    renderOrders(); // Initial render of the orders
});
