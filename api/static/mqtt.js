const client = new Paho.MQTT.Client("ws://104.237.1.145:8883/ws", "myClientId" + new Date().getTime());

const myTopic = "groups/games";

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe(myTopic)   //subscribe to our topic
}

const publish = (topic, msg) => {  //takes topic and message string
    let message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    client.send(message);
  };

client.onMessageArrived = onMessageArrived;
function onMessageArrived(message) {
    let el= document.createElement('div')
    let data = JSON.parse(message.payloadString)
    el.innerHTML = `<p>[${message.destinationName.replace('groups/', '')}] <b>${data['user']} </b>says: ${data['content']}</p>`
    document.body.appendChild(el)
  };
