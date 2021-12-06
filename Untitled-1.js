<!DOCTYPE html>
<head>
   <meta charset="UTF-8">
   <title>Title</title>
   <link rel="stylesheet" href="bootstrap.min.css">
</head>
<body class="container text-center">
   <div>
       ФИО:<br>
       <input type="text" id="myName">
   </div>
   <div>
       Дата рождения:<br>
       <input type="text" id="bday">
   </div>
   <div>
       О себе:<br>
       <textarea id="about"></textarea>
   </div>
   <div>
       <label>
           <input type="checkbox" id="isSessionStorage">
           использовать session storage
       </label>
   </div>
   <div>
       <button id="save">Сохранить</button>
       <button id="load">Загрузить</button>
   </div>
 
   <script>
    const myName = document.querySelector('#myName');
    const bday = document.querySelector('#bday');
    const about = document.querySelector('#about');
 
    const save = document.querySelector('#save');
    const load = document.querySelector('#load');
    const isSessionStorage = document.querySelector('#isSessionStorage');
 
    let storage = localStorage;

    isSessionStorage.addEventListener("change", e => {
        storage = isSessionStorage ? sessionStorage : localStorage
    })

    save.addEventListener("click", e => {
        try {
            storage.data = JSON.stringify(
            {
                myName:myName.value,
                bday:bday.value,
                about:about.value
            });
    } catch (error) {
        console.error("not good")
    }
    });

    load.addEventListener("click", e => {
        const data = JSON.parse(storage.data || "{}");
        myName.value = data.myName || "";
        bday.value = data.bday || "";
        about.value = data.about || "";
    })

    window.addEventListener("storage", (e) => {
        load.click();
    })
</script>
</body>
</html>




<!DOCTYPE html>
<head>
   <meta charset="UTF-8">
   <title>Title</title>
   <link rel="stylesheet" href="bootstrap.min.css">
</head>
<body class="container text-center">
   <div>
       Имя:<br>
       <input type="text" id="name">
   </div>
   <div>
       Значение:<br>
       <input type="text" id="value">
   </div>
   <div>
       Путь:<br>
       <input type="text" id="path">
   </div>
   <div>
       <button id="add">Добавить</button>
   </div>
 
   <script>
       const cookieName = document.querySelector('#name');
       const cookieValue = document.querySelector('#value');
       const add = document.querySelector('#add');
 
       add.addEventListener('click', function() {
           document.cookie = `${cookieName.value}=${cookieValue.value}`;
 
           cookieName.value = '';
           cookieValue.value = '';
       });
   </script>
  
</body>
</html>








<!DOCTYPE html>
<head>
   <meta charset="UTF-8">
   <title>Title</title>
   <link rel="stylesheet" href="bootstrap.min.css">
   <style>
       .hide {
           display: none;
       }
   </style>
</head>
<body class="container">
   <ul class="list">
       <li><a href="#news">Новости</a></li>
       <li><a href="#friends">Друзья</a></li>
   </ul>
   <div class="jumbotron news-content hide">
       <h1>Новости</h1>
       <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aspernatur error dolore dolorum pariatur quod dignissimos nesciunt, delectus nisi harum nam ea iure quas provident non iusto consequatur! Quidem, ex.
       </p>
   </div>
   <div class="jumbotron friends-content hide">
       <h1>Друзья</h1>
       <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aspernatur error dolore dolorum pariatur quod dignissimos nesciunt, delectus nisi harum nam ea iure quas provident non iusto consequatur! Quidem, ex.
       </p>
   </div>
  
   <script>
    const pageMap = {
        '#news': '.news-content',
        '#friends': '.friends-content'
    };
 
    let currentPage;
 
    window.addEventListener('hashchange', handlePage);
 
    handlePage();
 
    function handlePage() {
        const pageName = pageMap[location.hash];
          
        if (pageName) {
            const page = document.querySelector(pageName);
 
            if (page) {
                if (currentPage) {
                    currentPage.classList.add('hide');
                }
 
                page.classList.remove('hide');
                currentPage = page;
            }
        }
    }
</script>
</body>
</html>



<!DOCTYPE html>
<head>
   <meta charset="UTF-8">
   <title>Title</title>
   <link rel="stylesheet" href="bootstrap.min.css">
   <style>
       .hide {
           display: none;
       }
   </style>
</head>
<body class="container">
   <ul class="list">
       <li><a href="#news">Новости</a></li>
       <li><a href="#friends">Друзья</a></li>
   </ul>
   <div class="jumbotron news-content hide">
       <h1>Новости</h1>
       <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aspernatur error dolore dolorum pariatur quod dignissimos nesciunt, delectus nisi harum nam ea iure quas provident non iusto consequatur! Quidem, ex.
       </p>
   </div>
   <div class="jumbotron friends-content hide">
       <h1>Друзья</h1>
       <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aspernatur error dolore dolorum pariatur quod dignissimos nesciunt, delectus nisi harum nam ea iure quas provident non iusto consequatur! Quidem, ex.
       </p>
   </div>
  
   <script>
           const pageMap = {
        '#news': '.news-content',
        '#friends': '.friends-content'
    };
 
    const list = document.querySelector('.list');
    let currentPage;
 
    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
 
            const newPage = e.target.getAttribute('href');
 
            history.pushState({
                page: newPage
            }, 'new page');
 
            handlePage(newPage);
        }
    });
 
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            handlePage(e.state.page);
        }
    });
 
    function handlePage(page) {
        const pageName = pageMap[page];
          
        if (pageName) {
            const page = document.querySelector(pageName);
 
            if (page) {
                if (currentPage) {
                    currentPage.classList.add('hide');
                }
 
                page.classList.remove('hide');
                currentPage = page;
            }
        }
    }
   </script>
</body>
</html>