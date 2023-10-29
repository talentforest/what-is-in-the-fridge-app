import { Animated, Keyboard, View } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { comma } from '../../util/commaNotation';

import FormLabel from './FormLabel';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  quantity: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function QuantityItem({ quantity, changeInfo }: Props) {
  const [isQuanityOpen, setQuantityOpen] = useState(false);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 49,
    active: isQuanityOpen,
  });

  useEffect(() => {
    if (quantity !== '') {
      setQuantityOpen(true);
    }
  }, []);

  const onChangeText = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    const trimmedText = numericText.replace(/^0+/, '');

    changeInfo({ quantity: trimmedText });
  };

  const onPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    setQuantityOpen((prev) => !prev);
    if (!isQuanityOpen) {
      return changeInfo({ quantity: '1' });
    }
    if (isQuanityOpen) {
      return changeInfo({ quantity: '' });
    }
  };

  return (
    <View>
      <FormLabel label='수량' option isOpen={isQuanityOpen} onPress={onPress} />

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
        }}
      >
        <View style={tw`flex-row items-center gap-1 px-1`}>
          <View
            style={tw.style(
              `h-11 flex-1 bg-white border border-slate-300 flex-row items-center rounded-lg`,
              shadowStyle(3)
            )}
          >
            <TextInput
              style={tw.style(
                `bg-white border-0 m-0.5 flex-1 rounded-lg`,
                HSSaemaulRegular
              )}
              onChangeText={onChangeText}
              value={comma(quantity)}
              focusable={false}
              keyboardType='number-pad'
              placeholder='1'
              returnKeyLabel='완료'
              returnKeyType='done'
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              onChangeText(`${+quantity + 1}`);
            }}
            style={tw.style(
              `h-11 w-12 gap-0.5 flex-row border border-slate-300 bg-stone-700 rounded-lg justify-center items-center`,
              shadowStyle(4)
            )}
          >
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              size={20}
              color='#fff'
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (+quantity <= 1) return onChangeText('1');
              onChangeText(`${+quantity - 1}`);
            }}
            style={tw.style(
              `h-11 w-12 gap-0.5 flex-row border border-slate-300 bg-slate-500 rounded-lg justify-center items-center`,
              shadowStyle(4)
            )}
          >
            <Icon
              name='minus'
              type='MaterialCommunityIcons'
              size={20}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
