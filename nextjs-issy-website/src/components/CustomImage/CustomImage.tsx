type CustomImageProps = {
  imgSrc: string;
  imgAlt: string;
  width: number;
  height: number;
  className?: string;
};
const CustomImage = ({
  imgSrc,
  imgAlt,
  width,
  height,
  className,
}: CustomImageProps) => {
  return (
    <div className="max-h-full overflow-hidden flex items-center">
      <img
        src={imgSrc}
        alt={imgAlt}
        width={width}
        height={height}
        className={`object-contain w-full ${className || ""}`}
        loading="lazy"
      />
    </div>
  );
};

export default CustomImage;
