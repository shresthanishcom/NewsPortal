import React from "react";
import { useRouter } from "next/router";

export default function SpecificNews(props) {
  const router = useRouter();
  router.return(
    <div>
      <h1>{props.title}</h1>
      something
    </div>
  );
}
