import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { pathNameChecker } from '../../scripts/path-name-checker';

import { colorObj } from '../../share/variables';

interface Props {
  blogPageInfo?: {
    categoryId: string;
    categoryName: string;
    blogTitle: string;
  };
  pageTitle?: string;
}

const Breadcrumb: React.FC<Props> = ({ blogPageInfo, pageTitle }) => {
  const { siteTitle } = config.siteInfo;

  const isBlogPage = pathNameChecker();

  return (
    <MyBreadcrumb>
      <BreadcrumbItem>
        <Link href="/">
          <a>{siteTitle}</a>
        </Link>
      </BreadcrumbItem>
      {isBlogPage && (
        <>
          <BreadcrumbItem>
            <Link href="/category/[id]" as={`/category/${blogPageInfo?.categoryId}`}>
              <a>{blogPageInfo?.categoryName}</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{blogPageInfo?.blogTitle}</BreadcrumbItem>
        </>
      )}
      {pageTitle && <BreadcrumbItem>{pageTitle}</BreadcrumbItem>}
    </MyBreadcrumb>
  );
};

const MyBreadcrumb = styled.ul`
  margin-bottom: 20px;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  position: relative;
  display: inline;
  margin-right: 20px;
  a {
    color: ${colorObj.baseBlue};
    &:hover {
      text-decoration: underline;
    }
  }
  &::after {
    position: absolute;
    content: '>';
    bottom: -1px;
    right: -15px;
  }
  &:last-child::after {
    content: '';
  }
`;

export default Breadcrumb;
