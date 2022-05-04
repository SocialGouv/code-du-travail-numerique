import React, { FormEventHandler, ForwardedRef } from "react";

const EmbeddedInForm = ({
  enable,
  reference,
  onSubmit,
  children,
}: {
  enable: boolean;
  reference: ForwardedRef<HTMLFormElement>;
  onSubmit: FormEventHandler;
  children: React.ReactNode;
}): JSX.Element => {
  if (enable) {
    return (
      <form ref={reference} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  return <>{children}</>;
};

export default EmbeddedInForm;
