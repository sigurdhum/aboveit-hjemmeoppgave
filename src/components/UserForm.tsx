import Link from "next/link";
import React from "react";

export interface UserFormProps {}
export function UserForm({}: UserFormProps) {
  const video = "https://www.youtube.com/watch?v=dDpZfOQBMaU";

  return (
    <form>
      <p>
        Hadde ikke tid, men hadde gjort noe ala denne:
        <br />
        <Link href={video}>{video}</Link>
      </p>
      <button type="submit">Legg til bruker</button>
    </form>
  );
}
