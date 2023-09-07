import { Animated, View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function PurchaseDateItem({ date, changeInfo }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 76,
    active: purchaseOpen,
  });

  useEffect(() => {
    if (date !== '') {
      setPurchaseOpen(true);
    }
  }, []);

  const onConfirm = (date: Date) => {
    setDatePickerVisible(false);
    changeDate(date);
  };

  const changeDate = (date: Date | '') => {
    return changeInfo({ purchaseDate: date ? getFormattedDate(date) : '' });
  };

  const today = new Date();
  const purchaseDate = date === '' ? today : new Date(date);
  const formattedDate = getFormattedDate(purchaseDate, 'YYYY년 MM월 DD일');

  const onPress = () => {
    setPurchaseOpen((prev) => !prev);

    if (!purchaseOpen) {
      return changeDate(purchaseDate);
    }
    if (purchaseOpen) {
      return changeDate('');
    }
  };

  return (
    <View style={tw`pt-2 border-t border-slate-300`}>
      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginTop: 4,
        }}
      >
        <FormLabel label='구매날짜' />
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={tw`h-12 border border-blue-300 bg-white rounded-lg flex-row items-center justify-between px-2`}
        >
          <TextInput
            value={formattedDate}
            editable={false}
            pointerEvents='none'
            style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
          />
          <Icon type='AntDesign' name='calendar' size={16} color={BLUE} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        onPress={onPress}
        style={tw`py-1 flex-row items-center gap-1`}
      >
        <Icon
          name='check-circle-outline'
          type='MaterialCommunityIcons'
          size={17}
          color={purchaseOpen ? BLUE : LIGHT_GRAY}
        />
        <Text
          style={tw`text-sm ${
            purchaseOpen ? 'text-slate-800' : 'text-slate-500'
          }`}
        >
          구매한 날짜 추가 작성하기
        </Text>
      </TouchableOpacity>

      {
        <Text style={tw`text-sm text-slate-500 -mt-1 px-0.5`}>
          유통기한이 없는 식료품인 경우 추가 정보로 작성할 수 있어요
        </Text>
      }

      {/* 캘린더 픽커 모달 */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={date === '' ? today : new Date(date)}
        onConfirm={onConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
}