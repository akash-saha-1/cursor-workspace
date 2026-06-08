(function(){
    const openBtn = document.getElementById('openBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closebtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    function openModal() {
        modal.showModal();
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        modal.close();
        document.body.style.overflow = 'auto';
        openBtn.focus();
    }

    modal.addEventListener('cancel', ( e) => { e.preventDefault(); closeModal(); });

    cancelBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    openBtn.addEventListener('click', openModal);

    openBtn.focus();

    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            closeModal();
        }
    });
})();