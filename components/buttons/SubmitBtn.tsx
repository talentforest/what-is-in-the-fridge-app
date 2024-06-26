import { Text, TouchableOpacity } from '../common/native-component';
import { LIGHT_GRAY } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import IconChevronRight from '../svg/arrow/IconChevronRight';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
  color?: 'blue' | 'gray';
  iconName?: string;
  tailIcon?: boolean;
  disabled?: boolean;
}

export default function SubmitBtn({
  btnName,
  onPress,
  iconName,
  color = 'blue',
  tailIcon,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={tw.style(
        `${
          disabled ? 'bg-gray-300' : `bg-${color}-600`
        } h-10.5 flex-row items-center justify-center gap-1.5 rounded-xl`
      )}
    >
      {iconName && (
        <Icon
          name={iconName}
          type={
            iconName === 'plus' || iconName === 'pencil'
              ? 'Octicons'
              : 'MaterialCommunityIcons'
          }
          color={disabled ? LIGHT_GRAY : '#fff'}
          size={iconName === 'plus' || iconName === 'pencil' ? 14 : 16}
        />
      )}

      <Text
        style={tw`${disabled ? 'text-gray-400' : 'text-white'} text-center`}
      >
        {btnName}
      </Text>

      {tailIcon && <IconChevronRight color='#fff' />}
    </TouchableOpacity>
  );
}
