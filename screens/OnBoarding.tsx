import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/native-component';
import { Animated, Dimensions, Image, Platform, View } from 'react-native';
import { useImageLoad, useSwiperAnimation } from '../hooks';
import { onboardingSteps } from '../constant/onboardingInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { FontGmarketSansBold } from '../constant/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleOnboarding } from '../redux/slice/onboardingSlice';

import StepIndicator from '../components/form/StepIndicator';
import SquareBtn from '../components/buttons/SquareBtn';
import tw from 'twrnc';

export default function OnBoarding() {
  const { onboarding } = useSelector((state) => state.onboarding);
  const navigation = useNavigation<NavigateProp>();
  const dispatch = useDispatch();

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/iphone13pro-1.png'),
      require('../assets/iphone13pro-2.png'),
      require('../assets/iphone13pro-3.png'),
    ],
  });

  const {
    moveStep,
    FORM_WIDTH,
    stepTranslateX,
    currentStep,
    panResponder, //
  } = useSwiperAnimation({ steps: onboardingSteps });

  const lastStep = onboardingSteps.length === currentStep.step;

  const imgWidth = Dimensions.get('screen').width * 0.85;

  const getImgUri = (image: string) => {
    return assets?.find((asset) => `${asset.name}.png` === image)?.uri;
  };

  const completeOnboarding = async () => {
    try {
      if (lastStep && onboarding) {
        dispatch(toggleOnboarding(false));
        navigation.navigate('MyTabs'); // 메인 화면으로 이동
      } else {
        moveStep('next', currentStep.step);
      }
    } catch (error) {
      console.error('온보딩 완료 저장 오류:', error);
    }
  };

  if (!isLoaded) return null;

  return (
    <SafeAreaView edges={['top']} style={tw`bg-blue-100 flex-1`}>
      <View style={tw`flex-1 pt-8 items-center justify-center`}>
        {/* 단계 표시 */}
        <StepIndicator
          stepLength={onboardingSteps.length}
          currentStepId={currentStep.step}
        />

        {/* 스와이프 화면들 */}
        <Animated.View
          style={{
            flex: 1,
            width: FORM_WIDTH,
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <View style={tw`flex-row flex-1`}>
            {onboardingSteps.map(({ step, desc, image }) => (
              <View key={step} style={tw`w-full items-center`}>
                {/* 문구 */}
                <View style={tw`mt-8 mb-3 gap-1 items-center justify-center`}>
                  <Text
                    style={tw.style(
                      `text-[18px] text-slate-800`,
                      FontGmarketSansBold
                    )}
                  >
                    {desc.split(', ')[0]}
                  </Text>
                  <Text
                    style={tw.style(
                      `text-[18px] text-slate-800`,
                      FontGmarketSansBold
                    )}
                  >
                    {desc.split(', ')[1]}
                  </Text>
                </View>

                {/* 이미지 */}
                <View
                  style={tw.style(
                    `h-[${
                      imgWidth * 2
                    }px] overflow-hidden pt-6 items-center rounded-xl`,
                    {
                      ...Platform.select({
                        ios: {
                          width: '100%',
                          shadowColor: '#444',
                          shadowOpacity: 1,
                          shadowRadius: 18,
                          shadowOffset: {
                            height: 12,
                            width: 0,
                          },
                        },
                        android: {
                          elevation: 100,
                          borderTopRightRadius: 60,
                          borderTopLeftRadius: 60,
                        },
                      }),
                    }
                  )}
                >
                  {assets && (
                    <Image
                      source={{ uri: getImgUri(image) }}
                      style={{ width: imgWidth, height: imgWidth * 2 }}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* 들어가기 버튼 */}
        {lastStep && (
          <LinearGradient
            colors={['rgba(256,256,256,0)', '#c9dbfc', '#9abdfc', '#68adfd']}
            style={tw.style(
              `absolute bottom-0 w-full h-[30%] justify-end items-center pb-15 px-8`
            )}
          >
            <SquareBtn
              name={lastStep ? '들어가기' : '다음'}
              onPress={completeOnboarding}
            />
          </LinearGradient>
        )}
      </View>
    </SafeAreaView>
  );
}
