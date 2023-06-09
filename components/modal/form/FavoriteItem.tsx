import { View } from 'react-native';
import CheckBoxBtn from './CheckBoxItem';
import tw from 'twrnc';

interface Props {
  favorite: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
}

export default function FavoriteItem({ favorite, changeInfo }: Props) {
  return (
    <View style={tw`flex-1 gap-4 flex-row mt-2`}>
      <CheckBoxBtn
        title='맞아요'
        check={favorite}
        onPress={() => {
          changeInfo({ favorite: true });
        }}
      />
      <CheckBoxBtn
        title='아니에요'
        check={!favorite}
        onPress={() => {
          changeInfo({ favorite: false });
        }}
      />
    </View>
  );
}
