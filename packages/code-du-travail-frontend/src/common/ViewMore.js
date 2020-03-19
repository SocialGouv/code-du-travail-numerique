import React, { useCallback, useState } from "react";
import { Button } from "@socialgouv/react-ui";

function ViewMore({ pageSize = 4, ...props }) {
  const [page, setCurrentPage] = useState(1);
  const viewMore = useCallback(() => {
    setCurrentPage(page + 1);
  }, [page, setCurrentPage]);
  const nbChildrenVisible = pageSize * page;
  const showButton = React.Children.count(props.children) > nbChildrenVisible;
  return (
    <>
      {React.Children.toArray(props.children).slice(0, nbChildrenVisible)}
      {showButton && <Button onClick={viewMore}>Voir plus</Button>}
    </>
  );
}

export { ViewMore };
