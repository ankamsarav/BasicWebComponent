const template = document.createElement('template');

template.innerHTML =  `
    <style>
        .cancel {
            display: none;
        }
        svg {
            width: 24px;                        
        }
        .tooltip-container {
            display: inline-block;
            position: relative;
            z-index: 2;
            vertical-align: text-top;
        }
        .notify-container {
            position: absolute;
            bottom: 125%;
            z-index: 9;
            width: 300px;
            background: #fff;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            border-radius: 5px;
            padding: 5px;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0);
            cursor: pointer;
        }
    </style>
    <div class="tooltip-container">
        <svg viewBox="0 0 1024 1024" class='alert'>
            <path
                d="M480 674V192c0-18 14-32 32-32s32 14 32 32v482h-64zm0 63h64v60h-64v-60zM0 512C0 229 229 0 512 0s512 229 512 512-229 512-512 512S0 795 0 512zm961 0c0-247-202-448-449-448S64 265 64 512s201 448 448 448 449-201 449-448z" />
        </svg>
        <svg viewBox="0 0 1024 1024" class='cancel'>
            <path
                d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249 12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0 12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z" />
        </svg>
        <div class="notify-container">
            <slot name="message" />
        </div>
    </div>
`

class Bubble extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(isExpanded){
        const notifyContainer = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');
        
        notifyContainer.style.transform = isExpanded ? 'scale(1)' : 'scale(0)';
        alert.style.display = isExpanded ? 'none' : 'block';
        cancel.style.display = isExpanded ? 'block' : 'none';

        if(isExpanded){            
            isExpanded = false;            
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('.alert').addEventListener('click', ()=>{
            this.tooltip(true);
        });
        this.shadowRoot.querySelector('.cancel').addEventListener('click', ()=>{
            this.tooltip(false);
        });

        if(this.getAttribute('font-color')){
            this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('font-color');
        }
    }
};

window.customElements.define('custom-bubble', Bubble);