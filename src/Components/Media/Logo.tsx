import { Typography } from "@mui/material";

type Props = {
  height?: number;
  width?: number;
  padding?: number;
  showText?: boolean;
  title?: string;
  tagline?: string;
  imgUrl?: string;
};
const Logo: React.FC<Props> = ({
  height = 200,
  padding = 20,
  width = 200,
  showText = true,
  title = "dashbud.app",
  tagline = "Just Productivity",
  imgUrl = "",
}) => {
  return (
    <div style={{ padding: padding }} className="midbox w-max">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="institution logo"
          width={width}
          height={height}
        />
      ) : (
        <svg
          width={width}
          height={height}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="200" height="200" rx="32" fill="#1C1C1C" />
          <path
            d="M15.9092 171.541L15 29.5442L28.9997 29.4546C68.2111 29.2035 100.202 60.7871 100.453 99.9985C100.704 139.21 69.1203 171.201 29.9089 171.452L15.9092 171.541Z"
            fill="#40B7FA"
          />
          <rect
            x="174.447"
            y="53.8541"
            width="35"
            height="66"
            rx="17.5"
            transform="rotate(90.7415 174.447 53.8541)"
            fill="#40B7FA"
          />
          <rect
            x="174.178"
            y="107.338"
            width="35"
            height="66"
            rx="17.5"
            transform="rotate(90.2935 174.178 107.338)"
            fill="#40B7FA"
          />
        </svg>
      )}
      {showText && (
        <>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{tagline}</Typography>
        </>
      )}
    </div>
  );
};

export default Logo;
