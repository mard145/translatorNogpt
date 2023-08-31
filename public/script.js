// frontend.js

const socket = io('http://localhost:3000'); // Conecta ao servidor Socket.IO

// Cria uma conexão WebSocket com o servidor
socket.on('connect', () => {
  console.log('Conectado ao servidor');

  // Configura a captura de áudio do autofalante usando a API Web Audio
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);

      // Configura o WebSocket para enviar áudio ao servidor
      const audioNode = audioContext.createScriptProcessor(4096, 1, 1);

      audioNode.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        // Envie os dados de áudio para o servidor via WebSocket
        socket.emit('audioData', inputData);
      };

      audioSource.connect(audioNode);
      audioNode.connect(audioContext.destination);
    })
    .catch((error) => {
      console.error('Erro ao acessar o microfone:', error);
    });
});

// Recebe a transcrição do servidor
socket.on('transcription', (transcription) => {
  // Atualize a interface do usuário com a transcrição em tempo real
  updateUI(transcription);
});

// Função para atualizar a interface do usuário com a transcrição
function updateUI(transcription) {
  // Atualize sua interface do usuário (por exemplo, exiba a transcrição em uma div)
  const transcriptionDiv = document.getElementById('transcription');
  transcriptionDiv.textContent = transcription;
}
