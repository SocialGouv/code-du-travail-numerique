import React from "react";

import { Section } from "../layout/Section/index.js";
import { Table } from "./index.js";

export default {
  component: Table,
  title: "Components/Table",
};

export const base = () => (
  <>
    <Section>
      <Table>
        <caption>Some caption</caption>
        <thead>
          <tr>
            <th>Table header 1</th>
            <th>Table header 2</th>
            <th>Table header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Line 1</th>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 2</th>
            <td>some data</td>
            <td>some data</td>
          </tr>
        </tbody>
      </Table>
    </Section>
    <Section>
      <Table stripes>
        <caption>Table with stripes</caption>
        <thead>
          <tr>
            <th>Table header 1</th>
            <th>Table header 2</th>
            <th>Table header 3</th>
            <th>Table header 4</th>
            <th>Table header 5</th>
            <th>Table header 6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Line 1</th>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 2</th>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 3</th>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 4</th>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 2</th>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
            <td>some data</td>
          </tr>
        </tbody>
      </Table>
    </Section>
  </>
);
