import jwt_decode from "jwt-decode";
import moment from "moment";

export const getCurrentTime = () => {
	return new Date().toLocaleTimeString();
}

export const getCurrentDate = () => {
	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

export const getUserIdFromJWT = () => {
	const feathersJWT = localStorage.getItem("feathers-jwt") || "{}";
	const jwt: any = jwt_decode(feathersJWT);
	return jwt.userId;
}

export const itsMyDoc = (id: string) => {
	const userId = getUserIdFromJWT();
	return id === userId;
}

export const parseDate = (date?: string) => {
	const isPM = moment(date, "HH:mm:ss")
		.subtract(5, "hours")
		.isAfter(moment("12:00:00", "HH:mm:ss"));

	if (isPM) {
		return moment(date, "HH:mm:ss").subtract(5, "hours").format("h:mm A");
	} else {
		return moment(date, "HH:mm:ss").subtract(5, "hours").format("h:mm A");
	}
};