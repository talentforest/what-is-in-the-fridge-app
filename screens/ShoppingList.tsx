import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToShoppingList,
  setShoppingList,
} from '../redux/slice/shoppingList';
import { KeyboardAvoidingView } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { Food, initialFoodInfo } from '../constant/foods';
import { FormStep } from '../constant/formInfo';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import UUIDGenerator from 'react-native-uuid';

import useHandleCheckList from '../hooks/useHandleCheckList';
import useHandleTableItem from '../hooks/useHandleTableItem';
import useToggleModal from '../hooks/useToggleModal';

import AddSelectFoodModal from '../components/screen-component/modal/AddSelectFoodModal';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TextInputRoundedBox from '../components/common/boxes/TextInputRoundedBox';

import tw from 'twrnc';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const [keyword, setKeyword] = useState('');

  const myUuid = UUIDGenerator.v4();
  const dispatch = useDispatch();

  const { modalVisible, setModalVisible } = useToggleModal();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress,
    isCheckedItem,
    checkedFoodNameList,
  } = useHandleCheckList();

  useFocusEffect(
    useCallback(() => {
      setCheckedList([]);
    }, [])
  );

  const deleteAlertGuide = {
    title: '식료품 삭제',
    desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 장보기 목록에서 삭제하시겠습니까?`,
    defaultBtnText: '삭제',
    onPress: (filteredArr: Food[]) => dispatch(setShoppingList(filteredArr)),
  };

  const { onDeletePress, onAddToFridgePress } = useHandleTableItem({
    deleteAlertGuide,
    checkedList,
    setCheckedList,
    setModalVisible,
  });

  const onInputSubmit = () => {
    if (keyword === '') return;
    const food = {
      ...initialFoodInfo,
      id: myUuid as string,
      name: keyword,
    };
    dispatch(addToShoppingList(food));
    setKeyword('');
  };

  return (
    <KeyboardAvoidingView>
      <Container>
        {/* 장보기 목록 */}
        <TableContainer>
          <View style={tw`p-3`}>
            <TableHeader
              title='장봐야할 식료품'
              entireChecked={
                checkedList.length === shoppingList.length &&
                !!checkedList.length
              }
              onEntirePress={() => onEntireBoxPress(shoppingList)}
              columnTitle='추가'
            />
          </View>

          <TableBody
            list={shoppingList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
            addToFridgePress={onAddToFridgePress}
          />

          <TableFooter
            list={checkedList}
            onDeletePress={() => onDeletePress(shoppingList)}
            buttons={['delete']}
          />
        </TableContainer>

        {/* 키보드 인풋 */}
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='plus'
          placeholder='식료품 이름을 작성해주세요.'
          onSubmitEditing={onInputSubmit}
        />
      </Container>
      {modalVisible && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={
            [
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 위치' },
              { id: 3, name: '식품 날짜' },
            ] as FormStep[]
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}
