import { renderTable, headers, renderDialog, getCustomers } from './utils/index.js'
import { deleteCustomer } from './utils/index.js'



const addBtn = document.querySelector("#btn-create");
const cancelBtn = document.querySelector(".btn-cancel");

async function refreshTable(headers) {
    const customers = await getCustomers();
    const panelBody = document.querySelector('.panel-body');
    panelBody.innerHTML = "";
    panelBody.append(renderTable(headers, customers));


    
}

function attachListeners() {
    const panelBody = document.querySelector('.panel-body');
    // EDIT
    panelBody.addEventListener("click", async (e) => {
        const editBtn = e.target.closest(".edit-action");
        if(editBtn) {
            const rowElement = editBtn.closest("tr");
            const id = rowElement.dataset.id;

            const customers = await getCustomers();
            const customer = customers.find(c => c.id == id);

            if (customer) {
                renderDialog(customer, true);
            }
        }
        
    });

    //DELETE
    panelBody.addEventListener("click", async (e) => {
        const delBtn = e.target.closest(".delete-action");
        if(delBtn) {
            const rowElement = delBtn.closest("tr");
            const rowIndex = rowElement.dataset.id;
            deleteCustomer(rowIndex);
            await refreshTable(headers);
        }
    })
}

async function init() {
    const customers = await getCustomers()

    await refreshTable(headers);
    attachListeners();
    addBtn.addEventListener("click", renderDialog);
}

init()

export { refreshTable }