import { BLUE, DEEP_YELLOW, INDIGO } from '../../../constant/colors';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import tw from 'twrnc';

interface IconProps {
  type: 'MaterialCommunityIcons' | 'AntDesign' | 'Ionicons' | 'Feather';
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({
  type,
  name,
  size = 16,
  color = BLUE,
}: IconProps) {
  const iconColor =
    color === 'amber'
      ? DEEP_YELLOW
      : color === 'blue'
      ? BLUE
      : color === 'indigo'
      ? INDIGO
      : color;

  return (
    <>
      {type === 'MaterialCommunityIcons' && (
        <MIcon name={name} size={size} color={iconColor} />
      )}
      {type === 'AntDesign' && (
        <AIcon style={tw`mb-0.4`} name={name} size={size} color={iconColor} />
      )}
      {type === 'Ionicons' && (
        <IIcon name={name} size={size} color={iconColor} />
      )}
      {type === 'Feather' && (
        <FIcon name={name} size={size} color={iconColor} />
      )}
    </>
  );
}
