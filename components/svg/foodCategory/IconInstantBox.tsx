import { Path, Svg } from 'react-native-svg';
import { LIGHT_GRAY, MEDIUM_GRAY } from '../../../constant/colors';

interface Props {
  size: number;
  inActive: boolean;
}

export default function IconInstantBox({ size, inActive }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 12 12' fill='none'>
      <Path
        d='M2.86466 1.18751C3.26739 0.936951 9.82395 0.874698 9.91201 1.18738C9.99233 1.47256 9.07635 2.64248 8.91456 2.84612C8.8988 2.86596 8.87641 2.8784 8.85133 2.88196L4.52969 3.49549C4.51037 3.49823 4.49073 3.49529 4.47309 3.48694C4.21045 3.3626 2.11807 2.36728 2.06099 2.18963C2.00007 2.00006 2.46193 1.43807 2.86466 1.18751Z'
        fill={inActive ? LIGHT_GRAY : '#28b6e9'}
      />
      <Path
        d='M8.87055 10.7588C8.54605 10.7588 8.82175 2.89894 8.84202 2.33311C8.84283 2.31045 8.85123 2.29166 8.86602 2.27447L9.78866 1.20173C9.84889 1.13171 9.96365 1.16917 9.96435 1.26153C9.97482 2.6458 10.0199 9.06622 9.95954 9.46687C9.89183 9.91613 9.20716 10.7588 8.87055 10.7588Z'
        fill={inActive ? LIGHT_GRAY : '#28b6e9'}
      />
      <Path
        d='M1.99518 2.29186C1.99773 2.12703 2.13301 2.0005 2.29784 2.00233L8.6496 2.07288C8.81398 2.0747 8.94627 2.20847 8.94627 2.37286V10.6165C8.94627 10.7783 8.81941 10.9109 8.65766 10.9158C7.41663 10.9536 2.58128 11.0885 2.23671 10.9068C1.88464 10.721 1.97176 3.8099 1.99518 2.29186Z'
        fill={inActive ? LIGHT_GRAY : '#5581f0'}
      />
      <Path
        d='M9.06037 2.04429L9.72742 1.35898'
        stroke={inActive ? LIGHT_GRAY : '#bad6ff'}
        stroke-width='0.1'
        stroke-linecap='round'
      />
      <Path
        d='M3.45925 4.35879C3.45925 3.92246 3.81829 3.54096 4.28204 3.58675C5.79207 3.73634 7.19107 4.44688 8.20262 5.57796C8.51471 5.92591 8.41758 6.44246 8.06292 6.69941L7.93954 6.78896L7.83367 6.63146L7.83133 6.62825C6.90092 5.34287 5.38717 4.50637 3.678 4.50637H3.45925V4.35879ZM7.47492 6.88171L7.58517 7.04591L6.43396 7.88154L6.37504 7.92529V8.53837C6.37504 8.61573 6.34431 8.68991 6.28961 8.74461C6.23492 8.79931 6.16073 8.83004 6.08337 8.83004C6.00602 8.83004 5.93183 8.79931 5.87713 8.74461C5.82244 8.68991 5.79171 8.61573 5.79171 8.53837V8.52087C5.78704 8.48416 5.76859 8.4506 5.7401 8.42698C5.71161 8.40337 5.67521 8.39147 5.63827 8.39369C5.60133 8.39592 5.56662 8.4121 5.54117 8.43897C5.51572 8.46583 5.50143 8.50137 5.50121 8.53837V8.97616C5.50122 9.051 5.47246 9.12297 5.42089 9.1772C5.36932 9.23143 5.29888 9.26376 5.22414 9.2675C5.1494 9.27125 5.07608 9.24612 5.01935 9.19733C4.96261 9.14853 4.92681 9.07979 4.91933 9.00533L4.49933 9.30866C4.06504 9.62191 3.45808 9.31187 3.45837 8.77608L3.45925 4.94358H3.678C5.23958 4.94358 6.62267 5.70687 7.47492 6.88171ZM4.62621 6.20504C4.70356 6.20504 4.77775 6.17431 4.83245 6.11961C4.88715 6.06491 4.91787 5.99073 4.91787 5.91337C4.91787 5.83602 4.88715 5.76183 4.83245 5.70713C4.77775 5.65244 4.70356 5.62171 4.62621 5.62171C4.54885 5.62171 4.47467 5.65244 4.41997 5.70713C4.36527 5.76183 4.33454 5.83602 4.33454 5.91337C4.33454 5.99073 4.36527 6.06491 4.41997 6.11961C4.47467 6.17431 4.54885 6.20504 4.62621 6.20504ZM5.79287 7.07946C5.87023 7.07946 5.94442 7.04873 5.99911 6.99403C6.05381 6.93933 6.08454 6.86514 6.08454 6.78779C6.08454 6.71043 6.05381 6.63625 5.99911 6.58155C5.94442 6.52685 5.87023 6.49612 5.79287 6.49612C5.71552 6.49612 5.64133 6.52685 5.58663 6.58155C5.53194 6.63625 5.50121 6.71043 5.50121 6.78779C5.50121 6.86514 5.53194 6.93933 5.58663 6.99403C5.64133 7.04873 5.71552 7.07946 5.79287 7.07946ZM4.62621 7.95387C4.70356 7.95387 4.77775 7.92314 4.83245 7.86845C4.88715 7.81375 4.91787 7.73956 4.91787 7.66221C4.91787 7.58485 4.88715 7.51066 4.83245 7.45597C4.77775 7.40127 4.70356 7.37054 4.62621 7.37054C4.54885 7.37054 4.47467 7.40127 4.41997 7.45597C4.36527 7.51066 4.33454 7.58485 4.33454 7.66221C4.33454 7.73956 4.36527 7.81375 4.41997 7.86845C4.47467 7.92314 4.54885 7.95387 4.62621 7.95387Z'
        fill={inActive ? '#eee' : '#ffbd2e'}
      />
    </Svg>
  );
}