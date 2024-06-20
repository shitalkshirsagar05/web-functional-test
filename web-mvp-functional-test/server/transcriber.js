import EventEmitter from "events";

function noop() {}

class Transcriber extends EventEmitter {
  constructor() {
    super();

  }


  // sampleRate: number
  startTranscriptionStream(sampleRate) {
    // example deepgram configuration
    /*
    {
      model: "nova-2",
      punctuate: true,
      language: "en",
      interim_results: true,
      diarize: false,
      smart_format: true,
      endpointing: 0,
      encoding: "linear16",
      sample_rate: sampleRate,

    }
      */
  }

  endTranscriptionStream() {
    // close deepgram connection here
    this.connection = new WebSocket("wss://api.deepgram.com/v1/listen", {
      headers: {
        Authorization: `Token YOUR_DEEPGRAM_API_KEY`
      }
    });

    this.connection.onopen = () => {
      console.log("Deepgram connection opened");
      this.emit("started");
    };

    this.connection.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.emit("transcription", message);
    };

    this.connection.onerror = (error) => {
      console.error("Deepgram connection error:", error);
      this.emit("error", error);
    };

    this.connection.onclose = () => {
      console.log("Deepgram connection closed");
      this.emit("closed");
    };
  }

  endTranscriptionStream() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    } else {
      console.warn("No active connection to close.");
    }
  }

  // NOTE: deepgram must be ready before sending audio payload or it will close the connection
  send(payload) {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      this.connection.send(payload);
    } else {
      console.warn("Connection is not open. Unable to send payload.");
    }
  }
    
}

export default Transcriber;
