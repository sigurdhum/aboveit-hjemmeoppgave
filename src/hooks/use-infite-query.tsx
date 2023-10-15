import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type User = {
  map(arg0: (user: any) => import("react").JSX.Element): any;
  gender: string;
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: { latitude: string; longitude: string };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  phone: string;
  cell: string;
  id: { name: string; value: string };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

export type UserRespons = {
  pages: [
    {
      results: User[];
      info: {
        seed: string;
        results: number;
        page: string;
        version: string;
      };
    }
  ];
  pageParams: [null];
};

export const getInfiniteUsers = (limit: number) => {
  return useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const url = `https://randomuser.me/api/?results=${limit}&seed=aboveit&exc=login&page=${pageParam}`;
      const response = await axios.get(url);
      return response.data.results as User[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );
};
