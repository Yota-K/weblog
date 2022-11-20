import cheerio from 'cheerio';
import hljs from 'highlight.js';
import { Content } from '@/types/content';

type Toc = {
  id: string;
  text: string;
  type: string;
};

export const parseHtml = (blog: Content) => {
  const $ = cheerio.load(blog.body, { _useHtmlParser2: true });

  const headings = $('h2, h3').toArray();

  // MEMO: ライブラリのバージョンをあげたら、コンパイルエラーが発生するようになった
  const toc: Toc[] = headings.map((data: cheerio.Element) => ({
    //@ts-ignore
    id: data.attribs.id,
    //@ts-ignore
    text: data.children[0].data,
    //@ts-ignore
    type: data.name,
  }));

  $('pre > code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  // iframeのSP対応
  // 横幅が変わっても常に16:9の比率を保つようにする
  if ($('iframe').toArray().length !== 0) {
    $('iframe').each((_, elm) => {
      const wrapDiv = $(
        '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"></div>'
      );
      $(elm).wrap(wrapDiv);
      $(elm).attr('style', 'border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;');
    });
  }

  return {
    blog,
    toc,
    body: $.html(),
  };
};
