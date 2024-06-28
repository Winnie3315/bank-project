// import { getData, postData } from "../../lib/http"

// const form = document.forms.namedItem('signup');
// const patterns = {
//     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     name: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
//     surname: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
//     password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// };

// function validate(input) {
//     const type = input.getAttribute('name');
//     const value = input.value.trim();
//     let isValid = true;

//     if (!patterns[type].test(value)) {
//         input.classList.add('error');
//         isValid = false;
//     } else {
//         input.classList.remove('error');
//     }

//     return isValid;
// }

// form.onsubmit = (e) => {
//     e.preventDefault();

//     const user = {
//         id: crypto.randomUUID()
//     };

//     const fm = new FormData(e.target);
//     let valid = true;

//     fm.forEach((val, key) => {
//         user[key] = val;
//         const input = form.querySelector(`[name=${key}]`);
//         if (!validate(input)) {
//             valid = false;
//         }
//     });

//     if (!valid) {
//         alert('please fill correctly');
//         return;
//     }

//     const { email, name, surname, password } = user;

//     if (email && name && surname && password) {
//         getData('/users?email=' + email)
//             .then(res => {
//                 if (res.data.length > 0) {
//                     alert('Аккаунт уже существует', 'error');
//                     return;
//                 }
//                 postData('/users', user)
//                     .then(res => {
//                         if (res.status === 200 || res.status === 201) {
//                             location.assign('/pages/signIn/');
//                         }
//                     });

//             });
//     }
// };

import { getData, postData } from "../../lib/http";

const form = document.forms.namedItem('signup');
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
    surname: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function validate(input) {
    const type = input.getAttribute('name');
    const value = input.value.trim();
    let isValid = true;

    if (!patterns[type].test(value)) {
        input.classList.add('error');
        input.style.borderColor = 'red';
        isValid = false;
    } else {
        input.classList.remove('error');
        input.style.borderColor = 'green';
    }

    return isValid;
}

const inputs = form.querySelectorAll('input[name]');
inputs.forEach(input => {
    input.onkeyup = () => validate(input);
});

form.onsubmit = (e) => {
    e.preventDefault();

    const user = {
        id: crypto.randomUUID()
    };

    const fm = new FormData(e.target);
    let valid = true;

    fm.forEach((val, key) => {
        user[key] = val;
        const input = form.querySelector(`[name=${key}]`);
        if (!validate(input)) {
            valid = false;
        }
    });

    if (!valid) {
        alert('Please fill correctly');
        return;
    }

    const { email, name, surname, password } = user;

    if (email && name && surname && password) {
        getData('/users?email=' + email)
            .then(res => {
                if (res.data.length > 0) {
                    alert('Аккаунт уже существует', 'error');
                    return;
                }
                postData('/users', user)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            location.assign('/pages/signIn/');
                        }
                    });
            });
    }
};
