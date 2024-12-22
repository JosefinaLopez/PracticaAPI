document.addEventListener('DOMContentLoaded', function () {
    var elems = document.getElementById('modal');
    var instances = M.Modal.init(elems);
});

// Or with jQuery

$(document).ready(function () {
    $('.modal').modal();
});

function abrirModal() {
    var modalInstance = M.Modal.getInstance(document.getElementById('modal1'));
    modalInstance.open();
}
