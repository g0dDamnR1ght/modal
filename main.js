// const btnClose = document.querySelector(".btn-close"); 
const btnAddClient = document.querySelector(".btn-add-client"); 
const btnLog = document.querySelector(".btn-log"); 
const contact = document.getElementById('contact'); 


let allUsers = []; 

btnAddClient.addEventListener('click', () => {
    popupCreate.createPopup(); 

    // getParamForPopup(); 
    const btnSignIn =  document.querySelector(".btn-signed"), 
    btnClose = document.querySelector(".btn-close"), 
    emailInput = document.querySelector(`input[type="email"]`), 
    passInput = document.querySelector(`input[type="password"]`), 
    form = document.getElementById('pop-up-form');
    // сделать валидацию
    
    function validateForm() {
        if (!emailInput.value) {
            emailInput.classList.add('errorInp');
            return false 
        }
        if (!passInput.value) {
            passInput.classList.add('errorInp');
            return false
        }
    
        return true  
    }

    btnSignIn.addEventListener('click', event => {
        event.preventDefault(); 

        if(validateForm()){
            createNewUsers(emailInput.value, passInput.value); 
            popupCreate.removePopup(); 
            console.log(allUsers);  
        } 
    })

    btnClose.addEventListener('click', (event) => {
        event.preventDefault(); 
        popupCreate.removePopup(); 
    });  
})

btnLog.addEventListener('click', (event) => {
    popupLog.createPopup(); 
      // добавить анимацию появления
})

// classes for app

class Popup {
    constructor(name){
        this.name = name
        this.structure = `<div class="pop-up">
            <div id="blur"></div>
             <div class="pop-up-content">
             <form class="pop-up-form" id="pop-up-form" action="">
                 ${this.name}
                    <label for="email">Email</label>
                   <input type="email" placeholder="your e-mail">
                   <label for="password">Password</label>
                   <input type="password" placeholder="password">
    
                  <div class="btn-pop-up">
                      <button class="btn-signed" type="submit">signed-in</button>
                       <button class="btn-close">close</button>
                   </div>
               </form>
           </div>
       </div>`
    }
    createPopup(){
    return  contact.insertAdjacentHTML('afterend', this.structure); 
    }

    removePopup(){
    const popup = document.querySelector('.pop-up'); 
    return popup.remove(); 
    }
}

const popupCreate = new Popup("<h2>Create you profile</h2>")

const popupLog = new Popup(`<h2>Log in</h2>`) 

class Users {
    constructor(options){
        this.login = options.login; 
        this.password = options.password; 
    }
}

class Admin extends Users{
    static type = "ADMIN"
    constructor(options) {
        super(options)
    }
}

const admin = new Admin({
    login: 'admin123@gmail.com', 
    password: 123456
})
allUsers.push(admin); 


// простой роутер для перехода по страницам )

class Router {
    constructor() {
        this.routes = []; 
    }

    getRout(uri, callback ){
        if( uri || !callback){
            throw new Error('uri or callback must be given'); 
        }

        if(typeof uri !== "string"){
            throw new  TypeError('type uri must be string') ;
        }

        if(typeof callback !== "function"){
            throw new TypeError('type callback must be function') ;
        }

        this.routes.forEach(route =>{
            if(route.uri === uri) throw new Error(`this uri ${route.uri} already exist `)    

        }); 

        const route = {
            uri, 
            callback
        }

        this.route.push(routes); 
    }

        initRoute(){
            this.routes.some(route => {
                let regEx = new RegExp(`^${route.uri}$`); 
                let path = window.location.pathname; 

                if(path.match(regEx)){
                    let req = { path }
                    return route.callback.call(this, req)
                }

            })
        }
}

const router = new Router(); 

router.getRout('/usersPage', function(req){
    console.log(reg.path)
})

router.initRoute(); 

// функция должна добавлять новых пользователей в массив allUsers
//  и проверять админ/не админ и отрывать соответсвующее окно
function createNewUsers(login, password) {
  let user = {
      login, 
      password
  }  
  allUsers.push(user)
}


// с этим что-то придумать 
// что бы не было повторяющегося кода 

// function getParamForPopup() {
//     return 
// }