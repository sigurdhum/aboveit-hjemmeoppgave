import { User } from "@/hooks/use-infite-query";
import Link from "next/link";
import React from "react";

export interface CardProps {
  user: User;
  refe?: React.Ref<HTMLDivElement>;
}

export function Card({ user, refe }: CardProps) {
  const [ariaHidden, setAriaHidden] = React.useState(true);

  const switchAriaHidden = () => {
    setAriaHidden(!ariaHidden);
  };

  //Div is not a button, but it is clickable. This is not optimal for accessibility. but it is better than nothing :)

  return (
    <div
      key={user.id.value}
      ref={refe}
      className="accordian"
      onClick={switchAriaHidden}
      aria-hidden={ariaHidden}
      tabIndex={0}
    >
      <h2>
        {user.name.first} {user.name.last}
      </h2>
      <div className="innhold">
        <img src={user.picture.large} alt={"Picture of " + user.name.first} />
        <div>
          <p>
            {" "}
            Mail <Link href={"mailto:" + user.email}>{user.email}</Link>
          </p>
          <p>
            Telephone <Link href={"tel:" + user.phone}>{user.phone}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
