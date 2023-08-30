import { getRelativeTime } from '../../util';
import { Text } from '../native-component';
import { useRoute } from '@react-navigation/native';

import useExpiredFoods from '../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
}

function LeftDay({ expiredDate }: Props) {
  const route = useRoute();
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();

  const getColor = checkExpired(expiredDate)
    ? 'text-red-600'
    : checkLeftThreeDays(expiredDate)
    ? 'text-amber-700'
    : 'text-green-600';

  const fontSize = route.name === 'Home' ? 'text-[13px]' : 'text-sm';

  return (
    <Text style={tw`${getColor} ${fontSize} ml-1 `}>
      {getRelativeTime(expiredDate)}
    </Text>
  );
}

export default LeftDay;
