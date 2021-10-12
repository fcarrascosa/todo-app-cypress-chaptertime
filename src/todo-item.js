import {css, html, LitElement} from "lit";

export class TodoItem extends LitElement {
    static properties = {
        name: {type: String},
        completed: {type: Boolean, reflect: true}
    }

    static styles = css`
      :host {
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 1.25em;
      }
      
      :host:after {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        height: 1px;
        background: currentColor;
        bottom: -50%;
        opacity: .1;
      }
      
      :host(:hover) .custom-checkbox, :host(:focus) + .custom-checkbox {
        transform: scale(1.2);
        color: rgb(54, 112, 199);
      }
      
      .custom-checkbox {
        --size: 0.75em;
        display: inline-block;
        width: var(--size);
        height: var(--size);
        margin-right: var(--size);
        cursor: pointer;
        border: 2px solid currentColor;
        border-radius: 50%;
        -webkit-transform: scale(1);
        transform: scale(1);
        transition: transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out;
      }
      
      [type="checkbox"] {
        opacity: 0;
        position: absolute;
      }

      :host(:hover)  .custom-checkbox {
        opacity: 0.7;
      }
      
      [type="checkbox"]:checked + .custom-checkbox {
        background:  rgb(54, 112, 199);
        border-color:  rgb(54, 112, 199);
        box-shadow: inset 0 0 0px 2px white;
      }
      
      .label.completed {
        opacity: 0.5;
      }
      
      span {
        display: inline-block;
      }
      
      .label {
        position: relative;
        top: -5px;
      }
      
      .label::after {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        top: 50%;
        height: 3px;
        background: currentColor;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: right;
        transform-origin: right;
        transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
      }

      .label.completed::after {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: left;
        transform-origin: left;
      }
    `

    toggleItem() {
        this.completed = !this.completed;
        const {name, completed} = this;
        this.dispatchEvent(new CustomEvent('todo-item-toggled', {
            detail: {
                name, completed
            }
        }));
    }

    render() {
        return html`
            <li @click="${this.toggleItem}">
                <input class=".checkbox" type="checkbox" ?checked="${this.completed}"/>
                <span class="custom-checkbox"></span>
                <span class="label ${this.completed ? 'completed' : ''}">${this.name}</span>
            </li>
        `
    }
}