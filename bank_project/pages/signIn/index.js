import { getData } from "../../lib/http"

const form = document.forms.namedItem('signin');
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function validate(input) {
    const type = input.getAttribute('name');
    const value = input.value.trim();
    let isValid = true;

    if (!patterns[type].test(value)) {
        input.classList.add('error');
        isValid = false;
    } else {
        input.classList.remove('error');
    }

    return isValid;
}

form.onsubmit = (e) => {
    e.preventDefault();

    const user = {
        id: crypto.randomUUID(),
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
        alert('fill correctly');
        return;
    }

    const { email, password } = user;

    if (email && password) {
        getData('/users?email=' + email)
            .then((res) => {
                const [res_user] = res.data;

                if (!res_user) {
                    alert('Такого пользователя не существует', 'error');
                    return;
                }
                if (res_user.password !== password) {
                    alert('Не верный пароль!', 'error');
                    return;
                }

                delete res_user.password;

                localStorage.setItem("user", JSON.stringify(res_user));
                location.assign('/');
            });
    }
};