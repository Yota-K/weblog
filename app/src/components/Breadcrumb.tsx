import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { pathNameChecker } from '../../scripts/path-name-checker';

import { colorObj } from '../../share/variables';

interface Props {
  tagPageTitle?: string;
  categoryPageTitle?: string;
  blogPageInfo?: {
    categoryId: string;
    categoryName: string;
    blogTitle: string;
  };
}

const Breadcrumb: React.FC<Props> = ({ blogPageInfo, categoryPageTitle, tagPageTitle }) => {
  const isBlogPage = pathNameChecker('blog');
  const isCategoryPage = pathNameChecker('category');
  const isTagPage = pathNameChecker('tag');

  return (
    <MyBreadcrumb>
      <BreadcrumbItem>
        <Link href="/">
          <a>カルキチのブログ</a>
        </Link>
      </BreadcrumbItem>
      {isBlogPage !== null && (
        <>
          <BreadcrumbItem>
            <Link href="/category/[id]" as={`/category/${blogPageInfo!.categoryId}`}>
              <a>{blogPageInfo!.categoryName}</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{blogPageInfo!.blogTitle}</BreadcrumbItem>
        </>
      )}
      {isCategoryPage !== null && <BreadcrumbItem>{categoryPageTitle}</BreadcrumbItem>}
      {isTagPage !== null && <BreadcrumbItem>{tagPageTitle}</BreadcrumbItem>}
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
