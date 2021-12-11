import styled from 'styled-components';

export const TagArea = styled.div<{
  padding?: string;
}>`
  padding: ${(props) => (props.padding ? props.padding : 0)};
`;
