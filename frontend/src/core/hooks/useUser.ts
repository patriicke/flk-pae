import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { who_am_i } from '~/api/auth';
import { storage } from '~/core/utils';
import { adduserRedux } from '../redux/slices/userSlice';
import { REDUX_STORE_TYPE } from '../redux/store';
import { useLogout } from './useLogout';

export const CheckUser = () => {
    const token = storage.getToken();
    const dispatch = useDispatch();
    const { logout } = useLogout();
    const { userData } = useSelector((state: REDUX_STORE_TYPE) => state.user);

    const fetchUser = async () => {
        if (token) {
            try {
                const data = await who_am_i();
                const { user, access_token } = data.data;
                dispatch(adduserRedux(user));
                storage.setToken(access_token);
            } catch (error) {
                logout();
            }
        }

        if (!token && userData._id) {
            logout();
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
};
