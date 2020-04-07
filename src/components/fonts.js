import { css } from 'lit-element';
import { highlight } from './color.js';
import { spacer4 } from './spacing.js';

export const h2Style = css`
  h2 {
    padding: 0px;
    margin: 0px;
    font-size: 0.85em;
  }
`;

export const pStyle = css`
  p {
    padding: ${spacer4} 0;
    margin: 0px;
    font-size: 0.9em;
  }
`;

export const highlightedSpan = css`
  span {
    color: ${highlight};
    font-weight: lighter;
    font-size: 0.8em;
    white-space: nowrap;
  }
`;