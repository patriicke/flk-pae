import axios from 'axios';
import { config } from '~/config';
import { storage } from '~/core/utils';

export const PRIVATE_API = axios.create({
    baseURL: `${config.BASE_URI}/api/v1/`,
    headers: {
        Authorization: `Bearer ${storage.getToken()}`,
    },
});
