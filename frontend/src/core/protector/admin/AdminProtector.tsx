import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { EROLE } from '~/core/enum';
import RoleProvider from '~/core/provider/role/RoleProvider';
import { REDUX_STORE_TYPE } from '~/core/redux/store';
import { storage } from '~/core/utils';
import { ProtectorPropsType } from '../types';

export const AdminRouteProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const token = storage.getToken();

    const { userData } = useSelector((state: REDUX_STORE_TYPE) => state.user);

    if (!token) return <Navigate to={'/auth'} />;

    if (userData.role !== EROLE.ADMIN)
        return <RoleProvider />;

    return element;
};
