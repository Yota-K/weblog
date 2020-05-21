const axios = require('axios');
import { BlogJson } from '../interfaces/blog';
import { TagJson, CategoryJson, TaxonomyJson } from '../interfaces/taxonomy';
import { RequestHeader } from '../interfaces/request-header';

export class API {
    static BASE_URL:string = 'https://karukichi-tech-blog.microcms.io/api/v1';

    private settingHeaders():RequestHeader {
        const key = {
            headers: {'X-API-KEY': process.env.access_key}
        };
        return key;
    }

    getHeaders():RequestHeader {
        return this.settingHeaders();
    }

    // 投稿一覧
    getBlog(url: string):Promise<BlogJson[]> {
        return new Promise(async (resolve, reject) => {
            const headers = this.getHeaders();
            try {
                const res = await axios.get(`${url}/blogs`, headers);
                const data = await res.data.contents;
                return resolve(data);
            }
            catch (er) {
                console.log(er.status);
                return reject(er);
            }
        });
    };

    // 記事ページ
    getPost(url: string, slug: string):Promise<BlogJson> {
        return new Promise(async (resolve, reject) => {
            const headers = this.getHeaders();
            try {
                const res = await axios.get(`${url}/blogs/${slug}`, headers);
                const data = await res.data;
                return resolve(data);
            }
            catch (er) {
                console.log(er.status);
                return reject(er);
            }
        })
    };

    // カテゴリーページ
    getCategories(url: string, slug: string):Promise<CategoryJson> {
        return new Promise(async (resolve, reject) => {
            const headers = this.getHeaders();
            try {
                const res = await axios.get(
                    `${url}/category/${slug}?depth=2`,
                    headers
                );
                const data = await res.data;
                return resolve(data);
            }
            catch (er) {
                console.log(er.status);
                return reject(er);
            }
        })
    };

    // タグページ
    getTags(url: string, slug: string):Promise<TagJson> {
        return new Promise(async (resolve, reject) => {
            const headers = this.getHeaders();
            try {
                const res = await axios.get(
                    `${url}/tags/${slug}?depth=2`,
                    headers
                );
                const data = await res.data;
                return resolve(data);
            }
            catch (er) {
                console.log(er.status);
                return reject(er);
            }
        })
    };

    // タグ一覧とカテゴリー一覧の取得
    getTaxonomyList(url: string):Promise<TaxonomyJson> {
        return new Promise(async (resolve, reject) => {
            const headers = this.getHeaders();
            try {
                const res = await axios.get(
                    `${url}/taxonomy`, 
                    headers
                );
                const data = res.data;
                return resolve(data);
            }
            catch (er) {
                console.log(er.status);
                return reject(er);
            }
        })
    }

}
