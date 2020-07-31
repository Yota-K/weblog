import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { colorObj } from '../../share/variables';

interface Props {
  paginateType: string;
  paginate: number[];
  offsetNum: number;
  totalCount: number;
}

const Paginate: React.FC<Props> = ({ paginateType, paginate, offsetNum, totalCount }) => {
  const router = useRouter();
  const path = router.asPath;

  const generatePaginate = (paginateType: string, paginate: number[], offsetNum: number, totalCount: number) => {
    if (path === '/' || path === `/${paginateType}/1`) {
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

    if (currentPaginateNum === totalPaginateNum) {
      return (
        <Link href={`/${paginateType}/[id]`} as={`/${paginateType}/${paginate.length - 1}`}>
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

  return <MyPaginate>{generatePaginate(paginateType, paginate, offsetNum, totalCount)}</MyPaginate>;
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
