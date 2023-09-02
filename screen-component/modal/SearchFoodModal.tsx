import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { findMatchNameFoods } from '../../util';
import { useSelector } from '../../redux/hook';
import { ScrollView } from 'react-native-gesture-handler';
import { Food } from '../../constant/foods';

import Modal from '../../components/modal/Modal';
import TextInputRoundedBox from '../../components/common/TextInputRoundedBox';
import TableSearchedItem from '../../components/table/TableSearchedItem';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function SearchFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const [keyword, setKeyword] = useState('');
  const { allFoods } = useSelector((state) => state.allFoods);

  const searchedFoods = findMatchNameFoods(allFoods, keyword);

  const onSubmitEditing = () => {
    if (keyword === '') return;
    setKeyword(keyword);
  };

  const modalContentHeight = Dimensions.get('screen').height * 0.6;

  return (
    <Modal
      title='나의 식료품 찾기'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackdrop={true}
    >
      <View style={tw`pb-3 pt-1 px-4 h-[${modalContentHeight}px]`}>
        {/* 식료품 찾기 테이블 헤더 */}
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='search'
          placeholder='식료품의 이름을 작성해주세요.'
          onSubmitEditing={onSubmitEditing}
          iconActive={keyword !== ''}
          autoFocus
        />
        <View style={tw`px-2 pt-2`}>
          <View
            style={tw`gap-2 border-b border-slate-400 py-3.5 px-1 flex-row items-center`}
          >
            <View style={tw`flex-row gap-2 w-[40%]`}>
              <Text style={tw`text-blue-600 text-sm`}>식료품</Text>
              <Text style={tw`text-slate-600 text-sm`}>
                {!!keyword.length ? searchedFoods?.length : 0}개
              </Text>
            </View>
            <Text style={tw`flex-1 text-blue-600 text-sm`}>위치</Text>
            <Text style={tw`text-blue-600 text-sm`}>이동</Text>
          </View>

          {/* 식료품 테이블 리스트 */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {!!keyword.length &&
              (searchedFoods?.length ? (
                searchedFoods.map((food: Food) => (
                  <TableSearchedItem
                    key={food.id}
                    food={food}
                    setModalVisible={setModalVisible}
                  />
                ))
              ) : (
                <View style={tw`pt-12 px-4 gap-1`}>
                  <EmptySign
                    message='해당 식료품은 냉장고에 없어요.'
                    color='slate'
                  />
                </View>
              ))}
            {keyword.length === 0 && (
              <View style={tw`pt-12 px-4 gap-1`}>
                <EmptySign
                  message='냉장고에 찾으시는 식료품이 있는지 확인해 보세요.'
                  color='slate'
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}