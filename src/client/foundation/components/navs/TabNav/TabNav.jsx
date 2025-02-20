import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Space } from "../../../styles/variables";
import { Stack } from "../../layouts/Stack";

/**
 * @typedef ItemProps
 * @property {string} to
 */

const ItemWrapper = styled.li`
  a {
    border: 1px solid #a8a29e;
    border-radius: 12px;
    display: block;
    font-weight: bold;
    padding-bottom: 8px;
    padding-top: 8px;
    text-align: center;
    width: 96px;

    &:hover {
      border-color: #57534e;
    }

    &[aria-current] {
      background: #1c1917;
      color: #fff;
    }

    @media (min-width: 1024px) {
      width: 160px;
    }
  }
`;

/** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
const Item = ({ "aria-current": ariaCurrent, children, to, ...rest }) => {
  return (
    <ItemWrapper>
      {ariaCurrent ? (
        <a aria-current {...rest}>
          {children}
        </a>
      ) : (
        <Link aria-current={ariaCurrent} to={to} {...rest}>
          {children}
        </Link>
      )}
    </ItemWrapper>
  );
};

export const TabNav = ({ children }) => {
  return (
    <nav>
      <Stack horizontal as="ul" gap={Space * 2}>
        {children}
      </Stack>
    </nav>
  );
};
TabNav.Item = Item;
