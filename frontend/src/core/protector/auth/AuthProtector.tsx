import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { REDUX_STORE_TYPE } from '~/core/redux/store';
import { storage } from '~/core/utils';
import { ProtectorPropsType } from '../types';

export const AuthRouteProtector = (
    props: ProtectorPropsType
): JSX.Element => {
    const { element } = props;

    const token = storage.getToken();

    const { userData } = useSelector((state: REDUX_STORE_TYPE) => state.user);

    if (token && userData.role) return <Navigate to={'/'} />;

    return element;
};
