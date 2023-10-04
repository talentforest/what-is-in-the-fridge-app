import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../common/native-component';
import { useRoute } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { AnimationState, useFindFood } from '../../hooks/';
import { useSelector } from '../../redux/hook';

import LeftDay from '../common/LeftDay';
import TableItem from './TableItem';
import Icon from '../common/native-component/Icon';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  list: Food[];
  onCheckBoxPress: (food: Food) => void;
  addToFridgePress?: (food: Food) => void;
  checkedList: Food[];
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableBody({
  list,
  onCheckBoxPress,
  addToFridgePress,
  checkedList,
  animationState,
  afterAnimation,
}: Props) {
  const { filter } = useSelector((state) => state.filter);

  const route = useRoute();
  const routeExpiredFoods = route.name === 'ExpiredFoods';
  const title = routeExpiredFoods ? '소비기한 주의 식료품' : '장보기 식료품';

  const { findFood } = useFindFood();

  return (
    <>
      {!!list.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-5`}
            data={list}
            renderItem={({ item }) => (
              <TableItem
                food={item}
                onCheckBoxPress={onCheckBoxPress}
                isCheckedItem={
                  !!checkedList.find((food) => food.id === item.id)
                }
                animationState={animationState}
                afterAnimation={afterAnimation}
              >
                {/* 소비기한 주의 식료품 정보 */}
                {route.name === 'ExpiredFoods' && (
                  <View style={tw`items-end`}>
                    <LeftDay
                      expiredDate={item.expiredDate}
                      size={14}
                      dateMark
                    />
                  </View>
                )}

                {/* 장보기 식료품 추가 버튼 */}
                {route.name === 'ShoppingList' && addToFridgePress && (
                  <TouchableOpacity
                    onPress={() => addToFridgePress(item)}
                    style={tw`h-full justify-center px-3 -mx-3`}
                    disabled={!!checkedList.length}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={23}
                      color={!!checkedList.length ? '#e0e0e0' : BLUE}
                    />
                  </TouchableOpacity>
                )}
              </TableItem>
            )}
          />
        </View>
      ) : (
        <View style={tw`pt-24 flex-1 border-t -mx-4 border-slate-300`}>
          <EmptySign
            message={
              route.name === 'ShoppingList' || filter === '전체'
                ? `${title}이 없어요`
                : `${filter}에 ${title}이 없어요.`
            }
          />
        </View>
      )}
    </>
  );
}
