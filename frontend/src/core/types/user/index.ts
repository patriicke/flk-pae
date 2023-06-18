import { ModelType } from '../model';

export type UserType = ModelType & {
    fullname: string;
    email: string;
    username: string;
    password: string;
    profile_image: string;
    role: 'ADMIN' | 'MEMBER';
    rooms: [];
    status: string;
    chatTheme: {
        color: boolean;
        image: boolean;
        content: string;
    };
};

export type CreateUserPayloadType = {
    email: string;
    fullname: string;
    username: string;
    password: string;
    profile_image?: string;
};
