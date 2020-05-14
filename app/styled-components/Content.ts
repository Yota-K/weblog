import styled from 'styled-components';
import { colorObj } from './variables';

export const Content = styled.div`
    margin-top: 35px;
    min-height: 800px;
    word-break: break-word;
    .eyecatch {
        margin: -20px 0 60px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    h2 {
        margin: 20px 0;
        padding: 0.4rem;
        background: #b8d0f5;
        border-radius: 3px;
        font-size: 1.8rem;
        letter-spacing: 0.4px;
    }
    h3 {
        position: relative;
        margin: 20px 0;
        padding-bottom: 5px;
        font-size: 1.6rem;
        border-bottom: 2px solid ${colorObj.borderGray};
        &::after {
            position: absolute;
            bottom: -2px;
            left: 0;
            content: "";
            width: 30%;
            border-bottom: 2px solid ${colorObj.baseBlue};
        }
    }
    a {
        color: blue;
        text-decoration: underline;
        font-weight: 600;
        &:hover {
            color: red;
            transition: all 0.4s;
        }
    }
    p {
        font-size: 18px;
        line-height: 35px;
    }
    img {
        width: 100%;
        height: auto;
        margin: 30px 0;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    ul, ol {
        margin: 25px 0;
        padding: 0.5em 0.5em 0.5em 2em;
        background: #f1f1f1;
        border: 1px solid ${colorObj.borderGray};
        border-radius: 3px;
        li {
            font-weight: 600;
            line-height: 1.9;
        }
    }
    pre {
        padding: 12px;
        background: rgb(39, 44, 52);
        color: #fff;
        border-radius: 3px;
        overflow-x: scroll;
        code {
            font-size: 14px;
            line-height: 2.4;
        }
    }
`;
