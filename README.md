# ProjectHub

## Backend
- ExpressJs

## MongoDB

### Schemas

- User
```javascript
const user = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_photo: { type: String },
    language: { type: String, default: 'pt' },
    description: { type: String },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});
```

- Messages
```javascript
const message = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['text', 'image', 'audio'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true}
});
```

- Chats
```javascript
const chat = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});
```


## Frontend
- Vite + ReactJs
