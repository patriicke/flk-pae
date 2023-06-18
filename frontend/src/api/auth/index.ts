import { PRIVATE_API } from '../axios';
import { AxiosErrorHandler, CustomError } from '~/core/libs';

export type RegisterUserPayload = {
    access_token: string;
};

export type LoginUserPayload = {
    access_token: string;
};

export const register_user = async <T>(
    memberPayload: T
): Promise<RegisterUserPayload | any> => {
    try {
        const request = await PRIVATE_API.post(
            '/users/register',
            memberPayload
        );
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const login_user = async <T>(
    userCredentials: T
): Promise<LoginUserPayload | any> => {
    try {
        const request = await PRIVATE_API.post('/users/login', userCredentials);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const who_am_i = async () => {
    try {
        const request = await PRIVATE_API.get('/user/whoami');
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
