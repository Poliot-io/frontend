import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_PUBLIC_DNS);
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
