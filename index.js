window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#new-todo-form");
    submitBtn = document.querySelector("#submit");
    const radioBusiness = document.querySelector("#category1");
    const radioPersonal = document.querySelector("#category2");
    const radioOther = document.querySelector("#category3");
    const radioNote = document.querySelector("#category4");
    listDesc = document.querySelector("#list-desc")
    const username = localStorage.getItem("username") || "";
    selectedCategory = localStorage.getItem("selected-category") || "business";

    if (selectedCategory === "business") {
        radioBusiness.checked = true;
        radioPersonal.checked = false;
        radioOther.checked = false;
        radioNote.checked = false;
        submitBtn.classList.add("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.value = "Add Business Todo";
    } else if (selectedCategory === "personal") {
        radioBusiness.checked = false;
        radioPersonal.checked = true;
        radioOther.checked = false;
        radioNote.checked = false;
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.add("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.value = "Add Personal Todo";
    } else if (selectedCategory === "other") {
        radioBusiness.checked = false;
        radioPersonal.checked = false;
        radioOther.checked = true;
        radioNote.checked = false;
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.add("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.value = "Add Other Todo";
    } else {
        radioBusiness.checked = false;
        radioPersonal.checked = false;
        radioOther.checked = false;
        radioNote.checked = true;
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.add("note-btn");
        submitBtn.value = "Add Note";
    }

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    radioBusiness.addEventListener("click", e => {
        selectedCategory = e.target.value;
        localStorage.setItem("selected-category", selectedCategory);
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.classList.add(`${selectedCategory}-btn`);
        submitBtn.value = `Add ${selectedCategory} Todo`
        display_todos();
    })
    radioPersonal.addEventListener("click", e => {
        selectedCategory = e.target.value;
        localStorage.setItem("selected-category", selectedCategory);
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.classList.add(`${selectedCategory}-btn`);
        submitBtn.value = `Add ${selectedCategory} Todo`
        display_todos();
    })
    radioOther.addEventListener("click", e => {
        selectedCategory = e.target.value;
        localStorage.setItem("selected-category", selectedCategory);
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.classList.add(`${selectedCategory}-btn`);
        submitBtn.value = `Add ${selectedCategory} Todo`
        display_todos();
    })
    radioNote.addEventListener("click", e => {
        selectedCategory = e.target.value;
        localStorage.setItem("selected-category", selectedCategory);
        submitBtn.classList.remove("business-btn");
        submitBtn.classList.remove("personal-btn");
        submitBtn.classList.remove("other-btn");
        submitBtn.classList.remove("note-btn");
        submitBtn.classList.add(`${selectedCategory}-btn`);
        submitBtn.value = `Add ${selectedCategory}`
        display_todos();
    })

    newTodoForm.addEventListener("submit", e => {
        e.preventDefault();

        if (e.target.elements.content.value.trim() == "" || e.target.elements.category.value == "") {
            e.target.elements.content.value = "";
            return;
        }

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));
        e.target.elements.content.value = "";

        display_todos();
    })
    display_todos();
})

const display_todos = () => {
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";
    listDesc.innerHTML = "";

    if (todos.length > 0) {
        listDesc.innerHTML = `
        Total: ${todos.filter(t => t.done == true && t.category != "note").length} / ${todos.filter(t => t.category != "note").length}
        | Business: ${todos.filter(t => t.done == true && t.category === "business").length} / ${todos.filter(t => t.category === "business").length}
        | Personal: ${todos.filter(t => t.done == true && t.category === "personal").length} / ${todos.filter(t => t.category === "personal").length}
        | Other: ${todos.filter(t => t.done == true && t.category === "other").length} / ${todos.filter(t => t.category === "other").length}
        | Notes: ${todos.filter(t => t.category === "note").length}
        `
    } else {
        listDesc.innerHTML = "No Todo's ..."
    }

    todos.sort((a, b) => b.createdAt - a.createdAt).forEach(todo => {

        if (todo.category == selectedCategory) {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");

            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            const span = document.createElement("span");
            const content = document.createElement("div");
            const actions = document.createElement("div");
            const deleteBtn = document.createElement("button");

            checkbox.type = "checkbox";
            checkbox.checked = todo.done;
            span.classList.add("bubble");

            if (todo.category == "personal") {
                span.classList.add("personal");
            } else if (todo.category == "business") {
                span.classList.add("business");
            } else if (todo.category == "other") {
                span.classList.add("other");
            } else {
                span.classList.add("note");
            }

            content.classList.add("todo-content");
            actions.classList.add("actions");
            deleteBtn.classList.add("delete");

            content.innerHTML = todo.content;
            deleteBtn.innerHTML = "Delete";

            if (todo.category != "note") {
                label.appendChild(checkbox);
                label.appendChild(span);
            }
            actions.appendChild(deleteBtn);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add("done");
            }

            checkbox.addEventListener("click", e => {
                todo.done = e.target.checked;
                localStorage.setItem("todos", JSON.stringify(todos));

                if (todoItem.done) {
                    todoItem.classList.add("done");
                } else {
                    todoItem.classList.remove("done");
                }

                display_todos();
            })

            deleteBtn.addEventListener("click", e => {
                todos = todos.filter(t => t != todo)
                localStorage.setItem("todos", JSON.stringify(todos));
                display_todos();
            })
        }
    })
}