const users = 
[
    {id: 1, name: 'João Silva'},
    {id: 2, name: 'Maria Souza'}
];

const posts =
[
    {id: 101, userId: 1, title: 'Introdução a Node.js'},
    {id: 102, userId: 2, title: 'Tydi sobre Express'},
    {id: 103, userId: 1, title: 'JavaScript Moderno'},
]

const comments = 
[
    {id: 1001, postID: 101, text: 'Ótimo post!'},
    {id: 1002, postID: 101, text: 'Aprendi muito, obrigado.'},
    {id: 1003, postID: 102, text: 'Express é incrível!'},
]

function searchUserCallBack(id, callback)
{
    console.log('Searching for user...');
    setTimeout(() => 
    {
        const user = user.find(u => u.id === id);
        if(user)
        {
            callback(null, user);
        }
        else
        {
            callback(new Error('User not found...'));
        }
    }, 1000)
}

function searchPostCallBack(id, callback)
{
    console.log("Searching user's post...");
    setTimeout(() =>
        {
            const post = posts.filter(p => p.userId === id);
            if(post)
            {
                callback(null, post);
            }
            else
            {
                callback(new Error('Post not found...'));
            }
        }, 1000)
}

searchUserCallBack(1, )