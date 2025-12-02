# Omee-X 🎥💬

A real-time random video chat application inspired by Omegle, built with modern web technologies. Connect with strangers instantly through text chat and video calls with WebRTC integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Socket Events](#socket-events)
- [Database Schema](#database-schema)
- [Future Use Cases](#future-use-cases)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Omee-X is a small-scale Omegle clone that enables users to connect randomly with other online users for text and video conversations. The application features user authentication, Google OAuth integration, real-time messaging, and WebRTC-powered video calls.

## ✨ Features

### Core Features
- 🔐 **User Authentication**
  - Email/Password registration and login
  - Google OAuth 2.0 integration
  - JWT-based session management
  - Password recovery via email

- 💬 **Real-time Chat**
  - Instant text messaging using Socket.IO
  - Random user matching system
  - Active user counter
  - Disconnect notifications

- 📹 **Video Calling**
  - WebRTC peer-to-peer video calls
  - Call initiation and acceptance system
  - Call rejection handling
  - Signaling server for connection establishment

- 👤 **User Profiles**
  - Customizable user profiles
  - University roll number tracking
  - Branch/department information
  - Phone number storage

### Security Features
- Bcrypt password hashing
- JWT token authentication
- Session management with express-session
- Cookie-based authentication

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Template engine
- **TailwindCSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time client library
- **WebRTC** - Real-time communication APIs

### Authentication & Security
- **Passport.js** - Authentication middleware
- **passport-google-oauth20** - Google OAuth strategy
- **JWT (jsonwebtoken)** - Token-based authentication
- **Bcrypt** - Password hashing

### Additional Tools
- **Nodemailer** - Email sending functionality
- **Multer** - File upload handling
- **Morgan** - HTTP request logger
- **Cookie-parser** - Cookie parsing middleware
- **Dotenv** - Environment variable management

### Deployment
- **Vercel** - Hosting platform (configured)

## 📁 Project Structure

```
Omee-X/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel deployment configuration
├── logs_result.csv            # Application logs
├── config/
│   ├── google-oauth.js        # Google OAuth configuration
│   └── tailwind.config.js     # TailwindCSS configuration
├── routes/
│   ├── index.js               # Main routes (auth, pages)
│   └── user.js                # User model and schema
├── views/
│   ├── chat.ejs               # Chat/video interface
│   ├── login.ejs              # Login page
│   ├── signup.ejs             # Initial signup page
│   ├── signup-2.ejs           # Additional signup details
│   ├── profile.ejs            # User profile page
│   ├── welcome.ejs            # Landing page
│   ├── warning.ejs            # Warning/terms page
│   ├── forgetpassword.ejs     # Password recovery
│   ├── otp.ejs                # OTP verification (planned)
│   └── partials/
│       └── header.ejs         # Reusable header component
└── public/
    ├── css/
    │   ├── style.css          # Compiled TailwindCSS
    │   └── tailwind.css       # TailwindCSS source
    └── images/                # Static image assets
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Cloud Console account (for OAuth)
- Gmail account (for email functionality)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rojit-Bhatt/Omee-X.git
   cd Omee-X
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Build TailwindCSS**
   ```bash
   npm run build:css
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/omee-x
# Or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/omee-x

# JWT Secret
TOKEN=your-super-secret-jwt-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (Gmail)
user=your-email@gmail.com
pass=your-gmail-app-password
```

### Getting Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`

### Getting Gmail App Password
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security
3. Select "App passwords"
4. Generate a new app password for "Mail"

## 📖 Usage

### For Users

1. **Getting Started**
   - Visit the warning/terms page
   - Sign up with email or Google OAuth
   - Complete your profile with university details

2. **Chatting**
   - Navigate to the chat page
   - Wait to be matched with a random user
   - Start text chatting instantly
   - Optionally initiate a video call

3. **Video Calls**
   - Click the video call button
   - Allow camera and microphone permissions
   - Wait for the other user to accept
   - Enjoy face-to-face conversation

### For Developers

1. **Running in Development**
   ```bash
   # Terminal 1: Watch TailwindCSS changes
   npm run build:css

   # Terminal 2: Start server with nodemon (if installed)
   nodemon app.js
   ```

2. **Debugging**
   - Check console logs for Socket.IO events
   - Monitor MongoDB connections
   - Review Morgan HTTP logs

## 🛣️ API Routes

### Public Routes
```
GET  /                      - Warning/terms page
GET  /welcome               - Landing page
GET  /login                 - Login page
GET  /signup                - Initial signup form
GET  /signup-2              - Additional profile details
GET  /forgetpassword        - Password recovery page
```

### Authentication Routes
```
POST /login                 - User login
POST /signup                - Initial signup
POST /signup-2              - Complete signup
POST /reset-password        - Request password reset
GET  /logout                - User logout
```

### Google OAuth Routes
```
GET  /auth/google           - Initiate Google OAuth
GET  /auth/google/callback  - OAuth callback handler
```

### Protected Routes (Requires Authentication)
```
GET  /profile               - User profile page
GET  /chat                  - Chat interface
```

## 🔌 Socket Events

### Client → Server Events
```javascript
// Join chat room
socket.emit('joinroom', { room: username })

// Send text message
socket.emit('message', { message: messageContent })

// WebRTC signaling
socket.emit('signalingMessage', { message: sdpOffer })

// Video call actions
socket.emit('startVideoCall')
socket.emit('acceptCall')
socket.emit('rejectCall')
```

### Server → Client Events
```javascript
// User count update
socket.on('updateUserCount', (count) => {})

// Successfully joined room
socket.on('joined', (partnerUsername) => {})

// Receive text message
socket.on('message', (message) => {})

// WebRTC signaling
socket.on('signalingMessage', (message) => {})

// Video call events
socket.on('incomingCall')
socket.on('callAccepted')
socket.on('callRejected')
socket.on('userDisconnected', ({ userId }) => {})
```

## 💾 Database Schema

### User Model
```javascript
{
  fullName: String (required),
  universityRollNo: String (unique),
  branch: String,
  phoneNumber: String (unique),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  timestamps: true  // createdAt, updatedAt
}
```

## 🔮 Future Use Cases

### Short-term Enhancements
- **Interest-based Matching**: Match users based on shared interests or topics
- **Language Selection**: Filter matches by preferred language
- **Chat History**: Save chat logs for registered users (with privacy controls)
- **Report System**: Allow users to report inappropriate behavior
- **Profanity Filter**: Auto-moderate offensive language
- **Mobile App**: React Native version for iOS and Android
- **Screen Sharing**: Enable screen sharing during video calls
- **File Sharing**: Allow users to exchange images/files
- **Chat Translation**: Real-time message translation

### Long-term Vision
- **Group Chats**: Support for multi-user conversations
- **Premium Features**: Ad-free experience, custom filters
- **AI Moderation**: Automated content moderation using ML
- **Virtual Backgrounds**: Video call background effects
- **Analytics Dashboard**: User engagement metrics for admins
- **University Network**: Private mode for verified university students only
- **Events & Meetups**: Organize virtual events for users
- **Gamification**: Points, badges, and user levels
- **Integration APIs**: Allow third-party integrations

### Technical Improvements
- **Microservices Architecture**: Scale components independently
- **Redis Integration**: Improve session management and caching
- **CDN Integration**: Faster static asset delivery
- **Load Balancing**: Handle increased traffic
- **Testing Suite**: Unit, integration, and E2E tests
- **CI/CD Pipeline**: Automated deployment workflows
- **Docker Support**: Containerization for easy deployment
- **GraphQL API**: More flexible data querying
- **TypeScript Migration**: Enhanced type safety

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Omee-X.git
   cd Omee-X
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary

5. **Test your changes**
   ```bash
   npm start
   # Test all features manually
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Describe your changes in detail

### Contribution Guidelines

#### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ standards
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Format: `Type: Brief description`

Types:
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Update existing feature
- `Remove:` Remove code or files
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting, semicolons, etc.)
- `Test:` Adding or updating tests

#### Pull Request Process
1. Update README.md if you add new features
2. Update environment variables documentation if needed
3. Ensure your code runs without errors
4. Get at least one code review approval
5. Squash commits if requested
6. Respond to all review comments

### Areas for Contribution

#### 🐛 Bug Fixes
- Check [Issues](https://github.com/Rojit-Bhatt/Omee-X/issues) for reported bugs
- Fix security vulnerabilities
- Resolve compatibility issues

#### ✨ New Features
- Implement features from the [Future Use Cases](#future-use-cases) section
- Suggest and implement your own ideas
- Enhance existing features

#### 📝 Documentation
- Improve README and code comments
- Create tutorial videos or blog posts
- Translate documentation to other languages
- Add API documentation

#### 🎨 UI/UX Improvements
- Redesign pages with better aesthetics
- Improve responsive design
- Add animations and transitions
- Enhance accessibility (ARIA labels, keyboard navigation)

#### 🧪 Testing
- Write unit tests
- Add integration tests
- Perform security testing
- Test on different browsers and devices

#### 🔧 DevOps
- Improve build process
- Set up CI/CD pipelines
- Add Docker support
- Optimize performance

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards
- Report unacceptable behavior to the maintainers

### Questions?

- Open an issue for bugs or feature requests
- Start a discussion for general questions
- Contact maintainers for security concerns

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rojit Bhatt**
- GitHub: [@Rojit-Bhatt](https://github.com/Rojit-Bhatt)

## 🙏 Acknowledgments

- Inspired by Omegle
- Built with love for random connections
- Thanks to all contributors

## 📞 Support

For support, email the maintainers or open an issue on GitHub.

---

**Note**: This is an educational project. Always obtain proper consent before recording or storing video/chat conversations. Implement proper moderation to prevent misuse.
