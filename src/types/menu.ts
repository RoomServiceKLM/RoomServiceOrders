export type VariantOption = {
  label: string;
  options: string[];
  deltas?: number[];
  multi?: boolean;
  required?: boolean;
  minSelections?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  alg: string;
  min?: number;
  maxQty?: number;
  priceNote?: string;
  note?: string;
  variant?: VariantOption;
  variant2?: VariantOption;
};

export type MenuSection = {
  title: string;
  until1am?: string | boolean;
  hours?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  label: string;
  sub: string;
  hours: string;
  sections: MenuSection[];
};

export type MenuCategoryMap = Record<string, MenuCategory>;

export type CartLine = {
  key: string;
  id: string;
  name: string;
  qty: number;
  unit: number;
  variantIdx?: number | null;
  variant2Idx?: number | null;
  mods?: number[];
  mods2?: number[];
  variantText?: string;
  variant2Text?: string;
};
