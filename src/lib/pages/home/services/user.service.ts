import feathersClient from "../../../@feathers/index.js";
import { getUserIdFromJWT } from "../utils/index.js";

const service = feathersClient.service("users");

export default {
	service,
	async find(query: any) {
		return service.find(query);
	},
	async patchUser(id: any, data: any) {
		return service.patch(id, data);
	},
	async setUserStatus(status: any) {
		return service.patch(getUserIdFromJWT(), {
			online: status,
		});
	}
};
