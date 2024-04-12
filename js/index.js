const demo = document.querySelector('#demo');
const select = document.querySelector("#mySelect")
const preloader = document.querySelector('#preloader');

const showPreloader = () => {
    preloader.classList.add('active');
};

const hidePreloader = () => {
    preloader.classList.remove('active');
};


const myFunction = () => {
    const x = document.querySelector('#mySelect').value;
    console.log(`https://jsonplaceholder.typicode.com/${x}`);
    showPreloader()
    fetch(`https://jsonplaceholder.typicode.com/${x}`)
        .then(result => result.json())
        .then(data => {
            hidePreloader();
            demo.innerHTML = '';
            data.forEach((el) => {
                if (x === 'users') {
                    demo.innerHTML += `<li>${el.id}.${el.username}</li>`;
                } else if (x === 'comments') {
                    demo.innerHTML += `<li>${el.id}.${el.name} <br> text - ${el.body}</li><br>`;
                } else if (x === 'posts') {
                    demo.innerHTML += `<li>${el.id}.${el.title} <br> text - ${el.body}</li><br>`;
                }
                else if (x === 'clear') {
                    demo.innerHTML = ''
                }
            });
        }).catch(err => {
            console.log(err.message);
            hidePreloader();
        });
};


select.addEventListener("change", myFunction)