import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { getCompartments, scaleH } from '../../../util';
import { useSelector } from '../../../redux/hook';
import { Space } from '../../../constant/fridgeInfo';
import CheckBoxBtn from './CheckBoxItem';
import tw from 'twrnc';

interface Props {
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

export default function SpaceItem({ food, changeInfo }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const totalNum = fridgeInfo.compartments[food.space];
  const compartments = getCompartments(totalNum);

  return (
    <View style={tw`gap-5 flex-row justify-between flex-1`}>
      <View style={tw`gap-4`}>
        <View style={tw`flex-row gap-5`}>
          {['냉장실', '냉동실'].map((type) => (
            <CheckBoxBtn
              key={type}
              title={type}
              check={type === food.space.slice(0, 3)}
              onPress={() => {
                const currSpace = `${type} ${food.space.slice(4, 6)}` as Space;
                const largestNum = fridgeInfo.compartments[currSpace];
                if (+food.compartmentNum.slice(0, 1) > largestNum) {
                  return changeInfo({
                    space: `${type} ${food.space.slice(4, 6)}`,
                    compartmentNum: `${largestNum}번`,
                  });
                }
                changeInfo({ space: `${type} ${food.space.slice(4, 6)}` });
              }}
            />
          ))}
        </View>
        <View style={tw`flex-row gap-5`}>
          {['안쪽', '문쪽'].map((side) => (
            <CheckBoxBtn
              key={side}
              title={side}
              check={side === food.space.slice(4, 6)}
              onPress={() => {
                changeInfo({ space: `${food.space.slice(0, 3)} ${side}` });
              }}
            />
          ))}
        </View>
        <View style={tw`flex-row gap-5`}>
          {compartments.map(({ compartmentNum }) => (
            <CheckBoxBtn
              key={compartmentNum}
              title={`${compartmentNum}칸`}
              check={compartmentNum === food.compartmentNum}
              onPress={() => changeInfo({ compartmentNum })}
            />
          ))}
        </View>
      </View>
      <View
        style={tw`h-[${scaleH(12)}] w-[${scaleH(
          12
        )}] absolute right-0 -top-5 flex-row`}
      >
        {['안쪽', '문쪽'].map((side) => (
          <View
            key={side}
            style={tw`${
              fridgeInfo.freezer === 'top' ? '' : 'flex-col-reverse'
            } border border-slate-400 bg-neutral-300 rounded-[3px] gap-1 p-1 flex-1`}
          >
            {[`냉동실 ${side}`, `냉장실 ${side}`].map((space) => (
              <View
                key={space}
                style={tw`${
                  food.space === space ? 'bg-amber-300' : 'bg-white'
                } rounded-sm ${space.includes('냉동') ? 'h-1/3' : 'flex-1'}`}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
