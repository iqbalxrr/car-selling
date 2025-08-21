
import { useSession } from 'next-auth/react';
import React from 'react';

const userProfile = () => {

    const session = useSession();
    return (
        
        <div>
            <h1>User Profile</h1>
            <p>Email: {session?.user?.email}</p>
            <p>Name: {session?.user?.name}</p>
        </div>
    );
};

export default userProfile;