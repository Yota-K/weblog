const axios = require('axios'); // eslint-disable-line
import { BlogJson, Content } from '../interfaces/blog';
import { TagJson, CategoryJson, TaxonomyJson } from '../interfaces/taxonomy';
import { RequestHeader } from '../interfaces/request-header';

export class API {
  static BASE_URL = 'https://karukichi-tech-blog.microcms.io/api/v1';

  private settingHeaders(): RequestHeader {
    const key = {
      headers: { 'X-API-KEY': process.env.access_key },
    };
    return key;
  }

  getHeaders(): RequestHeader {
    return this.settingHeaders();
  }

  // タグ一覧とカテゴリー一覧の取得
  async getTaxonomyList(url: string): Promise<TaxonomyJson> {
    const headers = this.getHeaders();
    try {
      const res = await axios.get(`${url}/taxonomy`, headers);
      const data = res.data;
      return data;
    } catch (er) {
      console.log(er.status);
      return er;
    }
  }
}
