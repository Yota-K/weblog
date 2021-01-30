import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.slug || req.query.secret !== 'lpcbjzpvub6666') {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  try {
    const content = await fetch(`${process.env.ENDPOINT}/blogs/${req.query.slug}?draftKey=${req.query.draftKey}`, {
      headers: {
        'X-API-KEY': process.env.apiKey || '',
      },
    });

    const data = await content.json();

    if (!data) {
      return res.status(401).json({
        message: 'Invalid slug',
      });
    }

    res.setPreviewData({
      id: data.id,
      draftKey: data.draftKey,
    });

    res.writeHead(307, {
      Location: `/${data.id}`,
    });

    res.end('Preview mode enabled');
  } catch (er) {
    return res.status(404).json({
      message: null,
    });
  }
};
