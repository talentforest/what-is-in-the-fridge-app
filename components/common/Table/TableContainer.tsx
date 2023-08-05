import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function TableContainer({ children }: { children: ReactNode }) {
  return (
    <View style={tw`bg-white px-2 flex-1 rounded-lg border-2 border-slate-300`}>
      {children}
    </View>
  );
}
