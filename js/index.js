
const socket = io('http://localhost:8000',{
    withCredentials:true
});

const container=document.getElementById('chat-container')
container.scrollIntoView(true)


const msginp=document.getElementById('message-input')
const buton=document.getElementById("send-button")
const form=document.getElementById('send')

//appending in a way that we get everythiing in a function
const append=(message,position,classes)=>{
    const messageEle1=document.createElement('div')
    const messageEle2=document.createElement('div')
    messageEle1.append(messageEle2)
    messageEle2.innerText=message
    messageEle1.classList.add('chat-message')
    messageEle1.classList.add(position)
    messageEle2.classList.add(classes)
    container.append(messageEle1)

}

const name1=prompt("Enter your name")
socket.emit("new-user-joined",name1)

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msgval=msginp.value;
    append(`You: ${msgval}`,'right','right1')
    socket.emit('send',msgval)
    msginp.value=''
})
//for userjoined 
socket.on('user-joined',(name1)=>{
    append(`${name1} is joined`,'right','right1')
})
// user recieing chat from another user
socket.on('recieve',(data)=>{
    append(`${data.name}:${data.message}`,'left','left1')
})
//user disconnected
socket.on('disconnected',name1=>{
    append(`${name1} left the chat`,'left','left1')
})