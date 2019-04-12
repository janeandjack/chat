import ChatMessage from './modules/ChatMessage.js';
import {UserconnectionMsg, UserdisconnectionMsg} from './modules/new.js';


const socket  = io();

function logConnect({sID, message}) {
    // debugger;
    console.log(sID, message);
    vm.socketID = sID;

}

// function logConnect() {
//     debugger;
//     console.log('connected');
// }

function appendMessage(message) {
    console.log('appending message');
    message.type = 'chatMessage';
    vm.messages.push(message);
}

function appendalert(message) {
    console.log('alert');
    //new.js has to comp, if sentence to decide which comp going to
    if (message.event === 'userconnection') {
        message.type = 'userconnectionMsg';
    } else if (message.event === 'userdisconnection') {
        message.type = 'userdisconnectionMsg';
    } 
    vm.messages.push(message);
}

//create vue instance 
const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],
        typing: false
    },
 watch:{
    newmessage(value){
        value ? socket.emit('typing') : socket.emit('stopTyping')
    }
 },
    methods: {
        dispatchMessage(){
            //emit message event from the client side
        socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});

        //reset the message field
        this.message = "";
        
        
        }
    },
    created() {
        //watch strat tying
        //it is not working at now
        socket.on('typing', () => {
              this.typing = true
        })
        //watch end tying
        socket.on('stopTyping', () => {
            this.typing = false
      })
    },
    components: {
        // newmessage: ChatMessage
        chatMessage: ChatMessage,
        userconnectionMsg: UserconnectionMsg,
        userdisconnectionMsg: UserdisconnectionMsg
    },

}).$mount(`#app`);

socket.on('connected', logConnect);

socket.addEventListener('chat message', appendMessage);
socket.addEventListener('alert', appendalert);
socket.addEventListener('disconnect', appendMessage);

