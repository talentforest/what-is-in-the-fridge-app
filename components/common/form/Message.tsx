import { View } from 'react-native';
import { Text } from '../../native-component';
import tw from 'twrnc';

interface Props {
  message: string;
  color: 'green' | 'orange';
}

export default function Message({ message, color }: Props) {
  return (
    <View style={tw`flex-row mt-1 items-start`}>
      <Text style={tw`text-${color}-600 flex-1 text-xs`}>{message}</Text>
    </View>
  );
}