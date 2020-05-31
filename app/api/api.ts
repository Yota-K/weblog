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

  // 投稿一覧
  async getBlog(url: string, params_id: number): Promise<BlogJson> {
    const headers = this.getHeaders();
    try {
      let res;
      if (params_id > 0) {
        const offsetNum = 5;
        const page = params_id * offsetNum - offsetNum;
        res = await axios.get(`${url}/blogs?offset=${page}&limit=5`, headers);
      } else {
        res = await axios.get(`${url}/blogs?offset=${params_id}&limit=5`, headers);
      }

      const data = await res.data;
      const contents = data.contents;
      let totalCount = data.totalCount;
      totalCount = Math.floor(totalCount / 5);

      const blogObj = {
        blogs: contents,
        totalCount: totalCount + 1,
      };

      return blogObj;
    } catch (er) {
      console.log(er.status);
      return er;
    }
  }

  // 記事ページ
  async getPost(url: string, slug: string): Promise<Content> {
    const headers = this.getHeaders();
    try {
      const res = await axios.get(`${url}/blogs/${slug}`, headers);
      const data = await res.data;
      return data;
    } catch (er) {
      console.log(er.status);
      return er;
    }
  }

  // カテゴリーページ
  async getCategories(url: string, slug: string): Promise<CategoryJson> {
    const headers = this.getHeaders();
    try {
      const res = await axios.get(`${url}/category/${slug}?depth=2`, headers);
      const data = await res.data;
      return data;
    } catch (er) {
      console.log(er.status);
      return er;
    }
  }

  // タグページ
  async getTags(url: string, slug: string): Promise<TagJson> {
    const headers = this.getHeaders();
    try {
      const res = await axios.get(`${url}/tags/${slug}?depth=2`, headers);
      const data = await res.data;
      return data;
    } catch (er) {
      console.log(er.status);
      return er;
    }
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
