import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
  Text,
} from '../components/common/native-component';
import { Category } from '../constant/foodCategories';
import {
  Filter,
  categoryFilters,
  entireFilterObj,
  existAbsenceFilters,
} from '../util';
import { Animated, View } from 'react-native';
import {
  useHandleTableItem,
  useSlideAnimation,
  useHandleCheckList,
  useSubmitFavoriteFoods,
  useGetFoodList,
} from '../hooks';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableFilters from '../components/table/TableFilters';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import FormItemDetailModal from '../screen-component/modal/FormItemDetailModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import Message from '../components/form/Message';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | ''>('');
  const [currentFilter, setCurrentFilter] = useState<Filter>('전체');

  const { favoriteFoods, getFilteredFoodList } = useGetFoodList();
  const { onSubmitFavoriteListItem } = useSubmitFavoriteFoods();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    isCheckedItem,
    onEntireBoxPress,
  } = useHandleCheckList();

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue: 0,
    toValue: 20,
    active: showCaution,
  });

  const { onDeletePress, onAddShoppingListPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  useEffect(() => {
    if (inputValue == '') {
      setShowCaution(false);
    }
  }, [inputValue]);

  const changeFilter = (currentFilter: Filter) => {
    setCurrentFilter(currentFilter);
  };

  const onCategoryCheckBoxPress = (category: Category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem(
      inputValue,
      category,
      setInputValue,
      setCategory,
      setShowCaution
    );
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          {/* 필터 */}
          <TableFilters
            filterList={[
              entireFilterObj,
              ...existAbsenceFilters,
              ...categoryFilters,
            ]}
            currentFilter={currentFilter}
            changeFilter={changeFilter}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            list={favoriteFoods}
          />

          <TableContainer color='indigo'>
            <TableHeader
              title='자주 먹는 식료품'
              entireChecked={
                checkedList.length === filteredList.length &&
                !!checkedList.length
              }
              onEntirePress={() => onEntireBoxPress(filteredList)}
              color='indigo'
            >
              <Text style={tw`text-slate-600 w-9 text-center text-sm`}>
                종류
              </Text>
              <Text style={tw`text-slate-600 text-sm`}>유무</Text>
            </TableHeader>

            {/* 자주 먹는 식료품 목록 */}
            <TableBody
              title='자주 먹는 식료품'
              color='indigo'
              list={filteredList}
              onCheckBoxPress={onCheckBoxPress}
              isCheckedItem={isCheckedItem}
            />

            {/* 식료품 선택 개수와 버튼 */}
            <TableFooter
              list={checkedList}
              onAddPress={onAddShoppingListPress}
              onDeletePress={() => onDeletePress(favoriteFoods)}
              buttons={['delete-favorite', 'add-shopping-list']}
              color='indigo'
            />
          </TableContainer>

          {/* 인풋 */}
          <View>
            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              iconName='plus'
              placeholder='자주 먹는 식료품을 추가하세요.'
              onSubmitEditing={onSubmitEditing}
              iconActive={inputValue !== '' && category !== ''}
            >
              <InputCategoryBtn
                category={category}
                setCategoryOpen={setCategoryOpen}
              />
            </TextInputRoundedBox>

            <Animated.View
              style={{
                height,
                opacity: interpolatedOpacity,
                paddingLeft: 12,
              }}
            >
              {inputValue !== '' && category === '' && showCaution && (
                <Message message='카테고리를 설정해주세요.' color='orange' />
              )}
            </Animated.View>
          </View>
          {categoryOpen && (
            <FormItemDetailModal
              modalVisible={categoryOpen}
              setModalVisible={setCategoryOpen}
              title='카테고리 선택'
              currentChecked={category}
              onCheckBoxPress={onCategoryCheckBoxPress}
            />
          )}
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
