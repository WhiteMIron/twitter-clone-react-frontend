import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { ITweet } from '../../interfaces';
import axios from 'axios';
import { FC, useEffect } from 'react';
import useSWR from 'swr';
import LikeButton from './LikeButton';

export interface LikeProps {
  tweet: ITweet;
}

const Like: FC<LikeProps> = ({ tweet }) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<number>(
    `${process.env.REACT_APP_BACK_URL}/likes/count/tweets/${tweet.id}`,
    fetcher,
  );
  //useEffect(() => {}, [])
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (error) return <span>error</span>;

  return (
    <div className="w-full">
      <LikeButton tweet={tweet} countMutate={mutate}></LikeButton>
      {data !== 0 && <span className="ml-2">{data}</span>}
    </div>
  );
};

export default Like;
