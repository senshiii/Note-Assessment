export default class TodoList {
  static get toolbox() {
    return {
      title: "Todo List",
      icon:
        '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  constructor({ data }) {
    this.wrapper = null;
    this.todos = data.length > 0 ? data : [];
    this.settings = [
      {
        name: "withBorder",
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
      },
    ];
  }

  render() {
    // console.log("render");
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("row", "w-100");
    if (this.todos.length > 0) {
      this._initTodos(this.todos);
    } else {
      const inputWrapper = this._generateTodoForm();
      this.wrapper.append(inputWrapper);
    }
    return this.wrapper;
  }

  _generateTodoItem(todo) {
    const li = document.createElement("li");
    li.classList.add(
      "d-flex",
      "justify-content-start",
      "align-items-center",
      "w-100",
      "border",
      "p-2",
      "rounded"
    );
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("inline-flex", "mx-2");
    const p = document.createElement("h6");
    p.innerText = todo;
    checkbox.addEventListener("change", (e) => {
      e.path[1].childNodes[1].classList.toggle("toggleLine");
    });
    li.append(checkbox);
    li.append(p);
    return li;
  }

  _generateTodoForm() {
    const inputWrapper = document.createElement("div");
    inputWrapper.id = "input-wrapper";
    inputWrapper.classList.add("col-12");
    inputWrapper.classList.add("d-flex");

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.id = "todo-input";
    inputEl.placeholder = "Enter Todo Item";
    inputEl.classList.add("form-control");

    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("w-100");
    button.classList.add("btn-primary");
    button.innerText = "Add todo";
    button.addEventListener("click", (e) => {
      this.todos.push(document.querySelector("#todo-input").value);
      this._addTodo(document.querySelector("#todo-input").value);
    });
    inputWrapper.append(inputEl);
    inputWrapper.append(button);

    return inputWrapper;
  }

  _initTodos(todos) {
    const h2 = document.createElement("h2");
    h2.innerText = "Todos";
    this.wrapper.append(h2);
    let ul = document.createElement("ul");
    ul.id = "todo-ul";
		ul.classList.add("w-100");
		for(let todo of todos){
			ul.append(this._generateTodoItem(todo));
		}
    this.wrapper.append(ul);
  }

  _addTodo(text) {
    const inputWrapper = this.wrapper.querySelector("#input-wrapper");
    if (inputWrapper) inputWrapper.remove();
    let ul = document.querySelector("#todo-ul");
    if (!ul) {
      const h2 = document.createElement("h2");
      h2.innerText = "Todos";
      this.wrapper.append(h2);
      ul = document.createElement("ul");
      ul.id = "todo-ul";
      ul.classList.add("w-100");
    }
    ul.append(this._generateTodoItem(text));
    this.wrapper.append(ul);
  }

  save(block) {
    return this.todos;
  }

  renderSettings() {
    const wrapper = document.createElement("div");

    this.settings.forEach((tune) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = tune.icon;
      button.addEventListener("click", (e) => {
        this.wrapper.append(this._generateTodoForm());
      });
      wrapper.appendChild(button);
    });

    return wrapper;
  }
}
