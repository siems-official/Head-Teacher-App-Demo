import Svg, {
  Path,
  Circle,
  Defs,
  Pattern,
  Use,
  Image,
  G,
  ClipPath,
} from "react-native-svg";

// A

export const ArrowDownIcon = ({
  className,
  style,
  height,
  width,
  color = "#212121",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 20}
    height={height || 20}
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <Path
      fill={color}
      d="m13.23 7.5-3.234 3.234L6.763 7.5a.83.83 0 1 0-1.175 1.175L9.413 12.5a.83.83 0 0 0 1.175 0l3.825-3.825a.83.83 0 0 0 0-1.175.848.848 0 0 0-1.184 0Z"
    />
  </Svg>
);

export const ArrowKeyboardLeftIcon = ({
  className,
  color = "#4F4F4F",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m15 16.376-3.88-3.88L15 8.616a.996.996 0 1 0-1.41-1.41L9 11.796a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42Z"
    />
  </Svg>
);

export const ArrowKeyboardRightIcon = ({
  className,
  color = "#4F4F4F",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m9 16.376 3.88-3.88L9 8.616a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z"
    />
  </Svg>
);

export const ArrowForwardIcon = ({
  className,
  color = "#000",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 16}
    height={height || 16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m8 2.668-.94.94 3.72 3.727H2.667v1.333h8.113l-3.72 3.727.94.94L13.333 8 8 2.668Z"
    />
  </Svg>
);

export const ArrowDualRightIcon = ({
  className,
  color = "#000",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 16}
    height={height || 17}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      stroke="#22A4EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4.667 5.168 2.666 3.333-2.667 3.334M8.666 5.168l2.667 3.333-2.667 3.334"
    />
  </Svg>
);

// B

export const BackArrowIcon = ({ className, color = "#212121", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M15.66 9.171H6.35l4.068-4.066a.84.84 0 0 0 0-1.184.83.83 0 0 0-1.175 0L3.75 9.413a.83.83 0 0 0 0 1.175l5.492 5.492a.83.83 0 1 0 1.175-1.175L6.35 10.838h9.308a.836.836 0 0 0 .834-.833.836.836 0 0 0-.834-.834Z"
    />
  </Svg>
);

// C

export const CityIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M10 7.528V4.082c0-.354-.14-.694-.393-.94l-1.14-1.14a.664.664 0 0 0-.94 0L6.393 3.135A1.337 1.337 0 0 0 6 4.082v.78H3.333C2.6 4.862 2 5.462 2 6.195v6.667c0 .733.6 1.333 1.333 1.333h9.334c.733 0 1.333-.6 1.333-1.333v-4c0-.734-.6-1.334-1.333-1.334H10Zm-5.333 5.334H3.333v-1.334h1.334v1.334Zm0-2.667H3.333V8.862h1.334v1.333Zm0-2.667H3.333V6.195h1.334v1.333Zm4 5.334H7.333v-1.334h1.334v1.334Zm0-2.667H7.333V8.862h1.334v1.333Zm0-2.667H7.333V6.195h1.334v1.333Zm0-2.666H7.333V3.528h1.334v1.334Zm4 8h-1.334v-1.334h1.334v1.334Zm0-2.667h-1.334V8.862h1.334v1.333Z"
    />
  </Svg>
);

export const CheckRoundedIcon = ({
  className,
  color = "#1CAF68",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM9.29 16.29 5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0Z"
    />
  </Svg>
);

export const CheckLineIcon = ({
  className,
  color = "#56AD7E",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 17}
    height={height || 16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M6.113 10.588 3.8 8.274a.664.664 0 1 0-.94.94l2.787 2.787c.26.26.68.26.94 0l7.053-7.053a.664.664 0 1 0-.94-.94l-6.587 6.58Z"
    />
  </Svg>
);

export const CrossRoundedIcon = ({
  className,
  color = "#F55151",
  style,
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={height || 24}
    height={width || 24}
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <Path
      fill={color}
      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41 9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12 7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41Z"
    />
  </Svg>
);

export const CrossLineIcon = ({
  className,
  color = "#F55151",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 17}
    height={height || 16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill="#FF5858"
      d="M12.45 3.807a.664.664 0 0 0-.94 0L8.25 7.06 4.99 3.8a.664.664 0 1 0-.94.94L7.31 8l-3.26 3.26a.664.664 0 1 0 .94.94l3.26-3.26 3.26 3.26a.664.664 0 1 0 .94-.94L9.19 8l3.26-3.26a.668.668 0 0 0 0-.933Z"
    />
  </Svg>
);

export const CalenderIcon = ({ className, color = "#4F4F4F", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M13.3333 2.00008H12.6666V1.33341C12.6666 0.966748 12.3666 0.666748 11.9999 0.666748C11.6333 0.666748 11.3333 0.966748 11.3333 1.33341V2.00008H4.66658V1.33341C4.66658 0.966748 4.36659 0.666748 3.99992 0.666748C3.63325 0.666748 3.33325 0.966748 3.33325 1.33341V2.00008H2.66659C1.93325 2.00008 1.33325 2.60008 1.33325 3.33342V14.0001C1.33325 14.7334 1.93325 15.3334 2.66659 15.3334H13.3333C14.0666 15.3334 14.6666 14.7334 14.6666 14.0001V3.33342C14.6666 2.60008 14.0666 2.00008 13.3333 2.00008ZM12.6666 14.0001H3.33325C2.96659 14.0001 2.66659 13.7001 2.66659 13.3334V5.33342H13.3333V13.3334C13.3333 13.7001 13.0333 14.0001 12.6666 14.0001Z"
      fill={color}
    />
  </Svg>
);

export const ClearIcon = ({ className, color = "#424242", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m15.833 5.341-1.175-1.175L10 8.825 5.34 4.167 4.167 5.341 8.825 10l-4.658 4.658 1.175 1.175L10 11.175l4.658 4.658 1.175-1.175L11.175 10l4.658-4.659Z"
    />
  </Svg>
);

// D

export const DotIcon = ({ className, color = "#75C7F3", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={4}
    fill="none"
    className={className}
    {...props}
  >
    <Circle cx={2} cy={2} r={2} fill={color} />
  </Svg>
);

export const DownloadIcon = ({ className = "", color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M14.325 7.91699H13V3.75033C13 3.29199 12.625 2.91699 12.1667 2.91699H8.83335C8.37502 2.91699 8.00002 3.29199 8.00002 3.75033V7.91699H6.67502C5.93335 7.91699 5.55835 8.81699 6.08335 9.34199L9.90835 13.167C10.2334 13.492 10.7584 13.492 11.0834 13.167L14.9084 9.34199C15.4334 8.81699 15.0667 7.91699 14.325 7.91699ZM4.66669 16.2503C4.66669 16.7087 5.04169 17.0837 5.50002 17.0837H15.5C15.9584 17.0837 16.3334 16.7087 16.3334 16.2503C16.3334 15.792 15.9584 15.417 15.5 15.417H5.50002C5.04169 15.417 4.66669 15.792 4.66669 16.2503Z"
      fill={color}
    />
  </Svg>
);

export const DownloadFileIcon = ({
  className,
  color = "#FAFAFA",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M18.5 15v3h-12v-3h-2v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2Zm-1-4-1.41-1.41-2.59 2.58V4h-2v8.17L8.91 9.59 7.5 11l5 5 5-5Z"
    />
  </Svg>
);

// E

export const EditIcon = ({
  className,
  color = "#22A4EB",
  height,
  width,
  styles,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 16}
    height={height || 16}
    fill="none"
    className={className}
    style={styles}
    {...props}
  >
    <Path
      fill={color}
      d="m10 10.668-2.667 2.666h5.334c.733 0 1.333-.6 1.333-1.333s-.6-1.333-1.333-1.333H10ZM8.04 4.794l-5.847 5.847a.672.672 0 0 0-.193.467v1.56c0 .366.3.666.667.666h1.56c.18 0 .346-.073.473-.193l5.847-5.847-2.507-2.5ZM12.473 5.361c.26-.26.26-.68 0-.94l-1.56-1.56a.664.664 0 0 0-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22Z"
    />
  </Svg>
);

export const EmailIcon = ({ className, color = "#FAFAFA", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M13.333 2.667H2.667c-.734 0-1.327.6-1.327 1.333l-.007 8c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V4c0-.733-.6-1.333-1.334-1.333ZM13.067 5.5 8.353 8.447a.674.674 0 0 1-.706 0L2.933 5.5a.566.566 0 1 1 .6-.96L8 7.333l4.467-2.793a.566.566 0 1 1 .6.96Z"
    />
  </Svg>
);

export const ExclamationIcon = ({ className, color = "#FFF3E8", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M8.992.055A8.934 8.934 0 0 0 .734 12.413a8.935 8.935 0 0 0 11.679 4.837A8.935 8.935 0 0 0 17.25 5.571 8.934 8.934 0 0 0 8.992.055Zm0 15.375a1.35 1.35 0 1 1-.006-2.7 1.35 1.35 0 0 1 .006 2.7Zm1.635-11.125-.51 6.875a.187.187 0 0 1-.187.175H8.055a.187.187 0 0 1-.188-.175l-.51-6.875a1.638 1.638 0 1 1 3.27 0Z"
    />
  </Svg>
);

// F

export const FilterIcon = ({ className = "", color = "#4F4F4F", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M7.33333 12.0002H8.66667C9.03333 12.0002 9.33333 11.7002 9.33333 11.3336C9.33333 10.9669 9.03333 10.6669 8.66667 10.6669H7.33333C6.96667 10.6669 6.66667 10.9669 6.66667 11.3336C6.66667 11.7002 6.96667 12.0002 7.33333 12.0002ZM2 4.66691C2 5.03358 2.3 5.33358 2.66667 5.33358H13.3333C13.7 5.33358 14 5.03358 14 4.66691C14 4.30024 13.7 4.00024 13.3333 4.00024H2.66667C2.3 4.00024 2 4.30024 2 4.66691ZM4.66667 8.66691H11.3333C11.7 8.66691 12 8.36691 12 8.00024C12 7.63358 11.7 7.33358 11.3333 7.33358H4.66667C4.3 7.33358 4 7.63358 4 8.00024C4 8.36691 4.3 8.66691 4.66667 8.66691Z"
      fill={color}
    />
  </Svg>
);

// I

export const InVisibleIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h24v24H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.01111)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);

// L

export const LogoutIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M4.254 4.167h5a.836.836 0 0 0 .833-.834.836.836 0 0 0-.833-.833h-5c-.917 0-1.667.75-1.667 1.667v11.666c0 .917.75 1.667 1.667 1.667h5a.836.836 0 0 0 .833-.833.836.836 0 0 0-.833-.834h-5V4.167Z"
    />
    <Path
      fill={color}
      d="M17.295 9.708 14.97 7.383a.417.417 0 0 0-.716.292v1.492H8.42a.836.836 0 0 0-.833.833c0 .458.375.833.833.833h5.834v1.492c0 .375.45.558.708.292l2.325-2.325a.41.41 0 0 0 .008-.584Z"
    />
  </Svg>
);

export const LocationMarkerIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M8 1.441c-2.8 0-5.333 2.147-5.333 5.467 0 2.12 1.633 4.613 4.893 7.487.253.22.633.22.887 0 3.253-2.874 4.886-5.367 4.886-7.487 0-3.32-2.533-5.467-5.333-5.467Zm0 6.667c-.733 0-1.333-.6-1.333-1.333 0-.734.6-1.334 1.333-1.334s1.333.6 1.333 1.334c0 .733-.6 1.333-1.333 1.333Z"
    />
  </Svg>
);

// N

export const NotificationIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M10.001 18.125c.917 0 1.667-.75 1.667-1.667H8.334c0 .917.742 1.667 1.667 1.667Zm5-5V8.958c0-2.558-1.367-4.7-3.75-5.266v-.567c0-.692-.558-1.25-1.25-1.25s-1.25.558-1.25 1.25v.567c-2.392.566-3.75 2.7-3.75 5.266v4.167L3.926 14.2c-.525.525-.158 1.425.583 1.425h10.975c.742 0 1.117-.9.592-1.425l-1.075-1.075Z"
    />
  </Svg>
);

// P

export const PdfIcon = ({ className, color = "#FF5858", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1H10c.83 0 1.5.67 1.5 1.5v1Zm5 2c0 .83-.67 1.5-1.5 1.5h-2c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h2c.83 0 1.5.67 1.5 1.5v3Zm4-3.75c0 .41-.34.75-.75.75H19v1h.75c.41 0 .75.34.75.75s-.34.75-.75.75H19v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1h1.25c.41 0 .75.34.75.75ZM9 9.5h1v-1H9v1ZM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1Zm11 5.5h1v-3h-1v3Z"
    />
  </Svg>
);

export const PlusIcon = ({ style, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    style={style}
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M24 10v28M10 24h28"
    />
  </Svg>
);

export const PhoneIcon = ({ className, color = "#fff", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m12.814 10.179-1.693-.193a1.327 1.327 0 0 0-1.093.38L8.8 11.591A10.03 10.03 0 0 1 4.408 7.2L5.64 5.966c.287-.287.427-.687.38-1.094l-.193-1.68A1.334 1.334 0 0 0 4.5 2.012H3.348c-.754 0-1.38.627-1.334 1.38.354 5.694 4.907 10.24 10.594 10.593.753.047 1.38-.58 1.38-1.333V11.5c.006-.674-.5-1.24-1.174-1.32Z"
    />
  </Svg>
);

export const PaperPlane = ({
  className,
  height,
  width,
  color = "#fff",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={height || 20}
    height={width || 20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#41A5EE"
        d="M2.018 1.14C.503 1.14-.474 2.755.233 4.099L2.82 9.004l8.676.996-8.676 1-2.586 4.906c-.707 1.344.266 2.957 1.785 2.957.274 0 .547-.054.801-.164l16.008-6.914c1.562-.676 1.562-2.89 0-3.566L2.819 1.305a2.026 2.026 0 0 0-.8-.164Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const PrintIcon = ({
  className,
  color = "#FAFAFA",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={height || 12}
    height={width || 12}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M9.5 4H9V1.5H3V4h-.5C1.67 4 1 4.67 1 5.5v3h2v2h6v-2h2v-3c0-.83-.67-1.5-1.5-1.5ZM4 2.5h4V4H4V2.5Zm4 7H4v-2h4v2Zm1-2v-1H3v1H2v-2c0-.275.225-.5.5-.5h7c.275 0 .5.225.5.5v2H9Z"
    />
    <Path fill={color} d="M9 6.25a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
  </Svg>
);

// S

export const SuccessIcon = ({ className, color = "#56AD7E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M8.79499 16.3749L4.62499 12.2049L3.20499 13.6149L8.79499 19.2049L20.795 7.20492L19.385 5.79492L8.79499 16.3749Z"
      fill={color}
    />
  </Svg>
);

export const SearchIcon = ({
  className,
  color = "#4F4F4F",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={height || "24"}
    height={width || "24"}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M15.9766 14.4713H15.1866L14.9066 14.2013C16.1066 12.8013 16.7266 10.8913 16.3866 8.86133C15.9166 6.08133 13.5966 3.86133 10.7966 3.52133C6.56658 3.00133 3.00658 6.56133 3.52658 10.7913C3.86658 13.5913 6.08658 15.9113 8.86658 16.3813C10.8966 16.7213 12.8066 16.1013 14.2066 14.9013L14.4766 15.1813V15.9713L18.7266 20.2213C19.1366 20.6313 19.8066 20.6313 20.2166 20.2213C20.6266 19.8113 20.6266 19.1413 20.2166 18.7313L15.9766 14.4713ZM9.97658 14.4713C7.48658 14.4713 5.47658 12.4613 5.47658 9.97133C5.47658 7.48133 7.48658 5.47133 9.97658 5.47133C12.4666 5.47133 14.4766 7.48133 14.4766 9.97133C14.4766 12.4613 12.4666 14.4713 9.97658 14.4713Z"
      fill={color}
    />
  </Svg>
);

export const SendTextIcon = ({ className, color = "#22A4EB", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="m3.671 20.399 17.45-7.48a1 1 0 0 0 0-1.84l-17.45-7.48a.993.993 0 0 0-1.39.91l-.01 4.61c0 .5.37.93.87.99l14.13 1.89-14.13 1.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91Z"
    />
  </Svg>
);

export const SortIcon = ({
  className,
  color = "#424242",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 16}
    height={height || 16}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M8 3.887 10.113 6l.94-.94L8 2 4.94 5.06l.947.94L8 3.887Zm0 8.226L5.887 10l-.94.94L8 14l3.06-3.06-.947-.94L8 12.113Z"
    />
  </Svg>
);

// T

export const ThreeDotsMenuIcon = ({
  className,
  color = "#262625",
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={className}
    {...props}
  >
    <Path
      fill={color}
      d="M5 8.334c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666c0-.917-.75-1.667-1.667-1.667Zm10 0c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666c0-.917-.75-1.667-1.667-1.667Zm-5 0c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666c0-.917-.75-1.667-1.667-1.667Z"
    />
  </Svg>
);

export const TrashIcon = ({ className = "", color = "#FF5858", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M16 9.50024V19.5002H8V9.50024H16ZM14.5 3.50024H9.5L8.5 4.50024H5V6.50024H19V4.50024H15.5L14.5 3.50024ZM18 7.50024H6V19.5002C6 20.6002 6.9 21.5002 8 21.5002H16C17.1 21.5002 18 20.6002 18 19.5002V7.50024Z"
      fill={color}
    />
  </Svg>
);

// U

export const UploadIcon = ({ className, color = "#22A4EB", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <Path
      d="M19.35 10.0402C18.67 6.59024 15.64 4.00024 12 4.00024C9.11 4.00024 6.6 5.64024 5.35 8.04024C2.34 8.36024 0 10.9102 0 14.0002C0 17.3102 2.69 20.0002 6 20.0002H19C21.76 20.0002 24 17.7602 24 15.0002C24 12.3602 21.95 10.2202 19.35 10.0402ZM19 18.0002H6C3.79 18.0002 2 16.2102 2 14.0002C2 11.9502 3.53 10.2402 5.56 10.0302L6.63 9.92024L7.13 8.97024C8.08 7.14024 9.94 6.00024 12 6.00024C14.62 6.00024 16.88 7.86024 17.39 10.4302L17.69 11.9302L19.22 12.0402C20.78 12.1402 22 13.4502 22 15.0002C22 16.6502 20.65 18.0002 19 18.0002ZM8 13.0002H10.55V16.0002H13.45V13.0002H16L12 9.00024L8 13.0002Z"
      fill={color}
    />
  </Svg>
);

// V

export const VisibleIcon = ({ className, color = "#4F4F4F", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h24v24H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.01111)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFbUlEQVR4nO2cXYhVVRSAv6vTqJmpY1MvUfRjYWWTlZCQUY2FxIRND0pEvWlSEFpB/5P1Ug8R9OCDCf3RQwWBPSRRNDb+RCONmgyjSH8PhfYzZmozI5Ynlq0Ll8GZuefctc/ZM3d9sOAyc+esnzln773WXvuA4ziO4ziO4ziO4ziO4ziOExnTgIXASmA98DnQC/wGHAESlSP6s179znr9mxuBqUU7ESOTgEXAK8Be4GRFMLOKXONb4GXgJtVRt9wCbAQOGQR2LDkIvAHcTJ0wBXgQ2JNDcEeS3cAq4GwmIDOAdcAfBQZ4uIgtLwDnMAE4S++egxEEdiT5HXhSn7ZxyT3ADxEEMqlSvgPuZhxxAfBuBIFLMsqHwPlEzgNAfwTBSgzG7/uJEJlQ3jN2dgjoBJ7XYWgeMFvH/Ub9fJX+rgPYon9jacM7wHQi4Vpgn6Fz32iGNzODLbN08u0xtKcPuJqCuQ8YMHKoB7jT0Laluma2sO1vYDkFUAKeA04ZODEAPApMDmBnA7AGGDSwU3x9hhyR8fFtoztlPzA/B5tbgANGNr+lMQiKLOo3GRm8E2gmP5qAHUa2b9YqY7A0eouRoV8XlPqKzm4jH74I4cO5Ghyr4WIOxXGe4TCyQ29AE6TK9aWRYYPAdRTPfMPV0naLtbaMyZ8ZGZTo6iIW1hr69WktRamScbbXE2gJl5XJhutskQ80ZqlZZ2hEYpyMWHGXsY9SLkid8VkkI5VpdS3codteMpEeV9mn21NLariu3IG7DP2UmK2oVvkio0yqUlZmDMQVQFcV15fJem5GHQ8Z+zqgG8KjcmGAzdKhjAUi2bw9nEKPfHdxBj1SBTxh7PMhjeWIdYGtxgoTLXVmuZPTBLksUgu/PLU2u+VrpXSNNPm/FEBZpgmC6oaLkUSy16In/rK8OFzRbcC/gZQtyzDx1aqzNaXO9kC+/wPcWlYiKeRPgRQlujOSho0GOjek0vh/YT+U/z+W0/RXAypJMtQ19hvolKVf2vpHyBhIjE83CoZU0pjS6WMGOuUaaZgSOAa/kkP3UGNKp48a6DwaWaClSYfXJ+DQ0RfZ0CExPt0s8ldAJfPqfDL8s3In6ZGAipaldHqJgc7bI1neiTxcqWiS4X7acOkg30ytM6KEZduZmuCvDFBMyur4JTqB5JWChyg9DGkn1Rl5IpDCWRmcX5yyj68/Y1GpKUBRSeSxseqzHwdQuopszK1y570z450srA7g76Zqdltma9qYGG9j1UKrriT6NBk5pp83ZJj4KikZb2eJfJ/mCV4YoDNzKfHRZuyjxOyGtEZYL/l2a807Fhr0uF0MQ6R51riGeLCe+F+rxRhZA35kaMwgsIA4erqtGmjKxzFqPjQ6zbDnLtF2LKktFEWzHgxKDHvwzI5ETzde1HcX2OS409CPrhBHL2YYp+ndOd/ZzcZB3h7yZpH/3ifGw0gL4VlgPFxszuOJbNCud8sJcm2gpZ9c83HjGs6beS5TS1rxsmwb26O9cCUj+9qM18mn9Oy4hX2pacvY6JKMIru0TUtKAVkKRKsDpNWH1ddCuTSAY4lW1Lr0LmrXXZA5ugfZqJ+vAe7Vp2troCpcj5Zto2CqvkHG4u0xSSRyUn2K8rVBLcanVpOCZK8W1qJGzmo/HXjDNwkk8kKsp9SHcUOTPnqDEQRwLDmhtW15Bca45WJtIbAs4ljJgJ4auIgJxEyt1/ZGEOAD+nqfIs87BqekrblyJ/2SY3B/1uGhtaiko0hKwPXa+/GVHgKyCuxxLfw8q7WOugvuaEjx/DJNUDr07N427cfr1/aqyhVCv/5OvvO+ni5o12vU9dsbHcdxHMdxHMdxHMdxHMdxiIv/AFyxU2gxdMHCAAAAAElFTkSuQmCC"
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);

export const ViewEyeIcon = ({
  className,
  color = "#54A0FF",
  height,
  width,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 17}
    height={height || 16}
    fill="none"
    className={className}
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M8.25 3.002c-3.333 0-6.18 2.073-7.333 5 1.153 2.927 4 5 7.333 5s6.18-2.073 7.333-5c-1.153-2.927-4-5-7.333-5Zm0 8.333a3.335 3.335 0 0 1 0-6.666 3.335 3.335 0 0 1 3.333 3.333 3.335 3.335 0 0 1-3.333 3.333Zm0-5.333c-1.107 0-2 .893-2 2s.893 2 2 2 2-.893 2-2-.893-2-2-2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.25 0h16v16h-16z" />
      </ClipPath>
    </Defs>
  </Svg>
);
