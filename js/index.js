const demo = document.querySelector('#demo');
const select = document.querySelector("#mySelect")
const preloader = document.querySelector('#preloader');

/**
 * @returns =измененый css элемент
 */
const showPreloader = () => {
    preloader.classList.add('active');
};
/**
 * @returns измененый css элемент
 */
const hidePreloader = () => {
    preloader.classList.remove('active');
};


const showAPIInfo = () => {
    const valueSelect = document.querySelector('#mySelect').value;
    console.log(`https://jsonplaceholder.typicode.com/${valueSelect}`);
    showPreloader()
    fetch(`https://jsonplaceholder.typicode.com/${valueSelect}`)
        .then(result => result.json())
        .then(data => {
            hidePreloader();
            demo.innerHTML = '';
            data.forEach((el) => {
                if (valueSelect === 'users') {
                    demo.innerHTML += `<li>${el.id}.${el.username}</li>`;
                } else if (valueSelect === 'comments') {
                    demo.innerHTML += `<li>${el.id}.${el.name} <br> text - ${el.body}</li><br>`;
                } else if (valueSelect === 'posts') {
                    demo.innerHTML += `<li>${el.id}.${el.title} <br> text - ${el.body}</li><br>`;
                }
                else if (valueSelect === 'clear') {
                    demo.innerHTML = ''
                }
            });
        }).catch(err => {
            console.log(err.message);
            hidePreloader();
        });
};

/**
 * @returns слушатель изменениый и отдает в функцию
 */
select.addEventListener("change", showAPIInfo)