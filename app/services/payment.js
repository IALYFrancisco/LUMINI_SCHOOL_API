export const GenerateAccessToken = () => {
    console.log("Hello")
}

export function AccessTokenGenerationEveryHour(){
    setInterval( GenerateAccessToken , 55 * 60 * 1_000)
}