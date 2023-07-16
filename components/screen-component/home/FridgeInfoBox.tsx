import { Image, ImageSourcePropType, View } from 'react-native';
import { Text } from '../../native-component';
import { scaleFont } from '../../../util';
import { Asset } from 'expo-asset';
import tw from 'twrnc';
import Box from '../../common/LayoutBox/Box';

interface Props {
  asset: Asset;
  foodLength: number;
  name: string;
}

export default function FridgeInfoBox({ asset, name, foodLength }: Props) {
  return (
    <Box bgColor='bg-blue-300'>
      <Text style={tw`text-blue-600 text-[${scaleFont(18)}px] font-bold`}>
        {name}
      </Text>
      <View style={tw`flex-row items-end justify-between mt-3`}>
        {asset && (
          <Image
            source={asset as ImageSourcePropType}
            style={tw`w-13 h-13 ml-1`}
          />
        )}

        <View style={tw`flex-row items-end gap-0.5`}>
          <Text style={tw`text-white mb-0.5`}>총 : </Text>
          <Text style={tw`text-blue-600 text-[${scaleFont(30)}px] font-bold`}>
            {foodLength}
          </Text>
          <Text style={tw`text-white mb-0.5`}>개</Text>
        </View>
      </View>
    </Box>
  );
}
