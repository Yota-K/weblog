import React, { useRef, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

import { colorObj } from '@/share/variables';

type Props = {
  siteTitle: React.ReactNode;
};

const Footer: React.FC<Props> = ({ siteTitle }) => {
  const scrollSvgRef = useRef<SVGSVGElement>(null);

  const handleScroll = () => {
    if (!scrollSvgRef.current) return;

    const height = window.innerHeight;
    const offset = window.pageYOffset;

    if (offset - height > height) {
      scrollSvgRef.current.style.transform = 'translateY(0)';
    } else {
      scrollSvgRef.current.style.transform = 'translateY(1000px)';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      <ScrollSvg
        ref={scrollSvgRef}
        onClick={() => scroll.scrollToTop()}
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 24 24"
        className="scroll-top"
      >
        <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
      </ScrollSvg>
      <FooterBar>
        <SiteInfo>
          <p>
            このサイトはreCAPTCHAによって保護されており、Googleの
            <a href="https://policies.google.com/privacy">プライバシーポリシー</a>と
            <a href="https://policies.google.com/terms">利用規約</a>が適用されます。
          </p>
        </SiteInfo>
        <CopyRight>
          © 2020〜{new Date().getFullYear()} {siteTitle}
        </CopyRight>
      </FooterBar>
    </>
  );
};

const ScrollSvg = styled.svg`
  position: fixed;
  bottom: 16px;
  right: 10px;
  padding: 8px;
  background: ${colorObj.accentBlue};
  fill: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  transform: translateY(1000px);
  transition: all 0.8s;
  cursor: pointer;
  z-index: 10000;

  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
`;

const FooterBar = styled.footer`
  margin-top: 100px;
  padding: 20px;

  .scroll-top {
  }

  p {
    text-align: center;
  }
`;

const SiteInfo = styled.div`
  font-size: 14px;
  margin-bottom: 22px;

  a {
    color: ${colorObj.baseBlue};
    font-weight: bold;
  }
`;

const CopyRight = styled.p`
  font-size: 12px;
`;

export default Footer;
