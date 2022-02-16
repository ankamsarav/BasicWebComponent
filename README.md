# Web components 
They are nothing but a custom component created by us and given to the browser

## Custom web components need to be named with '-'
    ex: 'my-popup' and usage <my-popup></my-popup>
## Slot helps passing html to web components
    a. use this as placeholder where we want to pass our dynamic html
        ex: <Slot name='message'></Slot>
    b. use the value of the name attribute in the slot as shown above to pass the html 
        ex: <my-popup><span slot='message'><h1>I'm dynamic</h1></span></my-popup>
## connectedCallBack is the method which can be used to do something after the component finished rendering in the window
    