import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

const socket = io("http://164.90.159.217:3001");
const feathersClient: any = feathers();

// Connect the client with the server
feathersClient.configure(socketio(socket));

// Configure the authentication plugin
feathersClient.configure(

	feathers.authentication({
		storage: localStorage,
	})
);

export default feathersClient;
