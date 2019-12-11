import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { spacings } from "../theme";
import { Input } from "./Input";

export const InputDate = ({ name, ...props }) => (
  <StyledInputDate type="date" name={name} {...props} />
);

InputDate.propTypes = {
  name: PropTypes.string.required
};

const iconDate = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC45NDcgNy42MDFoMS42MDFjMS40NzIgMCAyLjUyMSAxLjE5OCAyLjUyMSAyLjY2OXYyLjMwNmwtLjAwMSAxMC4zOTJjMCAxLjQ3Mi0xLjA0OSAyLjY2OS0yLjUyMSAyLjY2OUg4LjY2OUEyLjY3MiAyLjY3MiAwIDAxNiAyMi45NjdsLjAwMS0xMi42OTdhMi42NzIgMi42NzIgMCAwMTIuNjctMi42NjloMS4zMzFWNmguOTk5djEuNjAxSDIwVjZoLjk0N3YxLjYwMXptMS42IDE3LjAzNmMuODgzIDAgMS40NTQtLjc4NiAxLjQ1NC0xLjY3di0xMC4zM2gtMTdMNyAyMi45NjdjMCAuODg0Ljc4NSAxLjY3IDEuNjY4IDEuNjdoMTMuODc5em0tMTUuNTQ4LTEzaDE3LjAwMmwuMDAxLTEuMzY3YzAtLjg4My0uNTctMS42MDEtMS40NTMtMS42MDFoLTEuNnYxLjA2OEgyMFY4LjY2OWgtOXYxLjA2OGgtMVY4LjY2OUg4LjY2OUM3Ljc4NiA4LjY2OSA3IDkuMzg3IDcgMTAuMjd2MS4zNjd6bTkuNjc3IDYuMjc3aC0yLjEzNWExLjA3IDEuMDcgMCAwMS0xLjA2OC0xLjA2OHYtMi4xMzVhMS4wNyAxLjA3IDAgMDExLjA2OC0xLjA2OGgyLjEzNWExLjA3IDEuMDcgMCAwMTEuMDY4IDEuMDY4djIuMTM1YTEuMDcgMS4wNyAwIDAxLTEuMDY4IDEuMDY4em0wLTMuMjAzaC0yLjEzNXYyLjEzNWgyLjEzNnYtMi4xMzV6bTMuMjAzIDMuMjAzaDIuMTM1YTEuMDcgMS4wNyAwIDAwMS4wNjgtMS4wNjh2LTIuMTM1YTEuMDcgMS4wNyAwIDAwLTEuMDY4LTEuMDY4SDE5Ljg4YTEuMDcgMS4wNyAwIDAwLTEuMDY4IDEuMDY4djIuMTM1YTEuMDcgMS4wNyAwIDAwMS4wNjggMS4wNjh6bTAtMy4yMDNoMi4xMzVsLjAwMSAyLjEzNUgxOS44OHYtMi4xMzV6bS04LjU0IDguNTQxSDkuMjA0YTEuMDcgMS4wNyAwIDAxLTEuMDY4LTEuMDY4di0yLjEzNWExLjA3IDEuMDcgMCAwMTEuMDY4LTEuMDY4aDIuMTM1YTEuMDcgMS4wNyAwIDAxMS4wNjggMS4wNjh2Mi4xMzVhMS4wNyAxLjA3IDAgMDEtMS4wNjggMS4wNjh6bTAtMy4yMDNIOS4yMDR2Mi4xMzVoMi4xMzZsLS4wMDEtMi4xMzV6bTMuMjAyIDMuMjAzaDIuMTM1YTEuMDcgMS4wNyAwIDAwMS4wNjgtMS4wNjh2LTIuMTM1YTEuMDcgMS4wNyAwIDAwLTEuMDY4LTEuMDY4aC0yLjEzNWExLjA3IDEuMDcgMCAwMC0xLjA2OCAxLjA2OHYyLjEzNWExLjA3IDEuMDcgMCAwMDEuMDY4IDEuMDY4em0wLTMuMjAzaDIuMTM1bC4wMDEgMi4xMzVoLTIuMTM2di0yLjEzNXptNy40NzMgMy4yMDNIMTkuODhhMS4wNyAxLjA3IDAgMDEtMS4wNjgtMS4wNjh2LTIuMTM1YTEuMDcgMS4wNyAwIDAxMS4wNjgtMS4wNjhoMi4xMzVhMS4wNyAxLjA3IDAgMDExLjA2OCAxLjA2OHYyLjEzNWExLjA3IDEuMDcgMCAwMS0xLjA2OCAxLjA2OHptMC0zLjIwM0gxOS44OHYyLjEzNWgyLjEzNnYtMi4xMzV6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L3N2Zz4=";

const StyledInputDate = styled(Input)`
  width: 40rem;
  padding-right: 0;
  width: 20rem;
  &[type="date"]::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background-color: ${({ theme }) => theme.placeholder};
    -webkit-mask-image: url('${iconDate}');
    mask-image: url('${iconDate}');
    width: ${spacings.large};
    height: ${spacings.large};
    cursor: pointer;
  }
`;
