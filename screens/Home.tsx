import { ScrollView, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cafe24Ssurround } from '../constant/fonts';
import { useGetFoodList } from '../hooks';
import { PlatformIOS } from '../constant/statusBarHeight';

import Container, { BG_COLOR } from '../components/common/Container';
import ShoppingListSection from '../screen-component/home/ShoppingListSection';
import ExpiredFoodSection from '../screen-component/home/ExpiredFoodSection';
import FavoriteFoodSection from '../screen-component/home/FavoriteFoodSection';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import tw from 'twrnc';
import RNBannerAd from '../components/common/RNBannerAd';

const Home = () => {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { allExpiredFoods } = useGetFoodList();

  return (
    <SafeAreaView edges={['top']} style={tw`${BG_COLOR}`}>
      <ScrollView
        contentContainerStyle={tw`pb-0 ${BG_COLOR}`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View
            style={tw`flex-row items-center justify-between ${
              PlatformIOS ? 'my-4' : 'mt-2 mb-4'
            }`}
          >
            <Text
              style={tw.style(
                `text-[#3284FF] ${PlatformIOS ? 'text-[22px]' : 'text-2xl'}`,
                Cafe24Ssurround
              )}
            >
              냉장고에 뭐가 있지?
            </Text>
          </View>

          <SearchFoodSection />

          <ShoppingListSection foodList={shoppingList} />

          <RNBannerAd />

          <ExpiredFoodSection foodList={allExpiredFoods()} />

          <FavoriteFoodSection foodList={favoriteFoods} />
        </Container>
        <View style={tw`items-center mt-10 mb-2`}>
          <RNBannerAd />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
