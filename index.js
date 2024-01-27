// documentはブラウザAPIの１種
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;

    if(todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");
        // リロードした時に完了状態を保持する
        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // 右クリで削除
        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            li.remove();
            saveDate();
        });
        // 左クリでタスク完了マーク
        li.addEventListener("click", function() {
            li.classList.toggle("text-decoration-line-through"); //toggle classがなければつける、あれば外す。切り替え機能
            saveDate();
        });

        ul.appendChild(li);
        input.value = "";
        saveDate();
    }
}

// ローカルストレージにリスト一覧と完了状態をセーブする
function saveDate() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    // タスク一つ一つの状態をtodos配列にpushする
    lists.forEach(list => {
        // オブジェクトを定義する
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
