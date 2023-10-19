import styled from 'styled-components'

interface IHomeCharComponent {
  color: Color
  background_color: Color
}

export const HomeCharComponent = styled.h1<IHomeCharComponent>`
  // スマホ
  @media (max-width: 767px) {
    width: 2.2rem;
    height: 2.2rem;
    font-size: 2.0rem;
  }

  // タブレット
  @media (min-width: 768px) and (max-width: 991px) {
    width: 3.0rem;
    height: 3.0rem;
    font-size: 2.5rem;
  }

  // PC
  @media (min-width: 992px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 3.0rem;
  }

  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;

  color: rgba(${(props) => props.color.join(',')}, 1);
  background-color: rgba(${(props) => props.background_color.join(',')}, 0.1);

  border-style: solid;
  border-width: 1px;
  border-color: rgba(${(props) => props.background_color.join(',')}, 1);
  border-radius: 10%;
`
