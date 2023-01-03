import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import { getJWT } from "./utils";

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

export const authenticate = async () => {
	try {
		const response = await feathersClient.authenticate({
			strategy: "jwt",
			accessToken: localStorage.getItem("feathers-jwt"),
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};

if (localStorage.getItem("feathers-jwt")) {
	authenticate();
}

export default feathersClient;
