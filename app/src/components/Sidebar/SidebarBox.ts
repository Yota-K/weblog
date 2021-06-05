import styled from 'styled-components';

import { colorObj } from '../../../share/variables';

export const SidebarBox = styled.div`
  margin-bottom: 30px;
  line-height: 1.6;

  h4 {
    margin-bottom: 15px;
    padding: 10px 20px;
    background: ${colorObj.subBlue};
    border-radius: 3px;
  }

  .profile-area {
    .profile-icon {
      width: 100px;
      max-width: 100px;
      height: auto;
      display: inline-block;
      margin: 20px 0;
      border: 1px solid ${colorObj.borderGray};
      border-radius: 50%;
    }

    // プロフィールサイトのリンクの色
    p {
      a {
        &:hover {
          color: ${colorObj.baseRed};
        }
      }
    }

    .btn-area {
      margin-top: 10px;

      .mini-icon {
        margin-right: 10px;
      }

      .twitter svg {
        fill: #42afe3;
      }

      .github svg {
        fill: darkslategray;
      }
    }
  }
`;
