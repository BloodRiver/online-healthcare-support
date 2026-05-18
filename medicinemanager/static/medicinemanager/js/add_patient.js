function handleSearch() {
    const container = document.getElementById('resultsContainer');
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

function openConfirmModal(name) {
    document.getElementById('targetPatientName').textContent = name;
    document.getElementById('confirmModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function confirmRequest() {
    closeModal('confirmModal');
    setTimeout(() => {
        document.getElementById('successModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }, 300);
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.target.parentElement.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
});