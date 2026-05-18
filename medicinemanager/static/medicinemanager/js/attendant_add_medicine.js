// Basic toggle modal function for the redesigned UI
function toggleModal(show) {
    const modal = document.getElementById('myModal');
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

var medicineIds = [];


function deleteSelectedMedicines()
{

    var tableRow;
    
    for (var eachMedicineId of medicineIds)
    {
        tableRow = document.getElementById(`medicine_${eachMedicineId}`);
        tableRow.parentNode.removeChild(tableRow);
    }
    toggleModal(false);
}


function updateSelected()
{
    document.getElementById("delete-button").disabled = (document.querySelectorAll(".table-checkbox:checked").length < 1);
}


function deleteSelected()
{
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalFooter = document.getElementById("modal-footer");

    modalTitle.innerHTML = "Confirm deletion";
    modalBody.innerHTML = "<h6 class=\"text-l\">Are you sure you wish to delete the following Medicines?</h6>"
                         + "<ul class=\"list-disc\">";
    var medicineName;
    for (var checkbox of document.querySelectorAll(".table-checkbox:checked"))
    {
        medicineIds.push(checkbox.value);
        medicineName = document.getElementById("medicine_" + checkbox.value).childNodes[3].innerHTML;
        modalBody.innerHTML += (`
            <li>${medicineName}</li>
            `);
    }

    modalBody.innerHTML += "</ul>"

    modalFooter.innerHTML = `
    <button type="button" class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 btn-success-custom text-base font-bold text-white hover:opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onclick="toggleModal(false)">Close</button>
    <button type="button" class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 btn-danger-custom text-base font-bold text-white hover:opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onclick="deleteSelectedMedicines()">Delete</button>
    `;

    toggleModal(true);    
}


function selectAll(masterCheckBox)
{
    for (var checkbox of document.querySelectorAll(".table-checkbox"))
    {
        checkbox.checked = masterCheckBox.checked;
    }

    document.getElementById("delete-button").disabled = !masterCheckBox.checked;
}


document.addEventListener('DOMContentLoaded', () => {
    /*
    *----------------------------------*
    *                                  *
    *    Add Medicine Image Section    *
    *                                  *
    *----------------------------------*
    */

    document.getElementById('add-images-button').addEventListener('click', () => {
        let new_count = document.querySelectorAll('#medicine-images-body div.flex.flex-col').length + 1;
        const medicineImagesBody = document.getElementById("medicine-images-body");
        let wrapper = document.createElement("div");
        wrapper.className = "flex flex-col";

        let label = document.createElement("label");
        label.setAttribute("for", "id_medicine_image" + new_count);
        label.className = "medicine-image-label text-sm font-semibold text-gray-600 mb-2"
        label.innerHTML = "Medicine Image " + new_count;

        let fieldWrapper = document.createElement("div");
        fieldWrapper.className = "flex justify-start items-center";

        let medicineInputField = document.createElement("input");
        medicineInputField.name = "medicine_image_" + new_count;
        medicineInputField.id = "id_medicine_image_" + new_count;
        medicineInputField.type = "file"
        medicineInputField.accept = "image/*";
        medicineInputField.className = "medicine-image-upload medicine-image-input block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all"

        let medicineImageDeleteButton = document.createElement("i");
        medicineImageDeleteButton.id = "medicine_image_delete_" + new_count;
        medicineImageDeleteButton.className = "medicine-image-delete-button fa-solid fa-circle-xmark text-red-500 cursor-pointer";

        medicineImageDeleteButton.addEventListener('click', (e) => {
            document.getElementById("medicine-images-body").removeChild(e.target.parentNode.parentNode);

            let labels = document.getElementsByClassName("medicine-image-label");
            let inputs = document.getElementsByClassName("medicine-image-input");
            let medicine_image_delete_buttons = document.getElementsByClassName("medicine-image-delete-button");
            for (var i=0; i<labels.length; i++)
            {
                labels[i].innerHTML = `Medicine Image ${i + 2}`;
                labels[i].id = `label_medicine_image_${i + 2}`;
                inputs[i].id = `id_medicine_image_${i + 2}`;
                inputs[i].name = `medicine_image_${i + 2}`;
                medicine_image_delete_buttons[i].id = `medicine_image_delete_${i + 2}`;
            }
        });


        fieldWrapper.appendChild(medicineInputField);
        fieldWrapper.appendChild(medicineImageDeleteButton);

        wrapper.appendChild(label);
        wrapper.appendChild(fieldWrapper);

        medicineImagesBody.appendChild(wrapper);
    });



    /*
    *-------------------------------------*
    *                                     *
    *    Medicine Manufacturer Section    *
    *                                     *
    *-------------------------------------*
    */
    const manufacturerField = document.getElementById("id_manufacturer_name");
    const dropdown = document.getElementById("search_field_options_id_manufacturer_name");
    const list = document.getElementById("search_field_options_id_manufacturer_name_list");

    let manufacturerFieldUpdateTimer;
    let options = new Map();
    options.set('Beximco', 4);
    options.set('Incepta Pharma', 3);
    options.set('Ibn Sina', 3);
    options.set('Healthcare', 3);

    manufacturerField.addEventListener('keyup', (event) => 
    {
        if (event.target.value.length)
        {
            if (manufacturerFieldUpdateTimer)
            {
                clearTimeout(manufacturerFieldUpdateTimer);
            }
            manufacturerFieldUpdateTimer = setTimeout(() => {

                list.innerHTML = "";
                var matchingOptions = Array.from(options.keys()).filter((eachOption) => eachOption.toLowerCase().includes(event.target.value.toLowerCase()));
               
                if (matchingOptions)
                {
                    matchingOptions.forEach(item => {
                        const li = document.createElement("li");
                        li.className = "px-5 py-2.5 cursor-pointer dropdown-item transition-colors font-medium text-gray-700 hover:bg-green-700 hover:text-white transition-all";
                        li.textContent = item;

                        li.addEventListener('mousedown', (e) => {
                            event.target.value = item;
                            dropdown.classList.remove('visible');
                        });

                        list.appendChild(li);

                        if (!dropdown.classList.contains('visible'))
                        {
                            dropdown.classList.add('visible');
                        }
                    });
                } 
                else
                {
                    list.innerHTML = '<span class="px-5 py-2.5">No matching Manufacturers found</span>';
                    if (!dropdown.classList.contains("visible"))
                    {
                        dropdown.classList.add("visible");
                    }
                }
                
                
            }, 1000);
        }
        else
        {
            dropdown.classList.remove('visible');
        }
    }
    );

    manufacturerField.addEventListener('blur', () => dropdown.classList.remove('visible'));
    manufacturerField.addEventListener('focusout', () => dropdown.classList.remove('visible'));

    /*
    *-------------------------------------*
    *                                     *
    *      Add Manufacturer Section       *
    *                                     *
    *-------------------------------------*
    */


    // Modal Elements
    const modal = document.getElementById('add_manufacturer_modal');
    const modalContainer = modal.querySelector('.modal-container');
    const closeModalBtn = document.getElementById('close_modal_btn');
    const newNameInput = document.getElementById('new_manufacturer_input');

    // --- Modal Logic ---
    function showModal()
    {
        modal.classList.remove('invisible', 'opacity-0');
        modalContainer.classList.remove('scale-90');
        modalContainer.classList.add('scale-100');
        newNameInput.focus();
    };

    
    function hideModal()
    {
        modal.classList.add('opacity-0');
        modalContainer.classList.add('scale-90');
        modalContainer.classList.remove('scale-100');
        setTimeout(() => {
            modal.classList.add('invisible');
            newNameInput.value = "";
        }, 300);
    };

    document.getElementById("add_manufacturer_link").addEventListener("click", () => {
        showModal();
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    closeModalBtn.addEventListener('click', hideModal);

    const addNewManufacturerButton = document.getElementById("add-new-manufacturer-button");


    // Add New Manufacturer
    addNewManufacturerButton.addEventListener("click", () => {
        const newManufacturerName = document.getElementById("new_manufacturer_input").value;
        
        if (newManufacturerName.length < 4)
        {
            console.log("Manufacturer name length error");
            return;
        }
        
        document.getElementById("id_manufacturer_name").value = newManufacturerName;
        options.set(newManufacturerName, -1);
        hideModal();
    });


    /*
    *-------------------------------------------*
    *                                           *
    *       Units and Containers Handling       *
    *                                           *
    *-------------------------------------------*
    */

    const small_unit_type_select2 = document.getElementById("id_small_unit_type2");
    const small_unit_per_small_container_div = document.getElementById("small_unit_per_small_container");
    const small_container_per_large_container_div = document.getElementById("small_container_per_large_container");
    document.getElementById("id_small_unit_type").addEventListener('change', (event) => {
        switch (event.target.value)
        {
            case 'CAP':
                console.log("Capsule Selected");
                small_unit_type_select2.value = 2;
                small_unit_per_small_container_div.style.display = "grid";
                small_container_per_large_container_div.style.display = "grid";
                break;
            case 'TAB':
                console.log("Tablet Selected");
                small_unit_type_select2.value = 1;
                small_unit_per_small_container_div.style.display = "grid";
                small_container_per_large_container_div.style.display = "grid";
                break;
            default:
                console.log("Selected:", event.target.value);
                small_unit_per_small_container_div.style.display = "none";
                small_container_per_large_container_div.style.display = "none";
                break;
        }
    });

    document.getElementById('id_small_container_type').addEventListener('change', (event) => {
        document.getElementById('id_small_container_type2').value = event.target.value;
    });



    // Table Checkboxes
    const tableCheckboxes = document.querySelectorAll(".table-checkbox");

    for (let i=0; i<tableCheckboxes.length; i++)
    {
        tableCheckboxes[i].addEventListener('change', () => {;
            updateSelected();
        });
    }
});
