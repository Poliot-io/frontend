interface AuditModel {
	createdAt?: string;
	updatedAt?: string;
}

export interface MessageProps extends AuditModel {
	text: string;
	userId: string;
}

export interface ProfileProps extends AuditModel {
	_id: string;
	online: boolean;
	profilePic: string;
	nickname: string;
}

export interface ChatProps extends AuditModel {
	_id: string;
	type: string;
	// users: string[];
	messages: MessageProps[];
	createdAt: string;
	updatedAt: string;
}

export interface PaginableProps extends AuditModel {
	total: number;
	limit: number;
	skip: number;
	data: any[];
}