import getCountries from './services/fetchCountries';
import debounce from 'lodash.debounce';
import createListMarkup from './templates/list.hbs';
import createItemMarkup from './templates/item.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    input: document.querySelector('.input'),
    list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry({target : {value} }) {
    if (value.trim() !== '') {
        getCountries(value.trim()).then(data => {
            console.log(data);
            if (data.length > 1 && data.length < 11) {
                refs.list.innerHTML = createListMarkup(data);
                return;
            }
            if (data.length === 1) {
                refs.list.innerHTML = createItemMarkup(data[0]);
                return;
            }
            if (data.length > 10) {
                error({
                text: 'Прилетело больше 10 стран',
                type: 'error',
                delay: 2000,
                });
                return;
            }
            if (data.status === 404) {
                error({
                text: 'Введите коректный запрос',
                type: 'error',
                delay: 2000,
                });
                return;
            }
        })
        .catch (() => {
            error({
                text: 'Введите коректный запрос',
                type: 'error',
                delay: 2000,
                });
        })
    }
}