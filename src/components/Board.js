import styled from 'styled-components';
import React from 'react';

const Base = styled.div`
  width: 100%;
  background: black;
  color: white; 
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

const Outline = styled.div`
  margin: 15px;
  align-self: center;
  width: calc(100% - 30px);
  border: 3px white solid;
  padding: 15px;
`

function Board(props) {
  return (
    <Base>
      <Outline>
        {props.children}
      </Outline>
    </Base>
  );
}

export default Board