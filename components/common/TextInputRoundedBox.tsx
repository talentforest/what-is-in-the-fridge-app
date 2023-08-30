import { View } from 'react-native';
import { TextInput, TouchableOpacity } from '../native-component';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { ReactNode } from 'react';

import Icon from '../native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (keyword: string) => void;
  iconName: 'search' | 'plus';
  placeholder: string;
  onSubmitEditing: () => void;
  children?: ReactNode;
  autoFocus?: boolean;
}

export default function TextInputRoundedBox({
  value,
  setValue,
  iconName,
  placeholder,
  onSubmitEditing,
  children,
  autoFocus,
}: Props) {
  return (
    <View
      style={tw`h-11 mt-3 w-full border border-slate-500 rounded-full items-center flex-row bg-white pl-2.5 pr-3.5`}
    >
      {children}

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        blurOnSubmit={false}
        style={tw`flex-1 border-0 my-0.5`}
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
      />

      <TouchableOpacity
        onPress={onSubmitEditing}
        style={tw`h-full items-center justify-center`}
      >
        <Icon
          type={iconName === 'search' ? 'Ionicons' : 'MaterialCommunityIcons'}
          name={iconName}
          size={iconName === 'search' ? 21 : 23}
          color={value.length === 0 ? LIGHT_GRAY : DEEP_GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}