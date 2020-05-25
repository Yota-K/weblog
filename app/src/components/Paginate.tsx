import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
    paginate: number[];
}

const Paginate: React.FC<Props> = ({ paginate }) => {
    return (
        <MyPaginate>
            {paginate.map((page: any, i: number) => 
                <Link key={i} href="/page/[id]" as={`/page/${page}`}><a>{page}</a></Link>
            )}
        </MyPaginate>
    );
}

const MyPaginate = styled.div`
    a {
        background: #a0a8c1;
        color: #fff;
        padding: 8px 8px 10px 8px;
        display: inline-block;
        margin: 0 10px;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 50%;
    }
`

export default Paginate;
