import React from "react";

import { getText } from "../utils";
import Link from "next/link";
import { FicheSPDataVideo } from "../type";

export const Video = ({ data }: { data: FicheSPDataVideo }) => {
  const url = data.attributes.URL;
  const title = getText(data.children[0]);
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      Cliquez ici pour voir la vidéo {title}
    </Link>
  );
};

export default Video;
