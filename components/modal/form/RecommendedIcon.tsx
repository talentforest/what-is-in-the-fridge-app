import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { foodEmojis } from '../../../constant/foodEmojis';
import tw from 'twrnc';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function RecommendedIcon({ name, changeInfo }: Props) {
  const getRecommendedEmojis = (name: string) => {
    if (name === '') return;
    return getMatchChar(name);
  };

  const getMatchChar = (foodName: string) => {
    const foodNameCharArr = foodName.split('').filter((char) => char !== ' ');

    const recommenedEmojis = foodEmojis.filter((emoji) => {
      if (name.length === 1) {
        return [...emoji.ko].some((char) => name.includes(char));
      }
      if (name.length > 1) {
        const includedChar = foodNameCharArr.find((char) =>
          emoji.ko.includes(char)
        );
        const anotherIncludedChar = foodNameCharArr
          .filter((char) => char !== includedChar)
          .find((char) => emoji.ko.includes(char));

        return includedChar && anotherIncludedChar;
      }
    });

    return recommenedEmojis;
  };

  return (
    <>
      {!!getRecommendedEmojis(name)?.length ? (
        <View style={tw`flex-row gap-1.5 w-full mt-1`}>
          {getRecommendedEmojis(name)
            ?.slice(0, 7)
            ?.map((emoji) => (
              <TouchableOpacity
                key={emoji.en}
                onPress={() => {
                  changeInfo({ image: emoji.emoji });
                }}
              >
                <Text key={emoji.en} style={tw`-mb-1`}>
                  {emoji.emoji}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
