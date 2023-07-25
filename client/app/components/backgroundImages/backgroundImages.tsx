import Image from "next/image";
import './backgroundImages.css';

export default function BackgroundImages() {
  const allImagePaths: string[] = [];
  for (let index = 1; index < 21; index++) {
    const imagePath = `/login_images/${index}.jpg`;
    allImagePaths.push(imagePath);
  }

  return (
    <div className="background">
      {allImagePaths.map((imagePath: string, index: number) => {
        return (
          <div key={imagePath} className="image-container">
            <Image
              src={imagePath}
              fill={true}
              objectFit="cover"
              objectPosition="100% 30%"
              alt={`Image ${index}`}
            />
          </div>
        );
      })}
    </div>
  );
}
