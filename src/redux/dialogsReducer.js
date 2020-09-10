
const users = [
    {
        id: 1,
        name: "Vasya"
    },
    {
        id: 2,
        name: "Kolya"
    },
    {
        id: 3,
        name: "Petya"
    },
    {
        id: 4,
        name: "Masha"
    },
    {
        id: 5,
        name: "Nikita"
    },

];

const messages = [
    {
        id: 1,
        message: "yo"
    },
    {
        id: 2,
        message: "Hello, It-kamasutra"
    },
    {
        id: 3,
        message: "How are you?"
    },
];

const initialState  = {
    users,
    messages,
};

const SEND_MESSAGE = 'dialogsReducer/SEND_MESSAGE';


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            const newMassages = [...state.messages, {id: 5, message: action.payload}];
            return {
                   ...state,
                   messages: newMassages,
            }
        }
        default: return state;
    }
};


export const sendMessage = (payload) => ({
    type: SEND_MESSAGE,
    payload,
});

export default dialogsReducer;