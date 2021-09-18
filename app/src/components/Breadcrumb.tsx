import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { pathNameChecker } from '../../utils/path-name-checker';
import { colorObj } from '../../share/variables';

interface Props {
  blogPageInfo?: {
    categoryId: string;
    categoryName: string;
    blogTitle: string;
  };
  pageTitle?: string;
  draftKey?: string;
}

const Breadcrumb: React.FC<Props> = ({ blogPageInfo, pageTitle, draftKey }) => {
  const router = useRouter();
  const { siteTitle } = config.siteInfo;

  // 記事ページ用のパンくず
  const blogPageBreadCrumb = () => {
    const isBlogPage = pathNameChecker(router);

    // draftKeyがある（下書き）の場合にもパンくずを表示
    if (isBlogPage || draftKey) {
      return (
        <>
          <BreadcrumbItem>
            <Link href="/category/[id]" as={`/category/${blogPageInfo?.categoryId}`}>
              <a>{blogPageInfo?.categoryName}</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{blogPageInfo?.blogTitle}</BreadcrumbItem>
        </>
      );
    }
  };

  return (
    <MyBreadcrumb>
      <BreadcrumbItem>
        <Link href="/">
          <a>{siteTitle}</a>
        </Link>
      </BreadcrumbItem>
      {blogPageBreadCrumb()}
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
  color: ${colorObj.baseBlue};

  a {
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

  &:last-child {
    color: ${colorObj.fontColor};
    &::after {
      content: '';
    }
  }
`;

export default Breadcrumb;
