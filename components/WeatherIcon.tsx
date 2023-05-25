import {
  IconCloud,
  IconCloudFog,
  IconCloudRain,
  IconCloudStorm,
  IconHaze,
  IconMist,
  IconMoon,
  IconSnowflake,
  IconSun,
  IconTornado,
} from "@tabler/icons-react";

type WeatherIconProps = { id: number; code: string; [props: string]: unknown };

const WeatherIcon = ({ id, code, ...props }: WeatherIconProps) => {
  let Icon: React.ElementType;

  switch (true) {
    case id >= 200 && id <= 299:
      Icon = IconCloudStorm;
      break;
    case id >= 300 && id <= 399:
    case id >= 500 && id <= 599:
      Icon = IconCloudRain;
      break;
    case id >= 600 && id <= 699:
      Icon = IconSnowflake;
      break;
    case id >= 700 && id <= 799:
      if (id === 701) Icon = IconMist;
      else if (id === 721) Icon = IconHaze;
      else if (id === 741) Icon = IconCloudFog;
      else if (id === 781) Icon = IconTornado;
      else Icon = IconMist;
      break;
    case id === 800:
      if (code === "01d") Icon = IconSun;
      else Icon = IconMoon;
      break;
    default:
      Icon = IconCloud;
      break;
  }

  return <Icon {...props} />;
};

export default WeatherIcon;
