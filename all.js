const text = document.querySelector('#text');
const addBtn = document.querySelector('.addbtn');
const deleteBtn = document.querySelector('.delete');
const todoList = document.querySelector('.todoList');
const num = document.querySelector('.num');

let todoListing = [];

//無待辦事項時不顯示面板
const panel = document.querySelector('.panel');
function display(){
    if(todoListing.length === 0){
    panel.style.display = "none";
}else{
    panel.style.display = "inline-block";
}}

// 計算待辦事項總數
function total(){
    let total = 0;
    todoListing.forEach(function(item,index){
        if(item.statu === "todo"){
            total +=1;
        }
        num.textContent = total;
    })
}

// 重新整理待辦事項
function listing(){
    let str = "";
    todoListing.forEach(function(item,index){
        if(item.statu === "todo"){
            str += 
            `<li class="todo" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`
        }else{
            str += 
            `<li class="todo done" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`
        }
    });
    todoList.innerHTML = str;
    display()
    total()
}
listing()

// 新增
addBtn.addEventListener("click",function(e){
    if(text.value == ""){
        alert('請輸入待辦事項');
        return;
    }else{
        let obj = {};
        obj.name = text.value;
        obj.statu = 'todo';
        todoListing.push(obj);
        listing();
        total()
        text.value = "";
    }
});


// 刪除或完成
todoList.addEventListener("click",function(e){
    if(e.target.getAttribute("class") === "fas fa-times delete"){
        todoListing.splice(e.target.parentElement.getAttribute("data-num"),1);
        listing();
    }
    else if(e.target.getAttribute("class") === "fas fa-check check"){
        todoListing[e.target.parentElement.parentElement.getAttribute("data-num")].statu = "done";
        listing()
    }
})

// 刪除全部完成項目
const clear = document.querySelector('.clear');
clear.addEventListener("click",function(e){
    todoListing = todoListing.filter(function(item){
        if(item.statu !== "done"){
            return item;
        }
    })
    listing()
})

// 分類及重新整理清單
const lists = document.querySelector('.subtitleList');
const all = document.querySelector('#all');
const todo = document.querySelector('#todo');
const done = document.querySelector('#done');

lists.addEventListener("click",function(e){    

    // 分類   
    if(e.target.parentElement.getAttribute('id') === "all"){
        all.classList.add('isActive');
        todo.classList.remove('isActive');
        done.classList.remove('isActive');
    }else if(e.target.parentElement.getAttribute('id') === "todo"){
        all.classList.remove('isActive');
        todo.classList.add('isActive');
        done.classList.remove('isActive');
    }else{
        all.classList.remove('isActive');
        todo.classList.remove('isActive');
        done.classList.add('isActive');
    }
    
    // 重新整理清單
    let str = "";
    todoListing.forEach(function(item,index){   
        if(e.target.parentElement.getAttribute('id') === "all"){
            if(item.statu === 'done'){
                str += 
            `<li class="todo done" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`
            }else{
             str += 
            `<li class="todo" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`   
            }
            
        }else if(e.target.parentElement.getAttribute('id') === item.statu){
            if(item.statu === 'done'){
                str += 
            `<li class="todo done" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`
            }else{
             str += 
            `<li class="todo" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`   
            }
        }
    })
    todoList.innerHTML = str;
    total()
});
