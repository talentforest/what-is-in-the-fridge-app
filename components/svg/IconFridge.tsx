import { G, Path, Svg } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function IconFridge({ size = 18, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24'>
      <G stroke='none' stroke-width='1' fill='none'>
        <G transform='translate(-864.000000, -96.000000)'>
          <G transform='translate(864.000000, 96.000000)'>
            <Path d='M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z'></Path>
            <Path
              d='M17,2 C18.0543909,2 18.9181678,2.81587733 18.9945144,3.85073759 L19,4 L19,20 C19,21.0543909 18.18415,21.9181678 17.1492661,21.9945144 L17,22 L7,22 C5.94563773,22 5.08183483,21.18415 5.00548573,20.1492661 L5,20 L5,4 C5,2.94563773 5.81587733,2.08183483 6.85073759,2.00548573 L7,2 L17,2 Z M17,13 L7,13 L7,20 L17,20 L17,13 Z M9,14 C9.51283143,14 9.93550653,14.386027 9.9932722,14.8833761 L10,15 L10,17 C10,17.5523 9.55228,18 9,18 C8.48716857,18 8.06449347,17.613973 8.0067278,17.1166239 L8,17 L8,15 C8,14.4477 8.44772,14 9,14 Z M17,4 L7,4 L7,11 L17,11 L17,4 Z M9,6 C9.55228,6 10,6.44772 10,7 L10,9 C10,9.55228 9.55228,10 9,10 C8.44772,10 8,9.55228 8,9 L8,7 C8,6.44772 8.44772,6 9,6 Z'
              fill={color}
            ></Path>
          </G>
        </G>
      </G>
    </Svg>
  );
}