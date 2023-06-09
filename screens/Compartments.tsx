import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from '../redux/hook';
import { getCompartments, scaleH } from '../util';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import Compartment from '../components/screen-component/compartments/Compartment';
import tw from 'twrnc';
import Container from '../components/common/LayoutBox/Container';

interface RouteParams {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: RouteParams) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as { space: Space };

  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: space });
  }, []);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  if (!fontsLoaded) return null;

  return (
    <Container>
      <View
        style={tw`p-[${scaleH(10)}] gap-[${scaleH(
          2
        )}] border border-slate-300 ${
          space.includes('냉동') ? 'h-4/5' : 'flex-1'
        } w-full m-auto self-center justify-center rounded-lg bg-neutral-200`}
      >
        {compartments.map((compartment) => (
          <Compartment
            key={compartment.compartmentNum}
            foodLocation={{ ...compartment, space }}
          />
        ))}
      </View>
    </Container>
  );
}
