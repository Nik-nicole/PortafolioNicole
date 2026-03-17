import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

export function getVideoUrl(publicId: string, transformations?: any) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'mp4',
    ...transformations,
  })
}
