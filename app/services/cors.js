export const corsConfiguration = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    response.setHeader('Access-Control-Allow-Headers', process.env.ALLOWED_HEADERS)
    response.setHeader('Access-Control-Allow-Methods', 'DELETE')
    response.setHeader('Access-Control-Allow-Credentials', true)
    next()
}