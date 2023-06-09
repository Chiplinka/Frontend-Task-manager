import { PhotosType } from '@/utils/photoType'
import imageSergey from '@/../public/Sergey.png'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InnoTask About',
  description: 'Learn about the team who worked on this project',
}

type Props = {
  name: string
  description?: string
  image: string
}

export default function AboutApp() {
  const photos: Array<PhotosType> = [
    {
      name: 'Sergey Pasynkov',
      description:
        'Frontend developer. Sergey was in charge of designing the website and diligently worked on enhancing its structure for optimal functionality. He also conducted rigorous testing to ensure that everything was working seamlessly, thus playing a crucial role in the success of the website.',
      image: imageSergey.src,
    },
  ]

  const Photo = ({ name, image, description }: Props) => {
    return (
      <>
        <li className="relative mx-8 w-[20%]">
          <img src={image} alt={`${image}`} className="rounded-full" />
          <p className="mt-2 text-center text-2xl">{name}</p>
          <p className="mt-1 text-center">{description}</p>
        </li>
      </>
    )
  }

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
  )
}
