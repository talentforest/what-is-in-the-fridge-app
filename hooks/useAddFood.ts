import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, FoodInfo, initialFoodInfo } from '../constant/foods';
import { useState } from 'react';
import { addFood } from '../redux/slice/allFoodsSlice';
import { FoodLocation } from '../constant/fridgeInfo';
import { Alert } from 'react-native';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  foodLocation: FoodLocation;
}

export const useAddFood = ({ foodLocation }: Props) => {
  const [newFood, setNewFood] = useState<Food>(initialFoodInfo);

  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const dispatch = useDispatch();

  const { space, compartmentNum } = foodLocation;
  const myUuid = UUIDGenerator.v4();

  const addFoodInfo = (info: FoodInfo) => setNewFood({ ...newFood, ...info });

  const alertExistFood = (food: Food) => {
    return Alert.alert(
      `${food.name}`,
      `${food.space} ${food.compartmentNum}에 이미 식료품이 있어요.`
    );
  };

  const onAddSubmit = (setModalVisible: (visible: boolean) => void) => {
    const { name, category, favorite } = newFood;

    const existFood = allFoods.find((food) => food.name === name);
    if (existFood) return alertExistFood(existFood);
    if (name === '')
      return Alert.alert(
        '이름 작성 안내',
        '식료품의 이름이 작성되지 않았어요.'
      );
    const { expiredDate, purchaseDate } = newFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없어요.'
      );
    }

    const favoriteListItem = favoriteFoods.find((food) => food.name === name);
    const foodToAdd = {
      ...newFood,
      id: favoriteListItem ? favoriteListItem.id : (myUuid as string),
      category: favoriteListItem ? favoriteListItem.category : category,
      favorite: favoriteListItem ? favoriteListItem.favorite : favorite,
      space,
      compartmentNum,
    };

    if (!favoriteListItem && foodToAdd.favorite) {
      dispatch(addFavorite(foodToAdd));
    }

    dispatch(addFood(foodToAdd));
    setModalVisible(false);
  };

  return {
    newFood,
    addFoodInfo,
    onAddSubmit,
  };
};
