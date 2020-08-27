import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colorObj } from '../../share/variables';

interface Props {
  paginateType: string;
  offsetNum: number;
  totalCount: number;
}

const Paginate: React.FC<Props> = ({ paginateType, offsetNum, totalCount }) => {
  const router = useRouter();
  const path = router.asPath;

  const generatePaginate = (paginateType: string, offsetNum: number, totalCount: number) => {
    // 投稿が5記事以下の時はページネーションを非表示
    if (totalCount <= offsetNum) return <></>;

    // １ページ目のとき
    if (path === '/' || path === `/${paginateType}` || path === `/${paginateType}/1`) {
      return (
        <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/2`}>
          <a className="next-paginate">Next &gt;&gt;</a>
        </Link>
      );
    }

    const pathMatch = path.match(/\d+$/g);

    if (pathMatch === null) return;

    const currentPaginateNum = parseInt(pathMatch[0]);
    const totalPaginateNum = Math.floor(totalCount / offsetNum) + 1;

    // パスに含まれるページネーションの数字と投稿数を表示数で割った数に1を足した数が同じ時は最後のページ
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

  return <MyPaginate>{generatePaginate(paginateType, offsetNum, totalCount)}</MyPaginate>;
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
