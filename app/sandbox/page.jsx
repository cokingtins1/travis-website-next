import beatKitImage from "@/public/beatKitImage.jpg"

export default function Page() {
	
	fetch(beatKitImage.blurDataURL)
	.then(response => response.blob())
	.then(blob => {
	  const file = new File([blob], 'beatKitImage.jpg', { type: 'image/jpeg' }); // replace 'image/jpeg' with the correct MIME type of your image
	  console.log(file);
	})
	.catch(error => console.error(error));	

	return <div>Hi</div>
}
