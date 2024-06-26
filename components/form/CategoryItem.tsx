import { View } from 'react-native';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { useFindFood } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { showCategoryModal } from '../../redux/slice/modalVisibleSlice';
import { closeKeyboard } from '../../util';
import { changeCategory } from '../../redux/slice/food/categorySlice';
import { LIGHT_BLUE, LIGHT_GRAY } from '../../constant/colors';

import CategoryModal from '../../screen-component/modal/CategoryModal';
import FormLabel from './FormLabel';
import CategoryIcon from '../common/CategoryIcon';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  isAddNewOne?: boolean;
}

export default function CategoryItem({ isAddNewOne }: Props) {
  const {
    formFood: { name, category: formCategory },
  } = useSelector((state) => state.formFood);

  const { isFavoriteItem } = useFindFood();
  const favoriteItem = isFavoriteItem(name);

  // 새로 추가하는데 자주 먹는 식료품인 경우 비활성화
  const disabled = favoriteItem && isAddNewOne;

  const dispatch = useDispatch();

  const onModalOpenPress = () => {
    closeKeyboard();
    dispatch(changeCategory(formCategory));
    dispatch(showCategoryModal(true));
  };

  return (
    <View>
      <FormLabel label='카테고리' />

      <TouchableOpacity
        onPress={onModalOpenPress}
        disabled={disabled}
        style={tw.style(`${InputStyle}`)}
      >
        <View style={tw`flex-row items-center h-full px-0.5`}>
          <View style={tw`pb-0.5`}>
            <CategoryIcon
              category={disabled ? favoriteItem.category : formCategory}
              size={16}
              inActive={disabled}
            />
          </View>

          <TextInput
            editable={false}
            value={disabled ? favoriteItem.category : formCategory}
            style={tw`border-0 flex-1 pl-1 h-full bg-transparent ${
              disabled ? 'text-slate-400' : 'text-slate-800'
            }`}
          />
          <Icon
            name='apps'
            type='Octicons'
            size={14}
            color={disabled ? LIGHT_GRAY : LIGHT_BLUE}
          />
        </View>
      </TouchableOpacity>

      <CategoryModal />
    </View>
  );
}
