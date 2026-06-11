import { addCustomer, getCustomers, editCustomer } from '../crud/index.js'
import { renderTable } from '../table/index.js';
import { headers } from '../const/customer.js'
import { refreshTable } from '../../main.js';
async function renderDialog(data = {}, isEdit = false) {
    /*
    * data: {
    *   id: number,
    *   name: string ...
    * }
    *
    * isEdit: bool
    * */

    // overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay active";

    // backdrop
    const backdrop = document.createElement("label");
    backdrop.className = "popup-backdrop";
    backdrop.addEventListener("click", () => overlay.remove());

    // form
    const form = document.createElement("form");
    form.className = "panel popup-content";

    // header
    const header = document.createElement("div");
    header.className = "panel-header";
    const title = document.createElement("h2");
    title.innerText = isEdit ? "Edit Customer" : "Add Customer";
    header.append(title);

    // body
    const body = document.createElement("div");
    body.className = "popup-body";
    const grid = document.createElement("div");
    grid.className = "form-grid";

    function makeInput(labelText, name, type = "text", full = false, value = "", placeholder = "") {
        const group = document.createElement("div");
        group.className = full ? "form-group full-width" : "form-group";
        const label = document.createElement("label");
        label.className = "form-label";
        label.innerText = labelText;
        const input = document.createElement("input");
        input.className = "form-input";
        input.placeholder = placeholder
        input.type = type;
        input.name = name;
        input.value = value || "";
        group.append(label, input);

        return group;
    };
    grid.append(
        makeInput("Company Name *", "companyName", "text", true, data.companyName, "e.g. Cty TNHH F8"),
        makeInput("Email Address", "email", "email", false, data.email, "contact@example.com"),
        makeInput("Phone Number", "phone", "tel", false, data.phone, "0987 654 321"),
        makeInput("Tax ID", "taxId", "text", true, data.taxId, "018381123412"),
        makeInput("Address", "address", "text", true, data.address, "Enter full address..."),
    );

    body.append(grid);

    // footer
    const footer = document.createElement("div");
    footer.className = "popup-footer";
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "btn btn-cancel";
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => overlay.remove());
    
    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "btn btn-save";
    saveBtn.innerText = isEdit ? "Save Customer" : "Create Customer";

    footer.append(cancelBtn, saveBtn)
    


    form.append(header, body, footer);
    overlay.append(backdrop, form);

    // xử lý submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));
        formData.status = "Active"
        console.log(formData);
        
        if (isEdit) {
            await editCustomer(data.id, formData);
        } else {
            await addCustomer(formData);
        }
        await refreshTable(headers)
        overlay.remove();

    });

    document.body.append(overlay);
    
}

export {
    renderDialog
}