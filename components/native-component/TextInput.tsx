import {
  TextInput as Input,
  Platform,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import { TouchableOpacity } from './TouchableOpacity';
import { LIGHT_GRAY } from '../../constant/colors';
import { scaleFont, scaleH } from '../../util';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
  onPress?: () => void;
}

export function TextInput({ style, onPress, ...props }: Props) {
  const onTouchPress = () => {
    if (typeof onPress === 'undefined') return null;
    onPress();
  };

  return (
    <>
      {Platform.OS === 'android' ? (
        <TouchableOpacity style={tw`flex-1`} onPress={onTouchPress}>
          <Input
            style={tw.style(
              `border border-slate-400 h-[${scaleH(
                42
              )}px] p-2 rounded-lg bg-white text-[${scaleFont(14)}px]`,
              FontGmarketSansRegular,
              style
            )}
            {...props}
            placeholderTextColor={LIGHT_GRAY}
          />
        </TouchableOpacity>
      ) : (
        <Input
          style={tw.style(
            `border border-slate-400 p-2 h-[${scaleH(
              42
            )}px] rounded-lg bg-white`,
            FontGmarketSansRegular,
            style
          )}
          placeholderTextColor={LIGHT_GRAY}
          {...props}
        />
      )}
    </>
  );
}
