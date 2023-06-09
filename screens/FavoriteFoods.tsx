import { useFonts } from 'expo-font';
import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { useState } from 'react';
import { fonts } from '../constant/fonts';
import { useDispatch } from '../redux/hook';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, initialFoodInfo } from '../constant/foods';
import TableLabel from '../components/common/Table/TableLabel';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/Table/TableTotalItem';
import TableList from '../components/common/Table/TableList';
import TableItem from '../components/common/Table/TableItem';
import ExistFoodMark from '../components/common/ExistFoodMark';
import useCheckFood from '../hooks/useCheckFood';
import SquareBtn from '../components/common/Buttons/SquareBtn';
import UUIDGenerator from 'react-native-uuid';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import tw from 'twrnc';
import { scaleH } from '../util';
import TableContainer from '../components/common/Table/TableContainer';
import Container from '../components/common/LayoutBox/Container';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [keyword, setKeyword] = useState('');
  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  const onSubmitEditing = () => {
    const foodToAdd: Food = {
      ...initialFoodInfo,
      name: keyword,
      id: myUuid as string,
    };
    dispatch(addFavorite(foodToAdd));
    Alert.alert('추가 알림', '성공적으로 추가되었습니다.');
  };

  const {
    entireCheck,
    checkList,
    onCheckPress,
    existInList,
    onEntirePress,
    onDeletePress,
    addShoppingListPress,
  } = useHandleCheckList();
  const { checkExistFood } = useCheckFood();

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableLabel title='식료품' label='식료품 유무' />
          {favoriteFoods.length !== 0 ? (
            <TableList
              list={[...nonExistFavoriteFoods, ...existFavoriteFoods]}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                >
                  <ExistFoodMark exist={!!checkExistFood(item)} />
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-500 text-center mt-22`}>
              자주 먹는 식료품이 없습니다.
            </Text>
          )}
          {!!favoriteFoods.length && (
            <TableTotalItem
              onEntirePress={() => onEntirePress(favoriteFoods)}
              list={favoriteFoods}
              entireCheck={entireCheck}
            />
          )}
        </TableContainer>
        {!!checkList.length && (
          <View style={tw`gap-1 px-4 mt-4`}>
            <Text style={tw`text-slate-600`}>
              선택한 항목: {checkList.length}개
            </Text>
            <SquareBtn
              btnName='자주 먹는 식료품 해제'
              onPress={() => onDeletePress(favoriteFoods)}
            />
            <SquareBtn
              btnName='장보기 목록에 추가'
              onPress={addShoppingListPress}
            />
          </View>
        )}
      </Container>
    </SafeBottomAreaView>
  );
}
