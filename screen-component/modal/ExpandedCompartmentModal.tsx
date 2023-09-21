import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { GRAY } from '../../constant/colors';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { formThreeSteps } from '../../constant/formInfo';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch } from '../../redux/hook';
import { shadowStyle } from '../compartments/DraggableFoodBox';
import { DEVICE_HEIGHT } from '../../util';

import EmptySign from '../../components/common/EmptySign';
import Modal from '../../components/modal/Modal';
import Icon from '../../components/common/native-component/Icon';
import FoodBox from '../compartments/FoodBox';
import FoodDetailModal from './FoodDetailModal';
import tw from 'twrnc';

interface Props {
  compartmentNum: CompartmentNum;
  foodList: Food[];
  expandCompartment: boolean;
  setExpandCompartment: (visible: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function ExpandedCompartmentModal({
  compartmentNum,
  foodList,
  expandCompartment,
  setExpandCompartment,
  modalVisible,
  setModalVisible,
}: Props) {
  const dispatch = useDispatch();

  return (
    <Modal
      modalVisible={expandCompartment}
      setModalVisible={setExpandCompartment}
      hasBackdrop
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={tw`pt-3 px-5 pb-2 flex-row justify-between items-center`}>
        <Text style={tw`text-lg`}>{compartmentNum}칸</Text>
        <TouchableOpacity
          style={tw`-m-3 p-3`}
          onPress={() => setExpandCompartment(false)}
        >
          <Icon type='Ionicons' name='close' size={24} color={GRAY} />
        </TouchableOpacity>
      </View>
      {!!foodList.length ? (
        <ScrollView
          style={tw`mb-4 px-4 pb-1 h-[${DEVICE_HEIGHT * 0.5}px]`}
          contentContainerStyle={tw`flex-row p-2 bg-stone-100 border border-slate-100 rounded-xl flex-1 flex-wrap gap-1 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {foodList.map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                dispatch(select(food));
                setModalVisible(true);
              }}
              style={tw.style(`bg-white rounded-lg`, shadowStyle)}
            >
              <FoodBox food={food} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={tw`h-50 bg-stone-100 mx-4 mb-1 border border-slate-100 rounded-xl flex-row items-center pb-10 justify-center`}
        >
          <EmptySign message='식료품이 아직 없어요.' />
        </View>
      )}

      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={formThreeSteps}
        />
      )}
    </Modal>
  );
}
