import { useNavigation } from '@react-navigation/native';
import { useDispatch } from '../redux/hook';
import { NavigateProp } from '../navigation/Navigation';
import { Space } from '../constant/fridgeInfo';
import { removeFridgeFood } from '../redux/slice/fridgeFoodsSlice';

interface Props {
  space: Space;
  setModalVisible: (visible: boolean) => void;
}

export const useDeleteFridgeFood = ({ space, setModalVisible }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateProp>();

  const deleteFood = (foodId: string) => {
    dispatch(removeFridgeFood({ id: foodId }));
    navigation.navigate('Compartments', { space });
    setModalVisible(false);
  };

  return {
    deleteFood,
  };
};