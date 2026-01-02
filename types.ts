
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  answer: string;
  sources: GroundingChunk[];
}

export enum Category {
  LATKANS = 'Artisan Latkans',
  PRET = 'Luxury Pret',
  UNSTITCHED = 'Unstitched Suits',
  SAREES = 'Exquisite Sarees',
  DUPATTAS = 'Luxury Dupattas',
  BRIDAL = 'Bridal Ensembles',
  ACCENTS = 'Bespoke Accents'
}

export interface Product {
  id: string;
  title: string;
  category: Category;
  description: string;
  price: string;
  imageUrl: string;
  isFeatured?: boolean;
}
