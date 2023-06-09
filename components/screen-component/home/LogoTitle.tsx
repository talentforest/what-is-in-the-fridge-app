import { View } from 'react-native';
import { Text } from '../../native-component';
import { DdangMedium } from '../../../constant/fonts';
import tw from 'twrnc';

export default function LogoTitle() {
  return (
    <View style={tw`flex-row items-center justify-between my-2`}>
      <Text style={tw.style('text-blue-700', { ...DdangMedium })} fontSize={22}>
        냉장고에 뭐가 있지?
      </Text>
    </View>
  );
}
