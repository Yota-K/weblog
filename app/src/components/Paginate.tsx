import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { colorObj } from '../../share/variables';

interface Props {
  paginateType: string;
  paginateNum: number;
  totalCount: number;
}

const Paginate: React.FC<Props> = ({ paginateType, paginateNum, totalCount }) => {
  const router = useRouter();
  const path = router.asPath;

  const generatePaginate = (paginateType: string, paginateNum: number, totalCount: number) => {
    // 投稿が5記事以下の時はページネーションを非表示
    if (totalCount <= paginateNum) return <></>;

    // １ページ目のとき
    if (path === '/' || path === `/${paginateType}` || path === `/${paginateType}/1`) {
      return (
        <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/2`}>
          <a className="next-paginate">Next &gt;&gt;</a>
        </Link>
      );
    }

    const pathMatch = path.match(/\d+$/g);

    // pathMatchにnullが入らないようにする
    if (pathMatch === null) return;

    const currentPaginateNum = parseInt(pathMatch[0]);
    const totalPaginateNum = Math.ceil(totalCount / paginateNum);

    // パスに含まれるページネーションの数と投稿を表示数で割った数を切り上げた数値が同じ時は最後のページ
    if (currentPaginateNum === totalPaginateNum) {
      return (
        <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/${currentPaginateNum - 1}`}>
          <a className="prev-paginate"> &lt;&lt; Prev</a>
        </Link>
      );
    } else {
      return (
        <>
          <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/${currentPaginateNum - 1}`}>
            <a className="prev-paginate">&lt;&lt; Prev</a>
          </Link>
          <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/${currentPaginateNum + 1}`}>
            <a className="next-paginate">Next &gt;&gt;</a>
          </Link>
        </>
      );
    }
  };

  return <MyPaginate>{generatePaginate(paginateType, paginateNum, totalCount)}</MyPaginate>;
};

const MyPaginate = styled.div`
  a {
    color: ${colorObj.baseBlue};
  }
  .prev-paginate {
    float: left;
  }
  .next-paginate {
    float: right;
  }
`;

export default Paginate;
