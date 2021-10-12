import {css, html, LitElement, nothing} from "lit";
import {repeat} from "lit-html/directives/repeat.js";

export class TodoItems extends LitElement {
    static properties = {
        items: {
            type: Array
        }
    }

    static styles = css`
      :host {
        font-size: 1.2rem;
        line-height: 1.7;
        list-style: circle;
        padding-left: 1.1em;
        display: block;
      }
      
      ul {
        list-style: none;
        padding: 0;
      }
    `

    onTodoItemToggled(event) {
        const { detail } = event;
        this.dispatchEvent(new CustomEvent('todo-items-toggled', { detail }));
    }

    render() {
        return html`
            <ul>
                ${this.items ? repeat(this.items, item => html`
                    <todo-item .name=${item.name} ?completed=${item.completed} @todo-item-toggled=${this.onTodoItemToggled}></todo-item>
                `): nothing}
            </ul>
        `
    }
}