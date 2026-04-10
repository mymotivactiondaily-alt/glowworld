export interface Product {
  id: string;
  name: string;
  price: number;
  team: 'France' | 'Brésil' | 'Argentine' | 'USA' | 'Mexique' | 'Canada' | 'Portugal' | 'Pack';
  image: string;
  description: string;
  longDescription?: string;
  features: string[];
  isPremium?: boolean;
  isAvailable?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  content: string;
  readTime?: string;
  category?: string;
  author?: string;
}

export type Lang = 'fr' | 'en' | 'es';

export interface Translation {
  _lang: string;
  home: string;
  shop: string;
  blog: string;
  about: string;
  download_app: string;
  h1_seo: string;
  hero_title: string;
  hero_subtitle: string;
  hero_desc: string;
  hero_desc_prefix: string;
  hero_desc_highlight: string;
  hero_cta: string;
  hero_demo: string;
  how_title: string;
  how_step1_t: string;
  how_step1_d: string;
  how_step2_t: string;
  how_step2_d: string;
  how_step3_t: string;
  how_step3_d: string;
  cart_title: string;
  cart_empty: string;
  cart_continue: string;
  cart_total: string;
  cart_checkout: string;
  shipping_info: string;
  trust_badge: string;
  stock_limited: string;
  best_seller: string;
  premium_edition: string;
  seo_home_title: string;
  seo_home_desc: string;
  seo_catalog_title: string;
  seo_catalog_desc: string;
  seo_blog_title: string;
  seo_blog_desc: string;
  seo_about_title: string;
  seo_about_desc: string;
  partners: string;
  tech_title: string;
  tech_desc: string;
  logistics_title: string;
  logistics_desc: string;
  production_title: string;
  production_desc: string;
  login: string;
  logout: string;
  welcome: string;
  profile: string;
  cart_coming_soon: string;
  cart_coming_soon_msg: string;
}
