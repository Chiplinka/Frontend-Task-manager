import { PhotosType } from "@/utils/photoType";
import Image from "next/image";
import imageSergey from "@/../public/Sergey.png";
import { Helmet } from "react-helmet";

type Props = {
  name: string;
  description?: string;
  image: string;
};

export default function AboutApp() {
  const photos: Array<PhotosType> = [
    {
      name: "Sergey Pasynkov",
      description:
        "Frontend developer. Sergey was in charge of designing the website and diligently worked on enhancing its structure for optimal functionality. He also conducted rigorous testing to ensure that everything was working seamlessly, thus playing a crucial role in the success of the website.",
      image: imageSergey.src,
    },
  ];

  const Photo = ({ name, image, description }: Props) => {
    return (
      <>
        {/* <Helmet>
          <meta property="og:title" content="InnoTask" />
          <meta
            property="og:description"
            content="Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!"
          />
        </Helmet> */}
        <li className="relative mx-8 w-[20%]">
          <Image src={image} alt={`${image}`} className="rounded-full" />
          <p className="mt-2 text-center text-2xl">{name}</p>
          <p className="mt-1 text-center">{description}</p>
        </li>
      </>
    );
  };

  return (
    <>
      <div className="mt-10 w-full overflow-x-auto overflow-y-hidden">
        <ul className="flex items-baseline justify-center text-center align-middle">
          {photos.map((item: PhotosType, index) => (
            <Photo
              key={`${item.name}-${index}`}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
