const inputSurname = document.getElementById('surname'); // przy querySelector z . gdy odwołuję się do klasy
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const inputMail = document.getElementById('email');
const inputMsg = document.getElementById('msg');
const inputSubmit = document.getElementById("btn");
const modalBlock = document.getElementById('myModal');
const modalClose = document.getElementById('close');
inputMsg.value = '';


//funkcje do walidacji
function testText(field, lng, reg = null) {
    if (reg === null) {
        return field.value.length >= lng;
    }
    return (field.value.length >= lng && reg.test(field.value));
};

function markFieldAsError(field, show, label) {
    if (show) {
        field.style.borderColor = '#ff6347';
        label.style.visibility = 'visible';
    } else {
        field.style.borderColor = '#f5f7fa';
        label.style.visibility = 'hidden';
    }
};

//walidacja dynamiczna
inputSurname.addEventListener("input", e => 
        markFieldAsError(e.target, !testText(e.target, 3, /^[A-Za-z]*$/), document.getElementById('error-surname')));
inputName.addEventListener("input", e => 
        markFieldAsError(e.target, !testText(e.target, 2, /^[A-Za-z]*$/), document.getElementById('error-name')));
inputMail.addEventListener("input", e => 
        markFieldAsError(e.target, !testText(e.target, 4, /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i), document.getElementById('error-email')));
inputMsg.addEventListener("input", e => 
        markFieldAsError(e.target, !testText(e.target, 1), document.getElementById('error-msg')));


//funkcja walidująca wszystkie warunki na raz
function allValidations () {
    valid = (testText(inputSurname, 3, /^[A-Za-z]*$/) 
    && testText(inputName, 2, /^[A-Za-z]*$/) 
    && testText(inputMail, 4, /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i) 
    && testText(inputMsg, 1))
    return valid;
}

//Tworzenie obiektu z wartościami formularza
function getFormValues () {
    const formValues = {};
    formValues.surname = inputSurname.value;
    formValues.name = inputName.value;
    formValues.phone = inputPhone.value;
    formValues.email = inputMail.value;
    formValues.message = inputMsg.value;
    return formValues;
}

//Czyszczenie formularza
function clearForm () {
    inputSurname.value = '';
    inputName.value = '';
    inputPhone.value = '';
    inputMail.value = '';
    inputMsg.value = '';
}


// wysyłanie formularza        
inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (allValidations()) {
        modalBlock.style.display = 'block';
        console.log(getFormValues());
    } else {
        markFieldAsError(inputSurname, !testText(inputSurname, 3, /^[A-Za-z]*$/), document.getElementById('error-surname'));
        markFieldAsError(inputName, !testText(inputName, 2, /^[A-Za-z]*$/), document.getElementById('error-name'));
        markFieldAsError(inputMail, !testText(inputMail, 4, /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i), document.getElementById('error-email'));
        markFieldAsError(inputMsg, !testText(inputMsg, 1), document.getElementById('error-msg'));
        }
})

//wyłączenie modalu za pomocą przycisku
modalClose.addEventListener('click', () => {
    modalBlock.style.display = 'none';
    clearForm();
})

//wyłączenie modalu klikając gdziekolwiek poza modal
window.addEventListener('click', (e) => {
    if (e.target == modalBlock) {
        modalBlock.style.display = 'none';
        clearForm();
    }
})