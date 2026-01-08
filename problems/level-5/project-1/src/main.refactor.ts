import { getUser, getLatestPost, getComments } from './data-services.refactor';

const userId = '1';

// SMELL: This is "Callback Hell" or the "Pyramid of Doom".
// It's hard to read, hard to debug, and error handling is a nightmare.
console.log('--- Starting data fetch ---');

const main = async () => {
    let user = await getUser(userId)
    console.log({user})
    let post = await getLatestPost(userId)
    console.log({post})
    let comments = await getComments(post.id)
    console.log({comments})
}
main()
