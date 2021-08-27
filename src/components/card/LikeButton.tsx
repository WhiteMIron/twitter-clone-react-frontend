import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { ITweet } from '../../interfaces';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface LikeButtonProps {
  tweet: ITweet;
  countMutate: (
    data?: number | Promise<number> | MutatorCallback<number> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<number | undefined>;
}

const LikeButton: FC<LikeButtonProps> = ({ tweet, countMutate }) => {
  const token = localStorage.getItem('token') || null;

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/likes/islike/tweets/${tweet.id}`,
    fetcher,
  );

  const onClickLike = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACK_URL}/likes/tweets/${tweet.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      mutate();
      countMutate();
    }
  };

  if (!data) return <div>loading...</div>;
  if (error) return <span>error</span>;

  return (
    <FontAwesomeIcon
      className={`text-base ${data?.like && 'text-green-500'}`}
      icon={data?.like ? faHeart : farHeart}
      onClick={onClickLike}
    ></FontAwesomeIcon>
  );
};

export default LikeButton;
