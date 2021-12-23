//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다.
//delete버튼을 누르면 할일이 삭제 된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝남 아이템만 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴



let inputInput =  document.querySelector("#task-input");
let addBtn  = document.querySelector(".add");
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let mode = "all";
let filterList = [];
addBtn.addEventListener('click', addHandler);
let underline = document.querySelector("#under-line")



function enter(){
    if(e.keyCode === 13){
        render()
    }
}

enter()



for(let i =1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(e){
        filter(e)
    })
}
function addHandler(){
    let task = {
        id:randomIdGenerate(),
        taskContents : inputInput.value,
        isComplete : false,
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
    let list = [];
    if(mode === "all"){
        list = taskList
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    let resultHTML = '';
    for(let i =0; i<list.length; i++){
        if(list[i].isComplete === true){
            resultHTML += `<div class="task on">
            <div class="task-done">${list[i].taskContents}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask()">Delete</button>
                </div>
                </div>`;
        }else{
        resultHTML += `<div class="task">
        <div>${list[i].taskContents}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
    }

    document.querySelector("#task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    console.log("id:", id)
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id === id ){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)
    console.log(id)
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

function filter(e){
    mode = e.target.id
    console.log(e.target.id);
    filterList = [];
    if(mode === "all"){
        render()
    }else if(mode === "ongoing"){
        for(let i =0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
    }else if(mode === "done"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
    }
    render()
    console.log(filterList)
}


function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
