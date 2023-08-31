import { View, Animated } from 'react-native';
import { BLUE, LIGHT_BLUE } from '../../../constant/colors';

import useFavoriteFoods from '../../../hooks/useFavoriteFoods';
import useSlideAnimation from '../../../hooks/animation/useSlideAnimation';
import useToggleAnimation from '../../../hooks/animation/useToggleAnimation';

import FormLabel from './FormLabel';
import Message from './Message';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';

interface Props {
  name: string;
  favoriteState: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
  disabled: boolean;
}

const MOVED_TRANSLATE_X = 88;

export default function FavoriteItem({
  name,
  favoriteState,
  changeInfo,
  disabled,
}: Props) {
  const { favoriteFoods } = useFavoriteFoods();

  // 식료품 이름을 적었는데 자주 먹는 식료품 이름일 경우
  const isFavoriteFood = favoriteFoods.find((food) => food.name === name);
  const disabledFavoriteBtn = isFavoriteFood && disabled;
  const currFavState = disabledFavoriteBtn
    ? isFavoriteFood?.favorite // 기존 자주 먹는 식료품 상태
    : favoriteState; // 새로운 식료품 상태

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue: currFavState ? 30 : 0,
    toValue: 30,
    active: currFavState,
  });

  const { translateX, animatedToggle } = useToggleAnimation({
    initialValue: currFavState ? 0 : MOVED_TRANSLATE_X,
    toValue: currFavState ? 0 : MOVED_TRANSLATE_X,
    active: currFavState,
  });

  const onTogglePress = (favorite: boolean) => {
    changeInfo({ favorite });
    animatedToggle(favorite ? 0 : MOVED_TRANSLATE_X);
  };

  const color = disabledFavoriteBtn ? 'border-slate-400' : 'border-blue-600';
  const backgroundColor = disabledFavoriteBtn ? LIGHT_BLUE : BLUE;

  return (
    <View>
      <FormLabel label='자주 먹는 식품' />
      <View
        style={tw`${color} h-11 flex-row items-center border p-1 rounded-full bg-white self-start`}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 88,
            position: 'absolute',
            left: 4,
            height: '100%',
            borderRadius: 100,
            backgroundColor,
          }}
        />
        {['맞아요', '아니에요'].map((btnNm) => (
          <ToggleBtn
            key={btnNm}
            check={btnNm === '맞아요' ? currFavState : !currFavState}
            onPress={() => onTogglePress(btnNm === '맞아요' ? true : false)}
            btnName={btnNm}
            disabled={isFavoriteFood?.favorite && disabled}
          />
        ))}
      </View>

      {/* 자주 먹는 식료품 추가 안내 문구 */}
      <Animated.View
        style={{
          height,
          opacity: interpolatedOpacity,
        }}
      >
        {!isFavoriteFood && (
          <Message
            message='자주 먹는 식료품 목록에 추가됩니다.'
            color='green'
          />
        )}
      </Animated.View>
    </View>
  );
}
