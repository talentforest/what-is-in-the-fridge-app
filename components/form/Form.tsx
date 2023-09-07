import { ModalTitle } from '../modal/Modal';
import {
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Food } from '../../constant/foods';
import { FormStep } from '../../constant/formInfo';
import { useSwiperAnimation } from '../../hooks';
import { DEVICE_WIDTH } from '../../util';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import ExpiredDateItem from './ExpiredDateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import FormControlStep from './FormControlStep';
import PurchaseDateItem from './PurchaseDateItem';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

export default function Form({
  title,
  changeInfo,
  food,
  editableName,
  formSteps,
}: Props) {
  const {
    moveStep,
    stepTranslateX,
    panResponder,
    currentStep, //
  } = useSwiperAnimation({ steps: formSteps });

  return (
    <View>
      <View style={tw`overflow-hidden pb-0`}>
        <Animated.View
          style={{
            width: DEVICE_WIDTH,
            height: 320,
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-row flex-1`}>
              {formSteps.map(({ step, name }) => (
                <View key={step} style={tw`w-full`}>
                  {name === '식품 정보' && (
                    <FormSectionContainer>
                      <NameItem
                        title={title}
                        name={food.name}
                        changeInfo={changeInfo}
                        editable={editableName || false}
                      />
                      <CategoryItem
                        name={food.name}
                        fixedCategory={food.category}
                        changeInfo={changeInfo}
                        disabled={title !== '식료품 정보 수정'}
                      />
                      <FavoriteItem
                        title={title}
                        name={food.name}
                        favoriteState={food.favorite}
                        changeInfo={changeInfo}
                        disabled={title !== '식료품 정보 수정'}
                      />
                    </FormSectionContainer>
                  )}
                  {name === '식품 날짜' && (
                    <FormSectionContainer>
                      <ExpiredDateItem
                        date={food.expiredDate}
                        changeInfo={changeInfo}
                      />
                      <PurchaseDateItem
                        date={food.purchaseDate}
                        changeInfo={changeInfo}
                      />
                    </FormSectionContainer>
                  )}
                  {name === '식품 위치' && (
                    <FormSectionContainer>
                      <SpaceItem food={food} changeInfo={changeInfo} />
                    </FormSectionContainer>
                  )}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      {/* 단계 */}
      <FormControlStep
        moveStep={moveStep}
        currentStep={currentStep.step}
        stepLength={formSteps.length}
      />
    </View>
  );
}
