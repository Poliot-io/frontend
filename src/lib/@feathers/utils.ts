import userService from "lib/pages/home/services/user.service";
import { getUserIdFromJWT } from "lib/pages/home/utils";
import feathersClient from "./index";

export const getJWT = () => {
	return localStorage.getItem("feathers-jwt");
};

export const logout = () => {
	feathersClient.logout();
	userService.service.patch(getUserIdFromJWT(), { online: false });
};

export const loginLocal = async (email: string, password: string) => {
	const body = {
		email,
		password,
		strategy: "local",
	};

	try {
		const response: any = await feathersClient?.authenticate(body);
		const res = await feathersClient.authenticate({
			strategy: "local",
			accessToken: response.accessToken,
		})
		return res;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const loginJWT = async (email: string, password: string) => {

	try {
		const res: any = await fetch("http://164.90.159.217:3001/authentication", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({ strategy: "local", email, password }),
		})
		const data = await res.json()

		const response: any = await feathersClient?.authenticate({
			strategy: "jwt",
			accessToken: data.accessToken,
		});
		return response;
	} catch (error: any) {
		throw new Error(error.message);
	}
}