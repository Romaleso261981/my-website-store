import { ActionIcon, Image } from '@mantine/core';
import { signOut } from 'firebase/auth';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import logout from '@/access/logout.svg';
import { auth } from '@/integations/firebase';

const LogoutButton: FC = () => {
  const navigate = useNavigate();

  const handlerLogOut = useCallback(async () => {
    signOut(auth)
      .then(() => {
        console.log('success logout');
        navigate('/');
      })
      .catch((error) => {
        console.log(error, 'logout error');
      });
  }, []);
  return (
    <ActionIcon
      component="a"
      size="xl"
      aria-label="Open in a new tab"
      ml={10}
      onClick={handlerLogOut}>
      <Image h={30} w={30} src={logout} />
    </ActionIcon>
  );
};

export default LogoutButton;
