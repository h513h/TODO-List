//無待辦事項時不顯示面板
const panel = document.querySelector('.panel');
function displayPanel(){
    if(todoListing.length === 0){
    panel.style.display = "none";
}else{
    panel.style.display = "inline-block";
}}

// 計算待辦事項總數
const num = document.querySelector('.num');
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
const todoList = document.querySelector('.todoList');

let todoListing = [];

function listing(){

    let displayList = [];

    todoListing.forEach(function(i){
        if(i.display === true){
            displayList.push(i)
        }
    })

    let str = "";
    let classAtr = ""

    displayList.forEach(function(item,index){
        if(item.statu === "todo"){
            classAtr = 'todo'
        }else{
            classAtr = 'todo done'
        }
        str += 
            `<li class="${classAtr}" data-num=${index}>
            <div class="checkbox"><i class="fas fa-check check"></i></div>
            <h3 class="content">${item.name}</h3>
            <i class="fas fa-times delete"></i></li>`
    });
    todoList.innerHTML = str;
    displayPanel()
    total()
}

// 新增
const text = document.querySelector('#text');
const addBtn = document.querySelector('.addbtn');

addBtn.addEventListener("click",function(e){
    if(text.value == ""){
        alert('請輸入待辦事項');
        return;
    }else{
        let obj = {};
        obj.name = text.value;
        obj.statu = 'todo';
        obj.display = true;
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
        todoListing[e.target.parentElement.parentElement.getAttribute("data-num")].statu = 'done'
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
    alert('已清除處理完事項')
})

// 分類及重新整理清單
const lists = document.querySelector('.subtitleList');

let catalog = [{name : '全部', status: 'all', isActive: true},{name : '待完成', status: 'todo', isActive: false},{name : '已完成', status: 'done', isActive: false}];

function catalogListing(){
    let catalogStr = ""
    let classAtr = ""
    catalog.forEach(function(i,index){
        if(i.isActive === true){
            classAtr = "isActive"
        }else{
            classAtr = ""
        }
        catalogStr += `<li class="subtitle ${classAtr}" data-num=${index} data-status=${i.status}><h2>${i.name}</h2></li>`
    })
    lists.innerHTML = catalogStr;
}
catalogListing()

lists.addEventListener("click",function(e){   

    // 分類   
    catalog.forEach(function(i){
        i.isActive = false;
    })
    catalog[e.target.parentElement.getAttribute("data-num")].isActive = true;
    catalogListing()
    
    // 重新整理清單
    displayList = [];
    todoListing.forEach(function(i,index){ 
        i.display = false
        if(e.target.parentElement.getAttribute("data-status") === "all"){            
            i.display = true
        }else if(e.target.parentElement.getAttribute("data-status") === i.statu){
            i.display = true
        }
        listing()
    })
});