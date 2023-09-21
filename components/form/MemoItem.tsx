import { Animated, View } from 'react-native';
import { useEffect } from 'react';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleMemoOpen } from '../../redux/slice/isMemoOpenSlice';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  memo: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function MemoItem({ memo, changeInfo }: Props) {
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 80,
    active: isMemoOpen,
  });

  useEffect(() => {
    if (memo !== '') {
      dispatch(toggleMemoOpen(true));
    }
  }, []);

  const onChangeText = (value: string) => changeInfo({ memo: value });

  const onPress = () => {
    dispatch(toggleMemoOpen(!isMemoOpen));

    if (!isMemoOpen) {
      changeInfo({ memo: '' });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <FormLabel label='메모' option isOpen={isMemoOpen} />
      </TouchableOpacity>

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
              `h-18 p-0.5 flex-1 bg-white border border-slate-300 shadow-md flex-row items-center rounded-lg`
            )}
          >
            <TextInput
              style={tw.style(`bg-white border-0 h-full  flex-1 rounded-lg`, {
                lineHeight: 22,
              })}
              onChangeText={onChangeText}
              value={memo}
              placeholder='식료품에 대한 메모를 작성해주세요'
              multiline
              returnKeyType='done'
              blurOnSubmit={true}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
