# TicTacToe React App

A modern React application built with Vite, featuring a TicTacToe game, user search with autocomplete, data grid, and authentication form components.

## 🚀 Features

- **TicTacToe Game**: Classic tic-tac-toe game with winner detection
- **Autocomplete Search**: Real-time user search with suggestions
- **Data Grid**: Display and paginate user data from API
- **Auth Form**: User authentication form component
- **Hot Module Replacement**: Fast development with HMR enabled
- **Unit Tests**: Comprehensive test coverage with Vitest

## 📋 Tech Stack

- **React 19.2.7** - UI library
- **Vite 8.0.12** - Build tool and dev server
- **Vitest** - Unit testing framework
- **@testing-library/react** - Testing utilities
- **ESLint** - Code linting

## 🛠️ Installation

### Prerequisites
- Node.js v22.12.0 or higher
- npm v10.9.0 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/akash-saha-1/cursor-workspace.git
cd TicTacToe

# Install dependencies
npm install
```

## 📦 Available Scripts

### Development Server
Start the development server with hot reloading:
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`

### Run Tests
Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npm test -- src/TicTacToe/TicTacToe.test.jsx
```

Run tests in watch mode:
```bash
npm test -- --watch
```

### Build
Create a production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

### Lint
Check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── TicTacToe/
│   ├── TicTacToe.jsx          # Main game component
│   ├── TicTacToe.css          # Game styles
│   └── TicTacToe.test.jsx     # Game tests
├── Autocomplete/
│   ├── Autocomplete.jsx       # Search with autocomplete
│   ├── Autocomplete.css
│   └── Autocomplete.test.jsx
├── DataGrid/
│   ├── DataGrid.jsx           # Data grid component
│   ├── DataGrid.css
│   └── DataGrid.test.jsx
├── AuthForm/
│   ├── AuthForm.jsx           # Auth form component
│   ├── AuthForm.css
│   └── AuthForm.test.jsx
├── App.jsx                    # Main app component
├── App.css
├── main.jsx                   # Entry point
├── index.css                  # Global styles
└── setupTests.js              # Test configuration
```

## 🎮 Components

### TicTacToe
Classic tic-tac-toe game with:
- Two-player gameplay (X and O)
- Winner detection
- Draw detection
- Game reset functionality

### Autocomplete
User search component with:
- Real-time filtering
- Keyboard navigation
- Accessibility features (ARIA labels)
- 5-second delay on initial load

### DataGrid
Data display component with:
- API data fetching from JSONPlaceholder
- Pagination (5 items per page)
- Loading and error states
- Responsive design

### AuthForm
Authentication form with:
- Email and password fields
- Form validation
- Submit handling

## ✅ Testing

The project includes unit tests for all components using Vitest and React Testing Library.

### Test Files
- `src/TicTacToe/TicTacToe.test.jsx` - Game logic tests
- `src/Autocomplete/Autocomplete.test.jsx` - Search functionality tests
- `src/DataGrid/DataGrid.test.jsx` - Grid component tests
- `src/AuthForm/AuthForm.test.jsx` - Form validation tests

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/TicTacToe/TicTacToe.test.jsx

# Run in watch mode
npm test -- --watch
```

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES2020+ support

## 📝 License

MIT

## 👨‍💻 Author

Akash Saha

## 🔗 Repository

[GitHub Repository](https://github.com/akash-saha-1/cursor-workspace)
