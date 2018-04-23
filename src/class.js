class Message {
  send() {
    console.log('Sending message...')
  }
}


const message = new Message()

console.log('Message', message.send)

message.send()
