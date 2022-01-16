function validateForm(e) {
    const inputs = this.querySelectorAll('input');
    const arrayInputs = Array.prototype.slice.call(inputs);
    const textSuccess = '<div class="success_info">Успех</div>';
    const successBox = document.querySelector('.success_info');
    this.countErrors = 0;

    arrayInputs.forEach((el) => {
        const val = el.value;
        const validateEmpty = validateEmptyForm.bind(this, el, e);
        const validateEmail = validateEmailForm.bind(this, el, e);
        const validateTel   = validateTelForm.bind(this, el, e);
        const oldErrorElem  = el.parentElement.querySelector('.error_info');

        if (oldErrorElem) {
            el.parentElement.classList.remove('error_input');
            oldErrorElem.parentElement.removeChild(oldErrorElem);
        }

        if (val === "") {
            validateEmpty(el);
        } else if (el.classList.contains('js-email')) {
            validateEmail(el);
        } else if (el.classList.contains('js-tel')) {
            validateTel(el);
        }
    });

    if(successBox) {
        successBox.parentElement.removeChild(successBox);
    }

    if(!this.countErrors) {
        e.preventDefault();
        this.insertAdjacentHTML('afterend', textSuccess);
    }
}

function validateEmptyForm(el, e) {
    const labelText = el.previousElementSibling.textContent;
    const textError = `<div class="error_info">Необходимо ввести "${labelText}"</div>`;
    //const elementError = createErrorText(textError);

    el.parentElement.classList.add('error_input');

    e.preventDefault();
    el.insertAdjacentHTML('afterend', textError);
    //el.after(elementError);
    this.countErrors++;
}

function validateEmailForm(el, e) {
    const regex = /^\S+@\S+\.\S+$/;
    const val = el.value;
    const textError = '<div class="error_info">Введите правильно почту</div>';
    //const elementError = createErrorText(textError);

    if (regex.test(val) === false) {
        e.preventDefault();
        el.parentElement.classList.add('error_input');
        el.insertAdjacentHTML('afterend', textError);
        //el.after(elementError);
        this.countErrors++;
    }
}

function validateTelForm(el, e) {
    const regex = /^[1-9]\d{10}$/;
    const val = el.value;
    const textError = '<div class="error_info">Введите номер телефона (11 цифр)</div>';
    //const elementError = createErrorText(textError);

    if (regex.test(val) === false) {
        e.preventDefault();
        el.parentElement.classList.add('error_input');
        el.insertAdjacentHTML('afterend', textError);
        //el.after(elementError);
        this.countErrors++;
    }
}

/*function createErrorText(text) {
    const elementError = document.createElement('div');

    elementError.innerHTML = text;
    elementError.classList.add('error_info');

    return elementError;
}*/

const forms = document.querySelectorAll('form');
const arrayForms = Array.prototype.slice.call(forms);

arrayForms.forEach((el) => {
    el.addEventListener("submit", validateForm)
});
