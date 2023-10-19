import styled from 'styled-components'

interface IHomeCharComponent {
  color: Color
  background_color: Color
}

export const HomeCharComponent = styled.h1<IHomeCharComponent>`
  width: 2.2rem;
  height: 2.2rem;

  font-size: 2.0rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;

  color: rgba(${(props) => props.color.join(',')}, 1);
  background-color: rgba(${(props) => props.background_color.join(',')}, 0.2);

  border-style: solid;
  border-width: 1px;
  border-color: rgba(${(props) => props.background_color.join(',')}, 1);
  border-radius: 10%;
`
