import { Animated } from 'react-native';
import { Food } from '../../constant/foods';
import { useRef } from 'react';
import { TouchableOpacity } from '../../components/common/native-component';
import {
  useDragFood,
  usePulseAnimation,
  useShakingAnimation,
} from '../../hooks';
import { useFindCompartmentNum } from '../../hooks/useFindCompartmentNum';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';

import FoodBox from './FoodBox';

interface Props {
  food: Food;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  setDragPosition: ({ x, y }: { x: number; y: number }) => void;
  setModalVisible: (visible: boolean) => void;
  searchedName: string;
}

export default function DraggableFoodBox({
  food,
  isDragging,
  setIsDragging,
  setDragPosition,
  setModalVisible,
  searchedName,
}: Props) {
  const { dragMode } = useSelector((state) => state.dragMode);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();

  const pan = useRef(new Animated.ValueXY()).current;

  const {
    opacity,
    translateY,
    bgColor, //
  } = usePulseAnimation({ active: searchedName === food.name });

  const { rotate } = useShakingAnimation({ active: dragMode, isDragging });

  const { findCompartmentNum } = useFindCompartmentNum({ food });

  const { panResponder } = useDragFood({
    food,
    setIsDragging,
    setDragPosition,
    findCompartmentNum,
  });

  const searchedFoodBox = searchedName === food.name;
  const draggingFoodBox = selectedFood.name === food.name;
  const transformAnimation = dragMode
    ? {
        opacity: draggingFoodBox ? 0.3 : 1,
        transform: [{ rotate }, { translateX: pan.x }, { translateY: pan.y }],
      }
    : {
        opacity,
        transform: [{ translateY: searchedFoodBox ? translateY : 0 }],
      };

  return (
    <Animated.View
      style={{
        borderRadius: 100,
        backgroundColor: searchedFoodBox ? bgColor : '#fff',
        ...transformAnimation,
      }}
      {...(dragMode ? { ...panResponder.panHandlers } : null)}
    >
      <TouchableOpacity
        key={food.id}
        onPress={() => {
          dispatch(select(food));
          setModalVisible(true);
        }}
        onLongPress={() => {
          if (!dragMode) return dispatch(toggleDragMode(true));
        }}
      >
        <FoodBox food={food} />
      </TouchableOpacity>
    </Animated.View>
  );
}
