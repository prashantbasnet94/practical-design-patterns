// This file simulates fetching data from different services.
// Each function uses a callback to return data asynchronously.

export function getUser(userId: string, callback: (error: Error | null, user?: any) => void) {
    console.log('Fetching user...');
    setTimeout(() => {
        if (userId === '1') {
            callback(null, { id: '1', name: 'John Doe' });
        } else {
            callback(new Error('User not found'));
        }
    }, 500);
}

export function getLatestPost(userId: string, callback: (error: Error | null, post?: any) => void) {
    console.log('Fetching latest post...');
    setTimeout(() => {
        if (userId === '1') {
            callback(null, { id: 'post1', title: 'My First Post' });
        } else {
            callback(new Error('No posts found for user'));
        }
    }, 500);
}

export function getComments(postId: string, callback: (error: Error | null, comments?: any[]) => void) {
    console.log('Fetching comments...');
    setTimeout(() => {
        if (postId === 'post1') {
            callback(null, [{ id: 'comment1', text: 'Great post!' }]);
        } else {
            callback(new Error('No comments found for post'));
        }
    }, 500);
}
