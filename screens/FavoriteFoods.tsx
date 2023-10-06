import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { Category } from '../constant/foodCategories';
import { entireFilterObj, existAbsenceFilters } from '../util';
import { Animated } from 'react-native';
import {
  useHandleTableItem,
  useSlideAnimation,
  useSetAnimationState,
  useHandleCheckList,
  useSubmitFoodsFromInput,
  useGetFoodList,
  useFindFood,
  useHandleFilter,
} from '../hooks';

import Container from '../components/common/Container';
import TableFooterContainer from '../components/table/TableFooterContainer';
import TableFilters from '../components/table/TableFilters';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import CategoryModal from '../screen-component/modal/CategoryModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import FormMessage from '../components/form/FormMessage';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableBody from '../components/table/TableBody';

export default function FavoriteFoods() {
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category>('신선식품류');

  const { isFavoriteItem } = useFindFood();
  const { currentFilter, initializeFilter } = useHandleFilter();
  const { favoriteFoods, getFilteredFoodList, orderedByExist } =
    useGetFoodList();
  const { onSubmitFavoriteListItem } = useSubmitFoodsFromInput();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress, //
  } = useHandleCheckList();

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue: 0,
    toValue: 20,
    active: !!(showCaution && isFavoriteItem(inputValue)),
  });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const { onAddShoppingListBtnPress, onDeleteFoodPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  useEffect(() => {
    initializeFilter();
  }, []);

  const onCategoryCheckBoxPress = (category: Category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem(
      inputValue,
      category,
      setInputValue,
      setShowCaution
    );
    setAnimationState('slidedown-in');
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  const filteredFoodList = () => {
    return currentFilter === '전체'
      ? orderedByExist()
      : getFilteredFoodList(currentFilter, favoriteFoods);
  };

  const allChecked = checkedList.length === filteredList.length;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableFilters
            filterList={[entireFilterObj, ...existAbsenceFilters]}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={favoriteFoods}
          />

          <TableBody
            title='자주 먹는 식료품'
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            list={filteredFoodList()}
            afterAnimation={() =>
              afterAnimation(onDeleteFoodPress, favoriteFoods)
            }
          />

          <TableFooterContainer>
            <TableSelectedHandleBox
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(filteredList)}
            >
              <SquareIconBtn
                icon='tag-minus'
                disabled={checkedList.length === 0}
                onPress={() =>
                  onDeleteFoodPress(
                    setAnimationState,
                    animationState,
                    favoriteFoods
                  )
                }
              />
              <SquareIconBtn
                icon='basket-plus'
                disabled={checkedList.length === 0}
                onPress={onAddShoppingListBtnPress}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='자주 먹는 식료품을 추가하세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === ''}
              checkedListLength={checkedList.length}
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
              <FormMessage
                active={!!(showCaution && isFavoriteItem(inputValue))}
                message='이미 목록에 있는 식료품이에요.'
                color='orange'
              />
            </Animated.View>
          </TableFooterContainer>

          <CategoryModal
            modalVisible={categoryOpen}
            setModalVisible={setCategoryOpen}
            currentChecked={category}
            onCheckBoxPress={onCategoryCheckBoxPress}
          />
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
