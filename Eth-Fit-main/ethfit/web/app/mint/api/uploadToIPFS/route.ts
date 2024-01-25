import Date from "../../../../src/date";
import pinataSDK from '@pinata/sdk';
          
const pinata = new pinataSDK({pinataJWTKey: process.env.NEXT_PUBLIC_JWT})

export async function POST (req: Request) {
    const {counter, image} = await req.json();
    // Process a POST request
    let trait_value: string;
    let level = counter/10;
    if(level === 1){
        trait_value = "beginner"
    } else if (level === 2) {
        trait_value = "intermediate"
    }
    else {
        trait_value = "advanced"
    }

    let final_image: string;

    if(image){
        final_image = `ipfs://${image}`
    }
    else{
      final_image = `ipfs://QmSt6GJW8TFzjc5BgoYMQoCpwwSXJNLfxHUY8wRTE3XTcz/${level}.png`
    }

    let newJsonBody = {
        name: "FitCheck",
        image: final_image,
        external_url: process.cwd(),
        attributes: [
          {
            trait_type: "Reps",
            value: counter,
          },
          {
            trait_type: "Level",
            value: trait_value,
          },
          {
            trait_type: "Posting Date",
            value: Date,
          },
        ],
        properties: {
          category: "Fitness",
        },
      };
      
    // Writing the new JSON to a txt file
    // fs.writeFileSync(path.join(process.cwd(), '/temp.txt'), JSON.stringify(newJsonBody))
    // console.log('JSON written to file successfully')

    // // Creating form data for uploading to Pinata
    // const readStream = fs.createReadStream(path.join(process.cwd(), '/temp.txt'))

    console.log("Uploading file to IPFS...")
    const options = {
        pinataMetadata: {
            name: `${newJsonBody.name}.json`,
        },
        pinataOptions: {
            cidVersion: 0 as const,
        }
    }
    const res = await pinata.pinJSONToIPFS(newJsonBody, options)
        .then((result) => {
            console.log("File uploaded successfully to IPFS")
            // console.log(result.IpfsHash)
            return new Response(result.IpfsHash, {status:200})
        })
        .catch((err) => {
            console.log('Error: ', err)
            return new Response('Data not correct', {status:500})
        })
    return res;
} 
