(function(){

const myForm = document.querySelector('#myForm');
const orderButton = document.querySelector('#orderButton');
let modal = document.querySelector('.form__modal');
let close = document.querySelector('.modal__close');
let message = document.querySelector('.modal__message');

close.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.style.overflow = "initial";
    modal.style.display = "none";
});

orderButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(myForm)) {
        let data = new FormData();
        data.append("name", myForm.elements.name.value);
        data.append("phone", myForm.elements.phone.value);
        data.append("comment", myForm.elements.comment.value);
        data.append("to","perizat.kozhageldina@nu.edu.kz");

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(data);
        xhr.addEventListener ('load', () => {            
            document.body.style.overflow = "hidden";
            modal.style.display = "flex";
            message.textContent = xhr.response.message;
        });
    }

    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }
        return valid;
    }

    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }
});

})()