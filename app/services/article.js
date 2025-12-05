export async function AddArticle(request, response) {
    response.status(200).json(request.body)
}