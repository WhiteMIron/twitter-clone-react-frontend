import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

const ProfileIcon: FC = () => {
  return (
    <div className="rounded-full- h-12 w-12 flex items-center justify-center bg-gray-300 hover:bg-gray-400">
      <FontAwesomeIcon
        className="text=3xl text-gray-600 "
        icon={faUser}
      ></FontAwesomeIcon>
    </div>
  );
};
export default ProfileIcon;
