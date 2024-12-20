import React from "react";

import { getText } from "../utils";
import { FicheSPDataVideo } from "../type";
import Link from "../../../common/Link";

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
