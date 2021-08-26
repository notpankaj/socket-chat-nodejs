// make connection
var socket = io.connect("http://localhost:4000");

//Query Dom
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//emit event
btn.addEventListener("click", function () {
  //send chat
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

//listen for events
//recive chat
socket.on("chat", function (data) {
  console.log("❤", data);
  output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
  feedback.innerHTML = "";
});

// broadcast
message.addEventListener("keypress", (e) => {
  socket.emit("typing", handle.value);
});

socket.on("typing", function (data) {
  feedback.innerHTML = `<p><em>${data}</em> is typing a message...</p>, `;
});
