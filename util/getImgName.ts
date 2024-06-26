import { Asset } from 'expo-asset';
import { CompartmentNum } from '../constant/fridgeInfo';

export type AssetName =
  | 'empty-shoppinglist'
  | 'expired-foods'
  | 'empty-favorite-foods'
  | 'apple'
  | 'meat'
  | 'carrot'
  | 'banana'
  | 'egg';

export const getImgName: (
  title: string,
  compartmentNum?: CompartmentNum
) => AssetName = (title: string, compartmentNum?: CompartmentNum) => {
  const assetName = title.includes('장볼 식료품')
    ? 'empty-shoppinglist'
    : title.includes('자주 먹는 식료품')
    ? 'empty-favorite-foods'
    : title.includes('소비기한')
    ? 'expired-foods'
    : compartmentNum === '1번'
    ? 'meat'
    : compartmentNum === '2번'
    ? 'apple'
    : compartmentNum === '3번'
    ? 'carrot'
    : compartmentNum === '4번'
    ? 'banana'
    : 'egg';

  return assetName;
};

export const findAsset = (assets: Asset[], name: string) => {
  return assets?.find((asset) => asset.name === name);
};
