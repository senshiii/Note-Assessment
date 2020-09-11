export default class TodoList {
	static get toolbox() {
		return {
			title: 'Todo List',
			icon:
				'<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
		};
	}

	constructor({ data }) {
		this.data = data;
		this.wrapper = null;
		this.settings = [
			{
				name: 'withBorder',
				icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
			}
			// {
			// 	name: 'stretched',
			// 	icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
			// },
			// {
			// 	name: 'withBackground',
			// 	icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`
			// }
		];
	}

	render() {
		console.log('render');
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('row', 'w-100');
		const inputWrapper = this._generateTodoForm();

		this.wrapper.append(inputWrapper);
		return this.wrapper;
	}

	_generateTodoItem(todo) {
		const li = document.createElement('li');
		li.classList.add('d-flex', 'justify-content-start', 'align-items-center', 'w-100', 'border', 'p-2', 'rounded');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('iinline-flex', 'mx-2');
		const p = document.createElement('h6');
		p.innerText = todo;
		checkbox.addEventListener('change', (e) => {
			
		});
		li.append(checkbox);
		li.append(p);
		return li;
	}

	_generateTodoForm() {
		const inputWrapper = document.createElement('div');
		inputWrapper.id = 'input-wrapper';
		inputWrapper.classList.add('col-12');
		inputWrapper.classList.add('d-flex');

		const inputEl = document.createElement('input');
		inputEl.type = 'text';
		inputEl.id = 'todo-input';
		inputEl.placeholder = 'Enter Todo Item';
		inputEl.classList.add('form-control');

		const button = document.createElement('button');
		button.classList.add('btn');
		button.classList.add('w-100');
		button.classList.add('btn-primary');
		button.innerText = 'Add todo';
		button.addEventListener('click', (e) => {
			this._addTodo(document.querySelector('#todo-input').value);
		});
		inputWrapper.append(inputEl);
		inputWrapper.append(button);

		return inputWrapper;
	}

	_addTodo(text) {
		const inputWrapper = this.wrapper.querySelector('#input-wrapper');
		inputWrapper.remove();
		let ul = document.querySelector('#todo-ul');
		if (!ul) {
			ul = document.createElement('ul');
			ul.id = 'todo-ul';
			ul.classList.add('w-100');
		}
		ul.append(this._generateTodoItem(text));
		this.wrapper.append(ul);
	}

	save(block) {
		console.log(block);
	}

	renderSettings() {
		const wrapper = document.createElement('div');

		this.settings.forEach((tune) => {
			let button = document.createElement('div');
			button.classList.add('cdx-settings-button');
			button.innerHTML = tune.icon;
			button.addEventListener('click', (e) => {
				// this.wrapper.insertBefore(this._generateTodoForm, this.wrapper.firstChild);
				// console.log(typeof this.wrapper.firstChild);
				this.wrapper.append(this._generateTodoForm());
			});
			wrapper.appendChild(button);
		});

		return wrapper;
	}
}
