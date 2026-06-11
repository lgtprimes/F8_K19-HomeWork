import { renderTable } from "../table/index.js";
async function getCustomers() {
    try {
        const response = await fetch('http://localhost:3000/customers')
        return await response.json()
    } catch {
        alert('get data failed')
    }
}

async function addCustomer(obj) {
    try {
        const customers = await getCustomers();
        const newCustomer = { ...obj };

        const response = await fetch("http://localhost:3000/customers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCustomer)
        });
        return await response.json();
    } catch(error) {
        alert("Add customer failed: " + error.message);
    }
}

async function editCustomer(id, data) {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch(error) {
        alert("Edit customer failed: " + error.message);
    }
}

async function deleteCustomer(id) {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    } catch(error) {
        alert("Delete customer failed: " + error.message);
    }
}

export { getCustomers, addCustomer, editCustomer, deleteCustomer }