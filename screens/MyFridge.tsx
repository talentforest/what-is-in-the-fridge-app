import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FridgeShape from '../components/common/FridgeShape';
import SearchFoodModal from '../components/modal/SearchFoodModal';
import HeaderBtn from '../components/common/Buttons/HeaderBtn';
import Container from '../components/common/LayoutBox/Container';
import tw from 'twrnc';

export default function MyFridge() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBtn
          iconName={'search'}
          onPress={() => setModalVisible((prev) => !prev)}
        />
      ),
    });
  }, []);

  return (
    <Container>
      <View style={tw`w-[95%] h-[90%] max-h-[700px] m-auto`}>
        <FridgeShape />
      </View>
      {modalVisible && (
        <SearchFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </Container>
  );
}
