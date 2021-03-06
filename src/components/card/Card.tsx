import { FC } from 'react';
// import { ITweet } from '../interfaces';
// import ProfileIcon from './ProfileIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment as farComment,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Like from './Like';
import { ITweet } from '../../interfaces';
import ProfileIcon from '../ProfileIcon';
import Ellipsis from './Ellipsis';
import { MutatorCallback } from 'swr/dist/types';

interface CardProps {
  tweet: ITweet;
  mutate: (
    data?: ITweet[] | Promise<ITweet[]> | MutatorCallback<ITweet[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITweet[] | undefined>;
}
const Card: FC<CardProps> = ({ tweet, mutate }) => {
  dayjs.extend(relativeTime);
  return (
    <li className="flex border-b-1">
      <div className="mt-4 mx-4">
        <ProfileIcon></ProfileIcon>
      </div>
      <div className="mt-6 text-sm  w-full mr-4">
        <span className="font-bold">{tweet.users.nickname}</span>
        <span className="ml-2 text-gray-500">
          {dayjs(tweet.createdAt).locale('ko').fromNow()}
        </span>
        <div>{tweet.tweet}</div>
        <div className="flex justify-between my-4">
          <div className="w-full">
            <FontAwesomeIcon icon={farComment} />
            <span>123</span>
          </div>
          <Like tweet={tweet} />
          <Ellipsis tweet={tweet} mutate={mutate} />

          <div className="w-full">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="ml-2">123</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
