import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';
import { SCDream8 } from '../../constant/fonts';
import {
  DateState,
  DateType,
} from '../../screen-component/modal/DateNumInputModal';
import { Text } from './native-component';
import { DEVICE_WIDTH, getDateToken } from '../../util';
import { PlatformIOS } from '../../constant/statusBarHeight';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  dateToken: string[];
  setDateToken: (tokens: string[]) => void;
  setInValidDate: (valid: React.SetStateAction<DateState>) => void;
}

export default function DateNumTokenBox({
  expiredDate,
  dateToken,
  setDateToken,
  setInValidDate,
}: Props) {
  const [isFocusedItem, setIsFocusedItem] = useState(0);

  const textInputRefs = useRef<TextInput[]>([]);

  const setRef = (ele: TextInput, index: number) =>
    (textInputRefs.current[index] = ele);

  const changeFocus = (index: number) => {
    const updatedDateToken = [...dateToken];
    updatedDateToken[index] = '';
    setDateToken(updatedDateToken);
    setIsFocusedItem(index);
  };

  const moveFocus = (direction: 'prev' | 'next', index: number) => {
    const nextIndex = index < 5 ? index + 1 : 5;
    const prevIndex = index > 0 ? index - 1 : 0;
    const indexToGo = direction === 'next' ? nextIndex : prevIndex;

    textInputRefs.current[indexToGo].focus();
    setIsFocusedItem(direction === 'next' ? index + 1 : index - 1);
  };

  const handleInputText = (index: number, text: string) => {
    const updatedDateToken = [...dateToken];
    updatedDateToken[index] = text;
    setDateToken(updatedDateToken);
    moveFocus('next', index);
  };

  const removeInputText = (index: number) => {
    if (isFocusedItem === 6 && dateToken[index]?.length) {
      changeFocus(isFocusedItem - 1);
    } else {
      const updatedDateToken = [...dateToken];
      updatedDateToken[index] = '';
      updatedDateToken[index - 1] = '';
      setDateToken(updatedDateToken);
      moveFocus('prev', index);
    }
    setInValidDate((prev: DateState) => ({ ...prev, state: 'ok' }));
  };

  const onChangeText = (text: string, index: number) => {
    if (index < 0 || index > 5) return;
    if (text.length === 1) handleInputText(index, text);
    if (text.length === 0 && dateToken[index].length === 1)
      removeInputText(index);
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') removeInputText(index);
  };

  return (
    <View style={tw`w-[90%] items-center justify-center`}>
      <View style={tw`flex-row items-center gap-1`}>
        {[1, 2, 3, 4, 5, 6].map((number, idx) => (
          <View key={number} style={tw`flex-row gap-2 items-center h-full`}>
            {idx / 2 === 1 && <DateTypeText dateType='년' />}
            {idx / 2 === 2 && <DateTypeText dateType='월' />}

            <View
              style={tw.style(
                `bg-stone-100 w-[${DEVICE_WIDTH * 0.1}px] aspect-square 
                text-xl rounded-md items-center justify-center ${
                  isFocusedItem === idx ||
                  (isFocusedItem === 6 && idx + 1 === isFocusedItem) ||
                  (isFocusedItem === -1 && idx - 1 === isFocusedItem)
                    ? 'border-blue-600 border-2'
                    : 'border-slate-200 border-2'
                }`,
                SCDream8
              )}
            >
              <TextInput
                allowFontScaling={false}
                ref={(element: TextInput) => setRef(element, idx)}
                placeholder={getDateToken(expiredDate)[idx]}
                placeholderTextColor='#d4d4d4'
                keyboardType='number-pad'
                maxLength={1}
                selectionColor={'#f5f5f4'}
                value={dateToken[idx]}
                autoFocus={idx === isFocusedItem}
                onFocus={() => changeFocus(idx)}
                onChangeText={(text) => onChangeText(text, idx)}
                onKeyPress={({ nativeEvent: { key } }) => onKeyPress(key, idx)}
                style={tw.style(
                  `h-full text-xl rounded-md ${!PlatformIOS ? 'pl-1.5' : ''}`,
                  { ...SCDream8, lineHeight: 24, letterSpacing: 1 }
                )}
              />
            </View>

            {idx / 2 === 2.5 && <DateTypeText dateType='일' />}
          </View>
        ))}
      </View>
    </View>
  );
}

const DateTypeText = ({ dateType }: { dateType: DateType }) => {
  return (
    <Text style={tw`text-slate-500 text-sm px-0 self-end mb-1`}>
      {dateType}
    </Text>
  );
};