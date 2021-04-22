document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = "block";

  const email = document.getElementById('email').value;
  const message = document.getElementById('txt_help').value;

  socket.on('connect', () => {

    const params = {
      email, 
      message
    }

    socket.emit('client_first_access', params, (cb, err) => {
      if(err)
        console.err(err);
      else
        console.log(cb);
    })

  });

});