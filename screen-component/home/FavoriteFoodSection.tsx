import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

import Icon from '../../components/common/native-component/Icon';
import HeaderTitle from './HeaderTitle';
import FoodCard from '../../components/common/FoodCard';
import tw from 'twrnc';
import MessageBox from './MessageBox';
import EmptySign from '../../components/common/EmptySign';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 5;

export default function FavoriteFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();
  return (
    <View style={tw`flex-1`}>
      <HeaderTitle title='자주 먹는 식료품' screen='FavoriteFoods' />
      <View style={tw`my-2`}>
        {foodList.length ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={tw`h-38 -mx-4 shadow-lg`}
            contentContainerStyle={tw`gap-2 px-4 py-3`}
          >
            {foodList.slice(0, MAX_NUM).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}

            {foodList.length > MAX_NUM && (
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteFoods')}
                style={tw`w-15 mx-2 justify-center items-center gap-1`}
              >
                <Icon
                  name='arrow-right-circle-outline'
                  type='MaterialCommunityIcons'
                  size={30}
                  color={'#888'}
                />
                <Text style={tw`text-xs text-slate-600`}>더보기</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <View
            style={tw`items-center h-40 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
          >
            <EmptySign message='자주 먹는 식료품이 없습니다.' />
          </View>
        )}
      </View>
      <MessageBox desc='장을 볼때 어떤 식료품이 없는지 참고할 수 있어요.' />
    </View>
  );
}
