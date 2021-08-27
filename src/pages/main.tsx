import React, { FC } from 'react';
import axios from 'axios';
import UseSWR from 'swr';
import Cards from '../components/card/Cards';
import { ITweet } from '../interfaces';
import CreateTweet from '../components/main/CreateTweet';
import Header from '../components/common/Header';

const Main: FC = () => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, error, mutate } = UseSWR<ITweet[]>(
    `${process.env.REACT_APP_BACK_URL}/tweets`,
    fetcher,
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <Header title="HOME" />
      <CreateTweet mutate={mutate}></CreateTweet>
      <Cards tweets={data} mutate={mutate} />;
    </>
  );
};

export default Main;
