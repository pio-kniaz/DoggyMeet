import styled from '@emotion/styled';

interface IUserBioWrapper {
  isOpen?: boolean;
}

export const AvatarImg = styled.img`
    max-width: 100px;
    max-height: 100px;
    border-radius: 50px;
    margin: 1rem auto;
  }};
`;

export const UserBioWrapper = styled.div<IUserBioWrapper>`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  width: 185px;
  position: absolute;
  z-index: ${(props) => (props.isOpen ? '1' : '0')};
  top: 88px;
  border-radius: 5px;
  border: ${(props) => {
    return `1px solid ${props.theme.colors.gray[200]}`;
  }};
  background: ${(props) => {
    return `${props.theme.colors.white}`;
  }};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: opacity 0.15s ease-out;
`;
