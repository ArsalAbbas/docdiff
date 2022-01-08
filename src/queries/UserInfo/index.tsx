import { gql } from "apollo-boost";

export type UserInfo = {
	viewer: {
		name: string;
		login: string;
	};
};

export const getUserInfo = gql`
	query {
		viewer {
			name
			login
		}
	}
`;
