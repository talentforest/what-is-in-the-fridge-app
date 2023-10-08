import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { DEVICE_WIDTH } from '../../util';

import SectionContainer from './SectionContainer';
import FoodCard from '../../components/common/FoodCard';
import EmptySign from '../../components/common/EmptySign';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 7;

export default function FavoriteFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <SectionContainer
      title='자주 먹는 식료품'
      message='장을 볼 때 어떤 식료품이 없는지 참고할 수 있어요.'
      screen='FavoriteFoods'
      foodsLength={foodList.length}
    >
      {foodList.length ? (
        <View style={tw`flex-wrap flex-row gap-1.5 mt-2.5 -mx-1 px-1`}>
          {foodList.slice(-MAX_NUM).map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
          {foodList.length >= MAX_NUM && (
            <TouchableOpacity
              onPress={() => navigation.navigate('FavoriteFoods')}
              style={tw`w-[${DEVICE_WIDTH / 4 - 14}px] h-28
                justify-center items-center gap-1`}
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
        </View>
      ) : (
        <View
          style={tw`shadow-lg items-center my-2 h-40 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
        >
          <EmptySign message='자주 먹는 식료품이 없어요.' />
        </View>
      )}
    </SectionContainer>
  );
}
