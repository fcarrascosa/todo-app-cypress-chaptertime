import {css, html, LitElement} from "lit";

export class TodoInput extends LitElement {
    static styles = css`
      :host {
        padding: 1rem;
        color: #333;
        font-family: 'Fira Code', monospace;
      }
      
      input {
        background: transparent;
        border: 0;
        border-bottom: 1px solid currentColor;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        margin-bottom: 2px;
        transition: border-bottom 250ms ease-in, margin-bottom 250ms ease-in;
      }

      input::placeholder {
        font-family: 'Fira Code', monospace;
        color: inherit;
        opacity: .3;
      }
      
      input:focus {
        border-bottom-width: 3px;
        outline: none;
        margin-bottom: 0;
      }

      input:focus::placeholder {
        opacity: .5;
      }
      
      
    `

    keyup(keyboardEvent) {
        if (keyboardEvent.key !== 'Enter') return;

        const input = keyboardEvent.target;
        const {value} = input;
        this.dispatchEvent(new CustomEvent('todo-input-keyup', {detail: {value}}));
        input.value = '';
    }

    render() {
        return html`<input type="text" @keyup="${this.keyup}" placeholder="Type your task here"/>`
    }
}