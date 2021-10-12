import {css, html, LitElement, nothing} from "lit";

export class TodoApp extends LitElement {
    static properties = {
        title: {
            type: String
        },
        items: {
            type: Array
        },
        remaining: {
            type: Number
        }
    }
    static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: auto;
        background-color: #f4f4f4;
        color: #333;
      }
      
      .header {
        background: #e4e4e4;
        text-align: right;
        padding: 1rem;
      }
      
      h1 {
        margin: 0;
        text-align: center;
      }
    `

    constructor() {
        super();
        this.remaining = 0;
    }
    updated(changedProperties) {
        super.updated(changedProperties);

        if(changedProperties.has('items')) {
            this.computeRemaining();
        }
    }

    onTodoInputKeyup(e) {
        this.addItem({
            name: e.detail.value,
            completed: false
        })
    }

    onTodoItemsToggled(event) {
        console.log(event)
        const item = event.detail;
        this.items = this.items?.map(currentItem => currentItem.name === item.name ? item : currentItem);
    }

    addItem(item) {
        this.items = this.items ? [item, ...this.items] : [item]
    }

    computeRemaining() {
        console.log(this.items.length)
        this.remaining = this.items.reduce((acc, curr) => curr.completed ? --acc : acc , this.items.length)
    }

    render() {
        return html`
            <div class="header">
                <h1>${this.title}</h1>
                <span class="remaining">${this.remaining} item${this.remaining !== 1 ? 's' : nothing} left</span> 
            </div>
            <todo-items .items=${this.items} @todo-items-toggled=${this.onTodoItemsToggled}></todo-items>
            <todo-input @todo-input-keyup=${this.onTodoInputKeyup}></todo-input>
        `
    }
}