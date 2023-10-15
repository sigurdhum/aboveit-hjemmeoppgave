"use client";
import styles from "./page.module.css";
import { User, getInfiniteUsers } from "@/hooks/use-infite-query";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { Card } from "@/components/Card";
import { UserForm } from "@/components/UserForm";

export default function Home() {
  const [value, setValue] = useState("");

  const { data, fetchNextPage, isFetchingNextPage } = getInfiniteUsers(10);
  const users = data?.pages as User[] | undefined;

  const lastUserRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastUserRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  if (entry?.isIntersecting) {
    fetchNextPage();
  }

  const _users = users?.flatMap((user) => user);

  return (
    <main>
      <UserForm />
      <div id="result">
        {_users?.map((user: User, idx: number) => {
          if (idx === _users.length - 1)
            return <Card user={user} refe={ref} key={user.id.value} />;
          return <Card user={user} key={user.id.value} />;
        })}
      </div>
    </main>
  );
}
