import React, { FC, useContext, useState } from 'react';
import {
  faEllipsisH,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTrashAlt as farTrashAlt,
  faClone as farClone,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MeContext } from '../../contexts';
import { LikeProps } from './Like';
import axios from 'axios';
import { ITweet } from '../../interfaces';
import { MutatorCallback } from 'swr/dist/types';

interface EllipsisProps extends LikeProps {
  mutate: (
    data?: ITweet[] | Promise<ITweet[]> | MutatorCallback<ITweet[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITweet[] | undefined>;
}

const Ellipsis: FC<EllipsisProps> = ({ tweet, mutate }) => {
  const { me } = useContext(MeContext);

  const [ellipsisToggle, setEllipsisToggle] = useState<boolean>(false);

  const onClickEllipsisToggle = () => {
    setEllipsisToggle(!ellipsisToggle);
  };

  const onClickDeleteTweet = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/tweets/${tweet.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full relative">
      <div>
        <button onClick={onClickEllipsisToggle}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      </div>
      {ellipsisToggle && (
        <div className="absolute bg-white shadow-md">
          {me === tweet.users.id && (
            <button
              className="px-2 py-1 hover:bg-gray-200"
              onClick={onClickDeleteTweet}
            >
              <FontAwesomeIcon icon={farTrashAlt} />
              <span className="ml-4">Delete tweet</span>
            </button>
          )}
          <button className="px-2 py-1 hover:bg-gray-200">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ml-4">Report tweet</span>
          </button>
          <button className="px-2 py-1 hover:bg-gray-200">
            <FontAwesomeIcon icon={farClone} />
            <span className="ml-4">Copy tweet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Ellipsis;
