import { FC } from 'react';
import { ITweet } from '../interfaces';
import ProfileIcon from './ProfileIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

interface CardProps {
  tweet: ITweet;
}
const Card: FC<CardProps> = ({ tweet }) => {
  dayjs.extend(relativeTime);
  return (
    <div className="flex">
      <div>
        <ProfileIcon></ProfileIcon>
      </div>
      <div>
        <span className="font-bold">{tweet.users.nickname}</span>
        <span className="ml-2 text-gray-500">
          {dayjs(tweet.createdAt).locale('ko').fromNow()}
        </span>
      </div>
    </div>
  );
};

export default Card;
