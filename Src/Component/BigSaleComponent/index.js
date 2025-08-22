import * as React from "react";
import Svg, { G, Mask, Rect, Path, Defs, ClipPath } from "react-native-svg";
import { RF } from "../../Constant";
const BigSaleComponent = (props) => (
  <Svg
    width={RF(335)}
    height={RF(130)}
    viewBox="0 0 335 130"
    fill="none"
  
    {...props}
  >
    <G clipPath="url(#clip0_0_11387)">
      <Mask
        id="mask0_0_11387"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={335}
        height={130}
      >
        <Rect width={335} height={130} rx={9} fill="black" />
      </Mask>
      <G mask="url(#mask0_0_11387)">
        <Path
          opacity={0.7}
          d="M-17.7663 156.306C-66.6736 132.111 0.465898 83.8215 37.5692 77.2792C74.6724 70.7369 110.054 95.5115 116.596 132.615C123.139 169.718 98.3642 205.1 61.2609 211.642C24.1577 218.184 31.141 180.502 -17.7663 156.306Z"
          fill="#FFD471"
        />
        <Path
          d="M472.103 58.9568C548.558 84.2755 460.345 168.648 407.458 185.832C354.57 203.016 297.767 174.073 280.583 121.186C263.399 68.2987 300.832 28.6963 347.794 9.18137C394.757 -10.3336 395.649 33.6382 472.103 58.9568Z"
          fill="#F1B11C"
        />
        <Path
          opacity={0.7}
          d="M334.782 68.148C367.103 24.1852 403 98.6901 403 136.366C403 174.041 372.457 204.584 334.782 204.584C297.106 204.584 266.564 174.041 266.564 136.366C266.564 98.6901 302.461 112.111 334.782 68.148Z"
          fill="#FFD471"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_0_11387">
        <Rect width={335} height={130} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BigSaleComponent;
