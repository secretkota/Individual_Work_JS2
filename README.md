# Individual_Work_JS2

# 1. Инструкции по запуску проекта
Для запуска проекта вам требуется node, live server, VS Code.
 1. Качаем проект с GitHub,
 2. Распаковываем в удобное место,
 3. Заходим в папку, открываем прокт в VScode:
 ![openProject](https://i.imgur.com/AsPPhlZ.png)
 4. Нажимаем ПКМ на main.html, затем "open with live server":
![bttnServer](https://i.imgur.com/TkL3Q3j.png)
 5. Пользуемся проектом
# 2. Описание лабораторной работы
В данном коде был испольщован API c сайта:
<a href="https://jsonplaceholder.typicode.com">typicode</a>
У пользователя есть select, где он выбирает нужный ему фрагмент, смотря от того, какой он выбрал select, программа в div выводит нужный ему контент

# 3. Краткая документация к проекту
В проекте есть 3 файла, при помощи них и происходит работа, в ```index.js```, подключен API который отправляет пользователю информацию при помощи слушателя обновления. В ```main.html``` расписаны пункты select и подключен JavaScript благодаря этому если человек делает выбор то у него происходит действяи. В ```style.css``` расписаны стили для select и для preloader, в случае если у пользователя слабый интернет JavaScript будет менять ему значение на none
# 4. Примеры использования проекта с приложением скриншотов или фрагментов кода
1. код в ```main.html```, тут мы делаем верстку нашего preloader'a и разработываем select
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <div id="preloader" class="preloader">
        <div class="preloader_loader">
            <div class="loadingio-spinner-ball-nq4q5u6dq7r">
                <div class="ldio-x2uulkbinbj">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <h1>Please, select a API from the list.</h1>
    <select id="mySelect">
        <option value="clear" selected>Select api</option>
        <option value="users">users</option>
        <option value="comments">comments</option>
        <option value="posts">posts</option>
    </select>
    </div>
    <h2>Result</h2>
    <p id="demo"></p>
    <script src="./js/index.js"></script>
</body>

</html>
```
2. Код в ```style.css```, делаем стилизацию нашему preloader'у
```css
.preloader {
  display: none; /* Изначально скрываем */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.preloader.active {
  display: flex; /* Показываем при активации */
  justify-content: center;
  align-items: center;
}

.preloader_loader {
  width: 100px;
  height: 100px;
}

.loadingio-spinner-ball-nq4q5u6dq7r {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: none;
}

.ldio-x2uulkbinbj > div {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #343a40;
  animation: loadingio-spinner-ball-nq4q5u6dq7r 1s infinite ease;
}

@keyframes loadingio-spinner-ball-nq4q5u6dq7r {
  0% {
      transform: scale(0);
  }

  100% {
      opacity: 0;
      transform: scale(1);
  }
}
```
3. Код в ```index.js```

   3.1 Подключаем  элементы по айди с HTML 
   ```js
   const demo = document.querySelector('#demo');
    const select = document.querySelector("#mySelect")
    const preloader = document.querySelector('#preloader');

   ```
   3.2 Создаем функции для показа preloader'a, и для скрытия preloader'a
   ```js
    const showPreloader = () => {
    preloader.classList.add('active');
    };
    const hidePreloader = () => {
    preloader.classList.remove('active');
    };
   ```
   3.3 Создаем функцию showAPIINFO, в ней мы получаем значение наших select, в консоль будем выводить ссылку нашего выбора, и показывать preloader, далее подключаем fetch в ней мы обращаемся к api, затем получаем его и преобразуем в json, далее в data мы имеем весь наш json, вызываем скрытие preloader'a, очищаем наш div затем при помощи forEach мы проходмся по всем элементам и при помощи проверки проверяем что у нас в select, и изменяем содержимое нашего div в соответствии с условием, и применили проверку на ошибку если вдруг наш api вернет ошибку
   ```js
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
   ```
   3.4  select добавляем слушатель на изменение, и если он ловит его то вызывает функцию showAPIInfo
   ```js
   select.addEventListener("change", showAPIInfo)
   ```
# 5. Ответы на контрольные вопросы

1. Какое значение возвращает функция fetch?

``о:`` Возвращает promise, содержащий Response    объект (ответ на запрос).

2. Что представляет собой Promise?

``о:`` Объект, представляющий результат успешного или неудачного завершения асинхронной операции

3.  Какие методы доступны у объекта Promise?

``о:``  then() и catch()
# 6. Список использованных источников
<a href="https://github.com/MSU-Courses/javascript_typescript/tree/main/lab">GitHub</a>

<a href="https://developer.mozilla.org/ru/docs/Web/API/fetch">Google</a>

# 7. Дополнительные важные аспекты, если применимо
Совершенно другое условие задачи, в начале все было при помощи кнопок, в конечном условии уже установлен слушатель на изменение
