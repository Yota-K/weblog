import cheerio from 'cheerio';
import hljs from 'highlight.js';
import { Content } from '@/types/content';

export const parseHtml = (blog: Content) => {
  const $ = cheerio.load(blog.body, { _useHtmlParser2: true });

  const headings = $('h2, h3').toArray();

  // MEMO: ライブラリのバージョンをあげたら、コンパイルエラーが発生するようになった
  const toc = headings.map((data: cheerio.Element) => ({
    //@ts-ignore
    id: data.attribs.id,
    //@ts-ignore
    text: data.children[0].data,
    //@ts-ignore
    type: data.name,
  }));

  $('pre > code').each((i, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    blog,
    toc,
    body: $.html(),
  };
};
