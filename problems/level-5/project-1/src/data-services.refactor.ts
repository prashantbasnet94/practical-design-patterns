// This file simulates fetching data from different services.
// Each function uses a callback to return data asynchronously.

export function getUser(userId:string): Promise<{id: string, name: string}> {
    console.log('Fetching user...');
    return new Promise((res, rej) => {
         setTimeout(() => {
        if (userId === '1') {
            res({ id: '1', name: 'John Doe' });
        } else {
            rej(new Error('User not found'));
        }
    }, 500);
    })
}

export function getLatestPost(userId: string) :Promise< {id: string, title: string}> {
    console.log('Fetching latest post...');
    return new Promise((res, rej) => {
        setTimeout(() => {
        if (userId === '1') {
            res({ id: 'post1', title: 'My First Post' })
        } else {
            rej(new Error('No posts found for user'));
        }
    }, 500);
    })
}

export function getComments(postId: string) : Promise< {id: string, text: string}[]>{
    console.log('Fetching comments...');
    return new Promise((res, rej) => {
        setTimeout(() => {
        if (postId === 'post1') {
            res( [{ id: 'comment1', text: 'Great post!' }])
        } else {
            rej(new Error('No comments found for post'));
        }
    }, 500);
    })
}
