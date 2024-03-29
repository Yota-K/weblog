import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { colorObj } from '@/share/variables';
import { config } from '@/config/app';

type Props = {
  paginateType: string;
  totalCount: number;
};

const Paginate: React.FC<Props> = ({ paginateType, totalCount }) => {
  const router = useRouter();
  const path = router.asPath;

  const paginateNum = config.paginateNum;

  const generatePaginate = (paginateType: string, totalCount: number) => {
    // １ページ目のとき
    if (path === '/' || path === `/${paginateType}` || path === `/${paginateType}/1`) {
      return (
        <MyPaginate type="flex-end">
          <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/2`} className="next-paginate">
            Next &gt;&gt;
          </Link>
        </MyPaginate>
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
        <MyPaginate type="flex-start">
          <Link
            href={`/${paginateType}/[id]`}
            as={`/${paginateType}/${currentPaginateNum - 1}`}
            className="prev-paginate"
          >
            &lt;&lt; Prev
          </Link>
        </MyPaginate>
      );
    } else {
      return (
        <MyPaginate type="space-between">
          <Link
            href={`/${paginateType}/[id]`}
            as={`/${paginateType}/${currentPaginateNum - 1}`}
            className="prev-paginate"
          >
            &lt;&lt; Prev
          </Link>
          <Link
            href={`/${paginateType}/[id]`}
            as={`/${paginateType}/${currentPaginateNum + 1}`}
            className="next-paginate"
          >
            Next &gt;&gt;
          </Link>
        </MyPaginate>
      );
    }
  };

  return (
    <>
      {
        // 投稿が5記事よりも多い時はページネーションを表示
        totalCount > paginateNum && generatePaginate(paginateType, totalCount)
      }
    </>
  );
};

type StyleType = {
  type: string;
};

export const MyPaginate = styled.div<StyleType>`
  display: flex;
  justify-content: ${(props) => props.type};

  a {
    color: ${colorObj.baseBlue};
  }
`;

export default Paginate;
