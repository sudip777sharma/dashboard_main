import React from "react";
import { type IconType } from "react-icons/lib";

type propType = {
  icon: IconType;
  height?: string;
  width?: string;
  color?: string;
  className?: string;
};

const Icon: React.FC<propType> = ({
  icon: IconComponent,
  height,
  width,
  color,
  className,
}: propType) => {
  return (
    <div className={`${className}`}>
      <IconComponent
        style={{
          color: `${color}`,
          height: `${height}`,
          width: `${width}`,
        }}
      />
    </div>
  );
};

export default Icon;
