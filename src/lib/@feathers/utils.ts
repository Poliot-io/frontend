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

export const login = async (email: string, password: string) => {
	const body = {
		email,
		password,
		strategy: "local",
	};

	try {
		const response: any = await feathersClient?.authenticate(body);
		const res = await feathersClient.authenticate({
			strategy: "jwt",
			accessToken: response.accessToken,
		})
		return res;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
