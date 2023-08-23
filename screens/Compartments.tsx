import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from '../redux/hook';
import { getCompartments, scaleH } from '../util';
import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView, Text } from '../components/native-component';
import Compartment from '../components/screen-component/compartments/Compartment';
import Container from '../components/common/layout/Container';
import HeaderBtn from '../components/common/buttons/HeaderBtn';
import tw from 'twrnc';
import HeaderTitle from '../components/common/HeaderTitle';

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export type CompartmentNumToDrop = CompartmentNum | '동일칸';

interface RouteParams {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: RouteParams) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as { space: Space };
  const [compartmentNumToDrop, setCompartmentNumToDrop] =
    useState<CompartmentNumToDrop>('동일칸');

  const [moveMode, setMoveMode] = useState(false);
  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={space} />,
      headerRight: () => (
        <HeaderBtn
          iconName={moveMode ? 'check' : 'drag'}
          onPress={() => setMoveMode((prev) => !prev)}
          type='MaterialCommunityIcons'
        />
      ),
    });
  }, [moveMode]);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <View
          style={tw`p-[${scaleH(10)}] gap-[${scaleH(2)}] flex-1
          border border-slate-400 w-full m-auto self-center justify-center rounded-lg bg-neutral-200`}
        >
          {compartments.map((compartment) => (
            <Compartment
              key={compartment.compartmentNum}
              moveMode={moveMode}
              setMoveMode={setMoveMode}
              foodLocation={{ ...compartment, space }}
              compartmentNumToDrop={compartmentNumToDrop}
              setCompartmentNumToDrop={setCompartmentNumToDrop}
            />
          ))}
        </View>
      </Container>
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
    </SafeBottomAreaView>
  );
}
