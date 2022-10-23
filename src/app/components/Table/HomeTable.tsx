import { memo } from "react";

import styled from "@emotion/styled";

const Table = styled.table`
  /* border: 1px dashed #ccc; */
  & td {
    border: 1px dashed #ccc;
  }
`;

export const HomeTable = memo(() => {
  return (
    <Table>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      <tr>
        <td>Ernst Handel</td>
        <td>Roland Mendel</td>
        <td>Austria</td>
      </tr>
    </Table>
  );
});
