import { FC } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { ITweet } from '../../interfaces';
import Card from './Card';

interface CardProps {
  tweets: ITweet[];
  mutate: (
    data?: ITweet[] | Promise<ITweet[]> | MutatorCallback<ITweet[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITweet[] | undefined>;
}

const Cards: FC<CardProps> = ({ tweets, mutate }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return <Card key={tweet.id} tweet={tweet} mutate={mutate}></Card>;
      })}
    </div>
  );
};

export default Cards;
