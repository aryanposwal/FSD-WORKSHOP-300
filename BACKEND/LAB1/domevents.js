import { EventEmitter } from "node:events";
function createDOMElement(){
    const emitter = new EventEmitter();    
    return {
        addEventListner(eventName, callback){
            emitter.on(eventName, callback);

        },
        removeEventListner(eventName, callback){
            emitter.off(eventName, callback);
        },
        dispatchEvent(event){
            emitter.emit(event.type, event);
        },
    };
}
const button = createDOMElement();
button.addEventListner("click", (event) => {
    console.log("button clicked", event);
})

// button.dispatchEvent({
//     type: "click",
//     detail: "hello from nodejs",
// });
button.dispatchEvent({
    type: "save",
    handleclick    
});
function handleclick(event){
    console.log(`button clicked!`);
    console.log(`Event Type: ${event.type}`);
    console.log(`message: ${event.detail}`);
}