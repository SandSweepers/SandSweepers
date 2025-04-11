# Contributing to Sand Sweepers

Thank you for considering contributing to Sand Sweepers! We welcome contributions from everyone. By contributing, you help us improve the project and make it better for the community.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Code of Conduct](#code-of-conduct)
- [Reporting Issues](#reporting-issues)
- [Submitting Changes](#submitting-changes)
- [Development Guidelines](#development-guidelines)
- [Style Guide](#style-guide)
- [License](#license)

---

## How to Contribute

There are several ways to contribute to Sand Sweepers:
1. Reporting bugs or suggesting features.
2. Submitting pull requests for code improvements or new features.
3. Improving documentation or adding examples.
4. Testing and providing feedback.

---

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for everyone.

---

## Reporting Issues

If you encounter a bug or have a feature request, please open an issue in the GitHub repository. Include as much detail as possible:
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Screenshots or logs, if applicable.

---

## Submitting Changes

1. **Fork the repository**: Create your own copy of the project.
2. **Create a branch**: Use a descriptive name for your branch (e.g., `fix-login-bug` or `add-leaderboard-feature`).
   ```bash
   git checkout -b your-branch-name
   
3.Make your changes: Ensure your code follows the project's style guide.
4.Test your changes: Run the application and verify that your changes work as expected.
5.Commit your changes: Write clear and concise commit messages.
  git commit -m "Fix: Resolved login issue"

6.Push your changes: Push your branch to your forked repository.
  git push origin your-branch-name
7.Submit a pull request: Open a pull request to the main repository. Provide a detailed description of your changes.


Development Guidelines
Setting Up the Project
  1. Clone the repository:
     git clone https://github.com/SandSweepers/Sand-Sweepers.git
  2. Install dependencies for both frontend and backend:
    cd SandSweepers
    npm install
    cd ../Sand-Sweepers-Backend
    npm install
 3. Configure environment variables in the .env file.
      Running the Project
     Frontend
      cd SandSweepers
      npm run dev
    Backend:
      cd Sand-Sweepers-Backend
      npm start
Style Guide
Frontend
  Use React functional components and hooks.
  Follow SCSS conventions for styling.
  Use camelCase for variable and function names.
Backend
  Follow RESTful API principles.
  Use async/await for asynchronous operations.
  Use Sequelize for database interactions.
Commit Messages
  Use clear and concise messages.
  Follow this format:

Type: Short description

Detailed explanation (if necessary).

Examples:

Fix: Resolved login issue
Feat: Added leaderboard functionality

License
By contributing to Sand Sweepers, you agree that your contributions will be licensed under the ISC License.
