import { getUser, getLatestPost, getComments } from './data-services';

const userId = '1';

// SMELL: This is "Callback Hell" or the "Pyramid of Doom".
// It's hard to read, hard to debug, and error handling is a nightmare.
console.log('--- Starting data fetch ---');
getUser(userId, (err, user) => {
    if (err) {
        console.error('Error fetching user:', err.message);
    } else {
        console.log('User:', user);
        getLatestPost(user.id, (err, post) => {
            if (err) {
                console.error('Error fetching post:', err.message);
            } else {
                console.log('Post:', post);
                getComments(post.id, (err, comments) => {
                    if (err) {
                        console.error('Error fetching comments:', err.message);
                    } else {
                        console.log('Comments:', comments);
                        console.log('--- All data fetched successfully ---');
                    }
                });
            }
        });
    }
});
