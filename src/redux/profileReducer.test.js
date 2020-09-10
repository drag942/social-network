import profileReducer, {addPost} from "./profileReducer";



test('new post should be added', () => {

    let action = addPost('it-kamasutra')
    const state = {
        posts: [
            {
                id:1,
                message: "Hi, how are you?",
            },
            {
                id:2,
                message: "It's my first post",
            },

        ],
    };


    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});



