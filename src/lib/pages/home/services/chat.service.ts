import feathersClient from "../../../@feathers/index.js";

const service = feathersClient.service("chats");

export default {
	service,

	async findAll(params: any) {
		const query = {
			query: {
				...params,
				$populate: ["messages"],
			}
		}

		return service.find(query);
	},

	async findByType(type: string) {

		const query = {
			query: {
				$populate: ['messages'],
				type: type,
			},
		}

		return service.find(query)
	},

	async create(chat: any) {
		return service.create(chat);
	},

	async addMessage(chatId: string, message: any) {
		return service.patch(chatId, message)
	}

};
