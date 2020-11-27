import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';
import { colorObj } from '../../share/variables';

interface Props {
  paginateType: string;
  totalCount: number;
}

const SearchPaginate: React.FC<Props> = ({ paginateType, totalCount }) => {
  const router = useRouter();
  const path = router.asPath;

  const paginateNum = config.paginateNum;

  const buildPaginateLink = (paginatePath: string, type: string) => {
    // search?query={検索ワード}という文字列を生成
    const baseSearchParam = paginatePath.replace(/\/[1-9]/, '');
    const findSearchPaginateNum = paginatePath.match(/[2-9]$/) as string[];

    let searchPaginateNum: number;

    if (type === 'first') {
      searchPaginateNum = 2;
    } else if (type === 'prev') {
      searchPaginateNum = parseInt(findSearchPaginateNum[0]) - 1;
    } else {
      searchPaginateNum = parseInt(findSearchPaginateNum[0]) + 1;
    }

    return `/${baseSearchParam}/${searchPaginateNum}`;
  };

  const generatePaginate = (paginateType: string, totalCount: number) => {
    // １ページ目のとき
    if (path.match(/search.+([^2-9])$/)) {
      const paginateLink = buildPaginateLink(paginateType, 'first');

      return (
        <MyPaginate type="flex-end">
          <Link href={`${paginateLink}`}>
            <a className="next-paginate">Next &gt;&gt;</a>
          </Link>
        </MyPaginate>
      );
    }

    const pathMatch = path.match(/\d+$/g);

    if (pathMatch === null) return;

    const currentPaginateNum = parseInt(pathMatch[0]);
    const totalPaginateNum = Math.ceil(totalCount / paginateNum);

    if (currentPaginateNum === totalPaginateNum) {
      const paginateLink = buildPaginateLink(paginateType, 'prev');

      return (
        <MyPaginate type="flex-start">
          <Link href={`${paginateLink}`}>
            <a className="prev-paginate"> &lt;&lt; Prev</a>
          </Link>
        </MyPaginate>
      );
    } else {
      const prevPaginateLink = buildPaginateLink(paginateType, 'prev');
      const relPaginateLink = buildPaginateLink(paginateType, 'next');

      return (
        <MyPaginate type="space-between">
          <Link href={`${prevPaginateLink}`}>
            <a className="prev-paginate">&lt;&lt; Prev</a>
          </Link>
          <Link href={`${relPaginateLink}`}>
            <a className="next-paginate">Next &gt;&gt;</a>
          </Link>
        </MyPaginate>
      );
    }
  };

  return <>{generatePaginate(paginateType, totalCount)}</>;
};

type StyleType = {
  type: string;
};

const MyPaginate = styled.div<StyleType>`
  display: flex;
  justify-content: ${(props) => props.type};
  a {
    color: ${colorObj.baseBlue};
  }
`;

export default SearchPaginate;
