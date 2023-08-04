import { View } from 'react-native';
import { Text } from '../../native-component';
import { Cafe24Ssurround } from '../../../constant/fonts';
import tw from 'twrnc';

export default function LogoTitle() {
  return (
    <View style={tw`flex-row items-center justify-between my-1`}>
      <Text fontSize={23} style={tw.style(`text-blue-600`, Cafe24Ssurround)}>
        냉장고에 뭐가 있지?
      </Text>
    </View>
  );
}
