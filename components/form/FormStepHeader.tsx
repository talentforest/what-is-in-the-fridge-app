import { View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { AMBER, GRAY } from '../../constant/colors';
import { Text } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStep: FormStep;
}

export default function FormStepHeader({ formSteps, currentStep }: Props) {
  return (
    <View style={tw`flex-row items-start h-6`}>
      {formSteps.map(({ step, name }) => (
        <View key={step} style={tw`flex-row items-center justify-center`}>
          {step !== 1 && (
            <Icon
              name='chevron-right'
              type='MaterialCommunityIcons'
              size={16}
              color={`${currentStep.step === step - 1 ? AMBER : GRAY}`}
            />
          )}
          <View style={tw`flex-row items-center gap-0.5`}>
            <Text
              fontSize={15}
              style={tw`pl-0.3 ${
                currentStep.step === step ? 'text-amber-500' : 'text-slate-500'
              }`}
            >
              {name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
