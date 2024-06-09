// 1. `astro:content`からユーティリティをインポート
import { defineCollection } from 'astro:content';
// 2. コレクションを定義
const productCollection = defineCollection({ /* ... */ });
// 3. コレクションを登録するために、単一の`collections`オブジェクトをエクスポート
//    このキーは、"src/content"のコレクションのディレクトリ名と一致する必要があります。
export const collections = {
    'works': productCollection ,
};