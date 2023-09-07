import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { View } from 'react-native';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  foodLocation: FoodLocation;
  formSteps: FormStep[];
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { newFood, addFoodInfo, onAddSubmit } = useAddFood({ foodLocation });

  return (
    <Modal
      title='새로운 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {foodLocation && (
        <Form
          title='새로운 식료품 추가'
          editableName={true}
          food={newFood}
          changeInfo={addFoodInfo}
          formSteps={formSteps}
        />
      )}
      <View style={tw`mx-6`}>
        <SubmitBtn
          iconName='plus'
          color='blue'
          btnName='냉장고에 식료품 추가'
          onPress={() => {
            onAddSubmit(setModalVisible);
          }}
        />
      </View>
    </Modal>
  );
}
