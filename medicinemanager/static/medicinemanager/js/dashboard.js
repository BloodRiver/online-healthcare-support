document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded");

    // State and Modal Logic
    const modal = document.getElementById('confirm-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    let currentTargetId = "";

    /**
     * Triggers the confirmation modal
     * @param {string} sectionId - The ID of the container element (e.g., 'section-my-reminders')
     */
    const triggerUpdate = (sectionId) => {
        currentTargetId = sectionId;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }

    function closeModal() {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
    }

    document.getElementById("btn-update-my").addEventListener("click", () => {triggerUpdate("section-my-reminders")});
    document.getElementById("patient-NafisaBinteSeraj-button").addEventListener("click", () => {triggerUpdate("patient-NafisaBinteSeraj-card")});
    document.getElementById("patient-MonzurulAlam-button").addEventListener("click", () => {triggerUpdate("patient-MonzurulAlam-card")});
        /**
     * Calculates if buttons should be enabled/disabled based on check count
     */
    function updateButtonStates() {
        // Update My Reminders
        const mySection = document.getElementById('section-my-reminders');
        if (mySection) {
            const myBtn = mySection.querySelector('#btn-update-my');
            const myCheckboxes = mySection.querySelectorAll('.reminder-checkbox');
            const anyMyChecked = Array.from(myCheckboxes).some(cb => cb.checked);
            if (myBtn)
            {
                myBtn.disabled = !anyMyChecked;
            }
        }

        // Update Patient Cards
        const patientCards = document.querySelectorAll('.patient-card');
        patientCards.forEach(card => {
            const btn = card.querySelector('.patient-update-btn');
            const checkboxes = card.querySelectorAll('.reminder-checkbox');
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (btn)
            {
                btn.disabled = !anyChecked;
            }
        });
    }


    /**
     * Replaces checked checkboxes with a tick icon and locks the UI
     */
    function processTakenMedicines() {
        if (!currentTargetId) return;

        const section = document.getElementById(currentTargetId);
        const checkboxes = section.querySelectorAll('.reminder-checkbox:checked');

        var medicinesToUpdate = [];
        checkboxes.forEach(cb => {
            medicinesToUpdate.push(cb.value);
        });

        
        checkboxes.forEach(cb => {
            // Update the checkboxes
            const wrapper = cb.closest('.checkbox-wrapper');
            const label = cb.closest('.reminder-item');

            // 1. Replace the checkbox with a tick icon
            wrapper.innerHTML = `<i class="fa-solid fa-check text-green-600 font-bold"></i>`;

            // 2. Add visual completion state to the row
            label.classList.add('reminder-item-completed');
            label.classList.remove('hover:bg-gray-100', 'hover:bg-indigo-100/50', 'hover:bg-pink-100/50', 'cursor-pointer');
        });

        // Refresh button states to disable the current section's button
        updateButtonStates();
    }

    modalCancel.addEventListener('click', closeModal);

    modalConfirm.addEventListener('click', () => {
        processTakenMedicines();
        closeModal();
    });

    // Global Event Delegation for Checkboxes
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('reminder-checkbox')) {
            updateButtonStates();
        }
    });

    updateButtonStates();

});
