import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { EROLE } from '~/core/enum';
import { REDUX_STORE_TYPE } from '~/core/redux/store';

const RoleProvider:React.FC = () => {
    const { userData } = useSelector((state: REDUX_STORE_TYPE) => state.user);

    if (userData.role === EROLE.MEMBER)
        return <Navigate to={'/'} />;
        
    if (userData.role === EROLE.ADMIN)
        return <Navigate to={'/admin'} />;
    
    return  <Navigate to={'/auth'} />;
    
};

export default RoleProvider;